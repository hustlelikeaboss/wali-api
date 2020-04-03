![banner](https://user-images.githubusercontent.com/4102106/28962905-7e5aa6d0-7907-11e7-8b0e-022c0cd73a42.png)

# Serverless GraphQL API using Lambda and DynamoDB

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
![workflow](https://github.com/hustlelikeaboss/wali-api/workflows/Node.js%20CI/badge.svg?branch=master)

GraphQL Lambda Server using [apollo-server-lambda](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-lambda) from [Apollo](http://dev.apollographql.com/).

[graphql-tools](https://github.com/apollographql/graphql-tools) and [merge-graphql-schemas](https://github.com/okgrow/merge-graphql-schemas) are used to generate the schema.

[serverless-webpack](https://github.com/elastic-coders/serverless-webpack) is used to transform ES6 with [Babel](https://babeljs.io/) and build the lambda.

## Setup

1. Run `npm install -g serverless` to install `serverless` globally if you haven't already and follow [the instructions here](https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/) to configure the CLI.

2. Initialize a new project from this template:

```bash
serverless install --url https://github.com/hustlelikeaboss/serverless-graphql-api
cd serverless-graphql-api
npm ci
```

## Deploy

Run `serverless package` to preview the stacks to be created.

1. First time deployment:

```bash
# deploy to dev by default
npm run deploy
# deploy to production
npm run deploy --stage production
```

This will create the Lambda Function and API Gateway for GraphQL, together with two DynamoDB tables named `artists` and `songs`.**Note the API endpoint down** for use with the GrapiQL app below, which should be something like this: `https://[YOUR_LAMBDA_ID].execute-api.us-east-1.amazonaws.com/dev/graphql`. You can always find

1. Run the same command above after infrastructure changes made to `serverless.yml`.
2. Run the script below to quickly upload code changes:

```
npm run deploy --function graphql
```

[Other useful scripts](https://serverless.com/framework/docs/providers/aws/):

```bash
# invoke lambda function locally
serverless invoke local --function graphql --path lib/event.json

# invoke deployed lambda function directly
serverless invoke --function graphql --path lib/event.json

# remove deployed stack
serverless remove
```

## Queries and Mutations

Query the GraphQL server using the [GraphiQL.app](https://github.com/skevy/graphiql-app). If you have Homebrew installed on OSX run

```
brew cask install graphiql
```
