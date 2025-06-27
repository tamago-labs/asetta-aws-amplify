import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { storage } from "./storage/resource.js"
import * as cdk from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

const backend = defineBackend({
  auth,
  data,
  storage
});

const KnowledgeBaseDataSource =
  backend.data.resources.graphqlApi.addHttpDataSource(
    "KnowledgeBaseDataSource",
    `https://bedrock-agent-runtime.${cdk.Stack.of(backend.data).region}.amazonaws.com`,
    {
      authorizationConfig: {
        signingRegion: cdk.Stack.of(backend.data).region,
        signingServiceName: "bedrock",
      },
    },
  );

KnowledgeBaseDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [
      `arn:aws:bedrock:${cdk.Stack.of(backend.data).region}:057386374967:knowledge-base/GZLKWZC7ZK`
    ],
    actions: ["bedrock:Retrieve"],
  }),
);