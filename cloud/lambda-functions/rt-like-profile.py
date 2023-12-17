import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'Roommate-Tinder'  
table = dynamodb.Table(table_name)
def update_bias(user,target,is_like):
   
    user_data = table.get_item(
        Key={"id":user},
        ExpressionAttributeNames={
                '#bias':'bias', },
        ProjectionExpression= '#bias')
    bias=user_data["Item"]["bias"]
    print("bias before update: ",bias)
    target_data = table.get_item(
        Key={"id":target},
        ExpressionAttributeNames={
                '#vector':'vector', },
        ProjectionExpression= '#vector')
    vector=target_data["Item"]["vector"]
    print("vector: ",vector)

    direction=1 if is_like else -1
    for index in range(len(bias)):
      vector_value=vector[index]
      if vector_value==1:
        bias[index]+=direction
      elif vector_value==0:
        bias[index]-=direction
      else:
        print("this shouldn't happen:")
        print("index: ",index)
        print("messed up bias: ",bias)
        print("direction: ",direction)
        print("\n")
    print("new bias: ",bias)
    return bias
def lambda_handler(event, context):
    id = event.get('id', None)  # Your user ID
    liked_user_id = event.get('likedUserId', None)  # Liked user's ID
    print("id: ",id)
    print("liked_user_id: ", liked_user_id)

    if not id or not liked_user_id:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Missing id or likedUserId in the event'}),
        }

    try:
        bias=update_bias(id,liked_user_id,True)
        response = table.update_item(
            Key={'id': id},
            UpdateExpression='SET  #bias = :bias, #likes = list_append(if_not_exists(#likes, :emptyList), :likedUserId)',
            ExpressionAttributeNames={'#likes': 'likes','#bias':'bias'},
            ExpressionAttributeValues={':likedUserId': [liked_user_id], ':emptyList': [],":bias" : bias},
            ReturnValues='UPDATED_NEW',
        )
        print('UpdateItem succeeded:', response)
        
    except Exception as e:
        print('UpdateItem failed:', str(e))
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal Server Error'}),
        }
    
    try:
        res = table.update_item(
            Key={'id': liked_user_id},
            UpdateExpression='SET #liked_user = list_append(if_not_exists(#liked_user, :emptyList), :id)',
            ExpressionAttributeNames={'#liked_user': 'liked_user'},
            ExpressionAttributeValues={':id': [id], ':emptyList': []},
            ReturnValues='UPDATED_NEW',
        )

        print('UpdateItem succeeded:', res)
        return {
            'statusCode': 200,
            'body': json.dumps(res),
        }
        
    except Exception as e:
        print('UpdateItem failed:', str(e))
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal Server Error'}),
        }
