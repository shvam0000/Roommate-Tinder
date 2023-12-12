import boto3

def lambda_handler(event, context):
    user_data = event

    # Access individual fields
    id = user_data.get('id')
    area = user_data.get('area')
    age = user_data.get('age')
    minPrice = user_data.get('minPrice')
    maxPrice = user_data.get('maxPrice')
    interests = user_data.get('interests')
    morningPerson = user_data.get('morningPerson')
    eveningPerson = user_data.get('eveningPerson')
    drinking = user_data.get('drinking')
    smoking = user_data.get('smoking')
    pets = user_data.get('pets')
    messy= user_data.get('messy') 
    clean = user_data.get('clean')
    mixedGender = user_data.get('mixedGender')
    vegetarian = user_data.get('vegetarian')

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table('Roommate-Tinder')

    table.put_item(
        Item={
            'id': id,
            'area': area,
            'age': age,
            'minPrice': minPrice,
            'maxPrice': maxPrice,
            'interests': interests,
            'morningPerson': morningPerson,
            'eveningPerson': eveningPerson,
            'drinking': drinking,
            'smoking': smoking,
            'pets': pets,
            'messy': messy,
            'clean' :clean,
            'mixedGender': mixedGender,
            'vegetarian': vegetarian,
        }
    )

    return {
        'statusCode': 200,
        'body': 'User added successfully',
        'headers': {
            'Content-Type': 'application/json'
        }
    }
