import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { aws_dynamodb } from "aws-cdk-lib";

export const backend = defineBackend({
  auth,
  data,
});

const externalDataSourcesStack = backend.createStack("MyTest");


const externalTable = aws_dynamodb.Table.fromTableName(
  externalDataSourcesStack,
  "MyTest",
  "test"
);


backend.data.addDynamoDbDataSource(
  "test",
  externalTable
);