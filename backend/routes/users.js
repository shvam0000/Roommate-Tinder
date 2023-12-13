const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE;

router.post('/submit-form', async (req, res) => {
  const {
    id,
    area,
    age,
    minPrice,
    maxPrice,
    interests,
    morningPerson,
    eveningPerson,
    drinking,
    smoking,
    pets,
    messy,
    clean,
    mixedGender,
    vegetarian,
  } = req.body;

  const params = {
    TableName: tableName,
    Item: {
      id: id,
      area: area,
      age: age,
      minPrice: minPrice,
      maxPrice: maxPrice,
      interests: interests,
      morningPerson: morningPerson,
      eveningPerson: eveningPerson,
      drinking: drinking,
      smoking: smoking,
      pets: pets,
      messy: messy,
      clean: clean,
      mixedGender: mixedGender,
      vegetarian: vegetarian,
    },
  };

  dynamoDBClient.put(params, (err) => {
    if (err) {
      console.error('Error creating item:', err);
      res.status(500).json({ error: 'Failed to create item' });
    } else {
      console.log('Item created successfully');
      res.sendStatus(201);
    }
  });
});

// fetch all the users
router.get('/users', (req, res) => {
  // Define the scan parameters
  const params = {
    TableName: tableName,
  };

  // Perform the scan operation
  dynamoDBClient.scan(params, (err, data) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).send('An error occurred');
    } else {
      const users = data.Items;
      res.json(users);
    }
  });
});

// fetch user data by userId on login
router.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  // Define the query parameters
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  };

  // Perform the query operation
  dynamoDBClient.query(params, (err, data) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).send('An error occurred');
    } else {
      if (data.Items.length > 0) {
        const user = data.Items[0];
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});

// patch to update user's info
router.patch('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const { address, email, firstName, lastName, owner_type } = req.body;

  const params = {
    TableName: tableName,
    Key: { userId: userId },
    UpdateExpression:
      'SET #address = :address, #email = :email, #firstName = :firstName, #lastName = :lastName, #owner_type = :owner_type',
    ExpressionAttributeNames: {
      '#address': 'address',
      '#email': 'email',
      '#firstName': 'firstName',
      '#lastName': 'lastName',
      '#owner_type': 'owner_type',
    },
    ExpressionAttributeValues: {
      ':address': address,
      ':email': email,
      ':firstName': firstName,
      ':lastName': lastName,
      ':owner_type': owner_type,
    },
  };

  dynamoDBClient.update(params, (err, data) => {
    if (err) {
      console.error('Error updating user details:', err);
      return res.status(500).json({ error: 'Failed to update user details' });
    }
    console.log('User details updated successfully:', data);
    res.json({
      message: 'User details updated successfully',
      user: data.Attributes,
    });
  });
});

module.exports = router;
