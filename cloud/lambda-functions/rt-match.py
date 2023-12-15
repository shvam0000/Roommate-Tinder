import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'Roommate-Tinder'  # Replace with your DynamoDB table name
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    # Parse the user id from the Lambda event
    user_id = event.get('id')
    user_id_to_like = event.get('user_id_to_like')

    try:
        # Fetch the user's liked_user and liked columns from DynamoDB
        response = table.get_item(
            Key={
                'id': user_id
            }
        )
        user_data = response.get('Item')

        if user_data:
            liked_users = user_data.get('liked_user', [])
            likes = user_data.get('likes', [])

            # Check if the user has liked the provided user_id_to_like
            if user_id_to_like in liked_users:
                # Remove user_id_to_like from liked_user list
                liked_users.remove(user_id_to_like)

                # Check if the user_id_to_like is also in the likes list
                if user_id_to_like in likes:
                    # Remove user_id_to_like from liked list
                    likes.remove(user_id_to_like)

                    # Add user_id_to_like to the matches list
                    matches = user_data.get('matches', [])
                    matches.append(user_id_to_like)

                    # Update DynamoDB with the modified data
                    table.update_item(
                        Key={'id': user_id},
                        UpdateExpression='SET liked_user = :liked_users, likes = :likes, matches = :matches',
                        ExpressionAttributeValues={
                            ':liked_users': liked_users,
                            ':likes': likes,
                            ':matches': matches
                        }
                    )

                    return {
                        'statusCode': 200,
                        'body': json.dumps('Matched user!')
                    }
                else:
                    return {
                        'statusCode': 400,
                        'body': json.dumps(f'User {user_id_to_like} not found in likes list for user {user_id}')
                    }
            else:
                return {
                    'statusCode': 400,
                    'body': json.dumps(f'User {user_id_to_like} not found in liked_user list for user {user_id}')
                }
        else:
            return {
                'statusCode': 400,
                'body': json.dumps(f'User {user_id} not found in DynamoDB')
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
