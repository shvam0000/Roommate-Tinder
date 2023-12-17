import json
import boto3

dynamodb = boto3.resource('dynamodb')
ses_client = boto3.client('ses')

table_name = 'Roommate-Tinder'
table = dynamodb.Table(table_name)

def send_email_notification(user_id, matched_user_id):
    # Customize the email message as per your requirement
    subject = "New Match Notification"
    message = f"Congratulations! You have a new match with User {matched_user_id} on Roommate-Tinder."

    # Customize sender and recipient email addresses
    sender_email = "ss6960@columbia.edu"
    recipient_email = "ss6960@columbia.edu"

    # Send the email
    try:
        response = ses_client.send_email(
            Source=sender_email,
            Destination={'ToAddresses': [recipient_email]},
            Message={'Subject': {'Data': subject}, 'Body': {'Text': {'Data': message}}},
        )
        print("Email sent successfully:", response)
    except Exception as e:
        print("Failed to send email:", str(e))

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

                    # Send email notification upon successful match
                    send_email_notification(user_id, user_id_to_like)

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
