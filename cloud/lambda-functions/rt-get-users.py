import json
import boto3
import pinecone
from decimal import Decimal

def search_vector_with_bias(vector, bias):
    threshold = 3
    neg_threshold = threshold * -1
    for index in range(len(bias)):
        value = bias[index]
        if value >= threshold:
            vector[index] = 1
        elif value <= threshold * neg_threshold:
            vector[index] = 0
        else:
            vector[index] = int(vector[index])

    return vector

def lambda_handler(event, context):
    try:
        print("event: ", event)
        # id = "1"
        id = event.get('queryStringParameters', {}).get('id')
        
        if not id:
            return {
                'statusCode': 400,
                'body': 'Missing id in query parameters',
                'headers': {
                    'Content-Type': 'application/json'
                }
            }

        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        table = dynamodb.Table('Roommate-Tinder')
        info = table.get_item(
            Key={"id": id},
            ExpressionAttributeNames={
                '#vector': 'vector',
                '#bias': 'bias',
                '#likes': 'likes',
                '#dislikes': 'dislikes',
                '#matches': 'matches'
            },
            ProjectionExpression='#vector , #bias, #likes, #dislikes, #matches')
        vector = info["Item"]["vector"]
        bias = info["Item"]["bias"]
        likes = info["Item"]["likes"]
        dislikes = info["Item"]["dislikes"]
        matches = info["Item"]["matches"]
        print("likes: ", likes)
        print("dislikes: ", dislikes)
        print("matches: ", matches)
        print("vector: ", vector)
        print("bias: ", bias)

        search_vector = search_vector_with_bias(vector, bias)
        print("search vector: ", search_vector)
        no_show = likes + dislikes + matches + [id]
        no_show = set(no_show)
        no_show = list(no_show)
        print("no show list: ", no_show)

        pinecone.init("d373a6aa-86f7-4bae-acd4-fbd120de4293", environment="gcp-starter")
        index = pinecone.Index("roommate-project")
        results = index.query(
            vector=search_vector,
            filter={
                "id": {"$nin": no_show},
            },
            top_k=5,
            include_metadata=True
        )
        print("raw pinecone data: ",results)
        results = results.to_dict()
        for index in range(len(results["matches"])):
            metadata=results["matches"][index]["metadata"]
            new_metadata={}
            for key in metadata:
                value=metadata[key]
                is_string=type(value)==str
                if is_string and "true_" in value:
                    value="true"
                elif is_string and "false_" in value:
                    value="false"
                new_metadata[key]=value
            results["matches"][index]["metadata"]=new_metadata
        
        
        
        
        print("results: ", results)
        return {
            'statusCode': 200,
            'body': results,  # Returning the Python object directly
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
