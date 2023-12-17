import boto3

def lambda_handler(event, context):
    # Replace 'your_table_name' with the actual name of your DynamoDB table
    table_name = 'Roommate-Tinder'
    
    # Create a DynamoDB resource
    dynamodb = boto3.resource('dynamodb')
    
    # Get a reference to the DynamoDB table
    table = dynamodb.Table(table_name)
    
    try:
        # Scan the table and delete all items
        response = table.scan()
        items = response.get('Items', [])
        
        for item in items:
            table.delete_item(
                Key={
                    'id': item['id']  # Replace 'YourPrimaryKey' with your actual primary key
                    # Add more key-value pairs for composite primary keys if applicable
                }
            )
        
        return {
            'statusCode': 200,
            'body': 'DynamoDB table emptied successfully.'
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error: {str(e)}'
        }
