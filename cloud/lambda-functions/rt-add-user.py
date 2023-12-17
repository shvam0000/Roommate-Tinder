import json
import boto3
from decimal import Decimal
import pinecone

def make_vector(info):
    mappings = {'manhattan': 13,
                'female': 11,
                'false_vegetarian': 10,
                'true_mixedgender': 19,
                'true_clean': 15,
                'true_messy': 18,
                'true_pets': 21,
                'true_smoking': 22,
                'false_drinking': 3,
                'false_morningperson': 7,
                'false_eveningperson': 4,
                'bronx': 0,
                'male': 12,
                'true_vegetarian': 23,
                'false_messy': 5,
                'false_pets': 8,
                'true_drinking': 16,
                'true_eveningperson': 17,
                'queens': 14,
                'false_mixedgender': 6,
                'false_clean': 2,
                'brooklyn': 1,
                'false_smoking': 9,
                'true_morningperson': 20}
    vector = [0 for _ in range(24)]
    for key in info:
        if type(info[key]) == str:
            mapping_key = info[key].lower()
            if mapping_key in mappings:
                vector[mappings[mapping_key]] = 1
    return vector

def lambda_handler(event, context):
    try:
        print("event: ",event)
        region = 'us-east-1'
        table_name = 'Roommate-Tinder'
        dynamodb = boto3.resource('dynamodb', region_name=region)
        table = dynamodb.Table(table_name)
        
        # Assuming the user ID is passed as a query string parameter
        id = event.get('queryStringParameters', {}).get('id')
        if not id:
            raise ValueError('Missing id in query string parameters')

        # Assuming the updated user data is passed in the request body
        updated_user_data = json.loads(event.get('body', '{}'))
        print("send user data: ",updated_user_data)
        # Update user data in DynamoDB
        try:
            attributeValues = {}
            pineconeMetaData = {}
            for attribute in updated_user_data:
                value = updated_user_data[attribute]
                value = str(value)

                if "false" in value.lower():
                    value = "false_" + attribute
                elif "true" in value.lower():
                    value = "true_" + attribute
                attributeValues[":"+attribute] = value
                pineconeMetaData[attribute] = value

            vector = make_vector(attributeValues)

            bias = [0 for _ in range(24)]  # need this to update our search preferences every swipe -Kevin
            attributeValues[":bias"] = bias
            attributeValues[":vector"] = vector
            attributeValues[":likes"] = []
            attributeValues[":dislikes"] = []
            attributeValues[":matches"]=[]
            #likes dislikes matches
            
            print("attributeValues: ", attributeValues)


            pineconeMetaData["id"] = id

            response = table.update_item(
                Key={'id': id},
                UpdateExpression='SET  #matches = :matches , #dislikes = :dislikes , #likes = :likes,  #vector = :vector,  #firstName = :firstName, #bias = :bias , #lastName = :lastName, #gender = :gender, #area = :area, #age = :age, #minPrice = :minPrice, #maxPrice = :maxPrice, #interests = :interests, #morningPerson = :morningPerson, #eveningPerson = :eveningPerson, #drinking = :drinking, #smoking = :smoking, #pets = :pets, #messy = :messy, #clean = :clean, #mixedGender = :mixedGender, #vegetarian = :vegetarian',
                ExpressionAttributeNames={
                    '#likes': 'likes',
                    '#dislikes': 'dislikes',
                    '#matches': 'matches',
                    '#vector': 'vector',
                    '#bias': 'bias',
                    '#firstName': 'firstName',
                    '#lastName': 'lastName',
                    '#gender': 'gender',
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
                ExpressionAttributeValues=attributeValues,
                ReturnValues='UPDATED_NEW'
            )

            pinecone.init("d373a6aa-86f7-4bae-acd4-fbd120de4293", environment="gcp-starter")
            index = pinecone.Index("roommate-project")
            pinecone_data = [(str(id), vector, pineconeMetaData)]
            print("pinecone uploaded data:", pinecone_data)
            index.upsert(pinecone_data)

        except Exception as e:
            raise ValueError(f'Error adding user data: {str(e)}')

        updated_user_details = response.get('Attributes')

        return {
            'statusCode': 200,
            'body': json.dumps(updated_user_details, cls=DecimalEncoder),
            'headers': {
                'Content-Type': 'application/json'
            }
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error: {str(e)}',
            'headers': {
                'Content-Type': 'application/json'
            }
        }

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)
