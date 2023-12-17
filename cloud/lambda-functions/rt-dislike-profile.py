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
    disliked_user_id = event.get('dislikedUserId', None)  # Disliked user's ID
    
    print("id: ",id)
    print("disliked_user_id: ", disliked_user_id)

    if not id or not disliked_user_id:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Missing id or dislikedUserId in the event'}),
        }

    try:
        bias=update_bias(id,disliked_user_id,False)

        response = table.update_item(
            Key={'id': id},  # Assuming 'id' is your primary key
            UpdateExpression='SET #bias = :bias, #dislikes = list_append(if_not_exists(#dislikes, :emptyList), :dislikedUserId)',
            ExpressionAttributeNames={'#dislikes': 'dislikes','#bias':'bias'},
            ExpressionAttributeValues={':dislikedUserId': [disliked_user_id], ':emptyList': [],":bias" : bias},
            ReturnValues='UPDATED_NEW',
        )
        print('UpdateItem succeeded:', response)
        
    except Exception as e:
        print('UpdateItem failed:', str(e))
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal Server Error'}),
        }

    # Additional logic for handling dislikes
    try:
        res = table.update_item(
            Key={'id': disliked_user_id},  # Assuming 'id' is the primary key for disliked users
            UpdateExpression='SET #disliked_user = list_append(if_not_exists(#disliked_user, :emptyList), :id)',
            ExpressionAttributeNames={'#disliked_user': 'disliked_user'},
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
