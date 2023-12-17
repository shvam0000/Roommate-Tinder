import json
import boto3
from decimal import Decimal

def lambda_handler(event, context):
    region = 'us-east-1'
    table_name = 'Roommate-Tinder'
    dynamodb = boto3.resource('dynamodb', region_name=region)
    table = dynamodb.Table(table_name)

    # Assuming the user ID is passed as a query parameter
    id = event.get('queryStringParameters', {}).get('id')

    if not id:
        return {
            'statusCode': 400,
            'body': 'Missing userId in query parameters',
            'headers': {
                'Content-Type': 'application/json'
            }
        }

    # Retrieve user details from DynamoDB
    try:
        response = table.get_item(
            Key={
                'id': id
            }
        )
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error retrieving user details: {str(e)}',
            'headers': {
                'Content-Type': 'application/json'
            }
        }

    user_details = response.get('Item')
    new_user_details={}
    for key in user_details:
        value=user_details[key]
        is_string=type(value)==str
        if is_string and "true_" in value:
            value="true"
        elif is_string and "false_" in value:
            value="false"
        new_user_details[key]=value
    user_details=new_user_details
    if not user_details:
        return {
            'statusCode': 404,
            'body': f'User with id {id} not found',
            'headers': {
                'Content-Type': 'application/json'
            }
        }

    return {
        'statusCode': 200,
        'body': json.dumps(user_details, cls=DecimalEncoder),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)
