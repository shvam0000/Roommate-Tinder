import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'Roommate-Tinder'  # Replace with your DynamoDB table name
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    user_id = event.get('id')
    user_id_to_unmatch = event.get('user_id_to_unmatch')
    
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
            dislikes = user_data.get('dislikes', [])

            # Check if the user_id_to_unmatch is in the liked_user list
            if user_id_to_unmatch in liked_users:
                # Remove user_id_to_unmatch from liked_user list
                liked_users.remove(user_id_to_unmatch)

                # Add user_id_to_unmatch to the dislikes list
                dislikes.append(user_id_to_unmatch)

                # Update DynamoDB with the modified data
                table.update_item(
                    Key={'id': user_id},
                    UpdateExpression='SET liked_user = :liked_user, dislikes = :dislikes',
                    ExpressionAttributeValues={
                        ':liked_user': liked_users,
                        ':dislikes': dislikes
                    }
                )

                return {
                    'statusCode': 200,
                    'body': json.dumps('Unmatched user and moved to dislikes!')
                }
            else:
                return {
                    'statusCode': 400,
                    'body': json.dumps('User not found in liked_user list')
                }
        else:
            return {
                'statusCode': 400,
                'body': json.dumps('User not found in DynamoDB')
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
