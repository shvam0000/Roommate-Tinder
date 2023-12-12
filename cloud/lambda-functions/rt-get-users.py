import json
from decimal import Decimal
import boto3

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)

def lambda_handler(event, context):
    region = 'us-east-1'
    table_name = 'Roommate-Tinder'  
    dynamodb = boto3.resource('dynamodb', region_name=region)
    table = dynamodb.Table(table_name)
    
    response = table.scan()

    items = response.get('Items', [])

    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])

    formatted_items = [dict(item) for item in items]

    return {
        'statusCode': 200,
        'body': json.dumps(formatted_items, cls=DecimalEncoder),
        'headers': {
            'Content-Type': 'application/json'
        }
    }
