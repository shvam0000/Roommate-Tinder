import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_LMQtuIZll',
  Region: 'us-east-1',
  ClientId: 'va7i8r6ptmr6roqha7m6v09ke',
};

export default new CognitoUserPool(poolData);
