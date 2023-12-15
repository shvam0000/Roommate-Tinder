import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'Roommate-Tinder'  
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    id = event.get('id', None)  # Your user ID
    disliked_user_id = event.get('dislikedUserId', None)  # Disliked user's ID

    if not id or not disliked_user_id:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Missing id or dislikedUserId in the event'}),
        }

    try:
        response = table.update_item(
            Key={'id': id},  # Assuming 'id' is your primary key
            UpdateExpression='SET #dislikes = list_append(if_not_exists(#dislikes, :emptyList), :dislikedUserId)',
            ExpressionAttributeNames={'#dislikes': 'dislikes'},
            ExpressionAttributeValues={':dislikedUserId': [disliked_user_id], ':emptyList': []},
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
