import json
import boto3
from decimal import Decimal

def lambda_handler(event, context):
    region = 'us-east-1'
    table_name = 'Roommate-Tinder'
    dynamodb = boto3.resource('dynamodb', region_name=region)
    table = dynamodb.Table(table_name)

    # Assuming the user ID is passed as a path parameter
    id = event.get('pathParameters', {}).get('id')

    if not id:
        return {
            'statusCode': 400,
            'body': 'Missing id in path parameters',
            'headers': {
                'Content-Type': 'application/json'
            }
        }

    # Assuming the updated user data is passed in the request body
    updated_user_data = json.loads(event.get('body', '{}'))

    # Update user data in DynamoDB
    try:
        response = table.update_item(
            Key={
                'id': id
            },
            UpdateExpression='SET #area = :area, #age = :age, #minPrice = :minPrice, #maxPrice = :maxPrice, #interests = :interests, #morningPerson = :morningPerson, #eveningPerson = :eveningPerson, #drinking = :drinking, #smoking = :smoking, #pets = :pets, #messy = :messy, #clean = :clean, #mixedGender = :mixedGender, #vegetarian = :vegetarian',
            ExpressionAttributeNames={
                '#area': 'area',
                '#age': 'age',
                '#minPrice': 'minPrice',
                '#maxPrice': 'maxPrice',
                '#interests': 'interests',
                '#morningPerson': 'morningPerson',
                '#eveningPerson': 'eveningPerson',
                '#drinking': 'drinking',
                '#smoking': 'smoking',
                '#pets': 'pets',
                '#messy': 'messy',
                '#clean': 'clean',
                '#mixedGender': 'mixedGender',
                '#vegetarian': 'vegetarian'
            },
            ExpressionAttributeValues={
                ':area': updated_user_data.get('area'),
                ':age': updated_user_data.get('age'),
                ':minPrice': updated_user_data.get('minPrice'),
                ':maxPrice': updated_user_data.get('maxPrice'),
                ':interests': updated_user_data.get('interests'),
                ':morningPerson': updated_user_data.get('morningPerson'),
                ':eveningPerson': updated_user_data.get('eveningPerson'),
                ':drinking': updated_user_data.get('drinking'),
                ':smoking': updated_user_data.get('smoking'),
                ':pets': updated_user_data.get('pets'),
                ':messy': updated_user_data.get('messy'),
                ':clean': updated_user_data.get('clean'),
                ':mixedGender': updated_user_data.get('mixedGender'),
                ':vegetarian': updated_user_data.get('vegetarian')
            },
            ReturnValues='UPDATED_NEW'
        )
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error updating user data: {str(e)}',
            'headers': {
                'Content-Type': 'application/json'
            }
        }

    updated_user_details = response.get('Attributes')

    return {
        'statusCode': 200,
        'body': json.dumps(updated_user_details, cls=DecimalEncoder),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)
