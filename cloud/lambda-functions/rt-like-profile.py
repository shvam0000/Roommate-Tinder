import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'Roommate-Tinder'  
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    id = event.get('id', None)  # Your user ID
    liked_user_id = event.get('likedUserId', None)  # Liked user's ID

    if not id or not liked_user_id:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Missing id or likedUserId in the event'}),
        }

    try:
        response = table.update_item(
            Key={'id': id},
            UpdateExpression='SET #likes = list_append(if_not_exists(#likes, :emptyList), :likedUserId)',
            ExpressionAttributeNames={'#likes': 'likes'},
            ExpressionAttributeValues={':likedUserId': [liked_user_id], ':emptyList': []},
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
