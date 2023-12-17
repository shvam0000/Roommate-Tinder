import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'Roommate-Tinder'  # Replace with your DynamoDB table name
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    id = event.get('id')
    url = event.get('url')
    
    if not id:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Missing id in the event'}),
        }
    
    table.update_item(
        Key={
            'id': id
        },
        UpdateExpression='SET imgURL = :url',
        ExpressionAttributeValues={
            ':url': url,
        }
    )
        
    return {
        'statusCode': 200,
        'body': json.dumps(f'Image URL added for user with ID {id}.'),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
        },
    }