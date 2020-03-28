![banner](https://user-images.githubusercontent.com/4102106/28962905-7e5aa6d0-7907-11e7-8b0e-022c0cd73a42.png)

# Serverless GraphQL API using Lambda and DynamoDB

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Build Status](https://travis-ci.org/boazdejong/serverless-graphql-api.svg?branch=master)](https://travis-ci.org/boazdejong/serverless-graphql-api)

GraphQL Lambda Server using [graphql-server-lambda](https://github.com/apollographql/graphql-server/tree/master/packages/graphql-server-lambda) from [Apollo](http://dev.apollodata.com/).

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
serverless invoke local --function graphql --path lib/data/event.json

# invoke deployed lambda function directly
serverless invoke --function graphql --path lib/data/event.json

# remove deployed stack
serverless remove
```

## Queries and Mutations

Query the GraphQL server using the [GraphiQL.app](https://github.com/skevy/graphiql-app). If you have Homebrew installed on OSX run

```
brew cask install graphiql
```

### Mutations

The following mutations are available in this example.

#### createArtist()

Create an artist providing the first and last name as arguments. The id will be a generated uuid.

```graphql
mutation {
	createArtist(first_name: "Billy", last_name: "Crash") {
		id
	}
}
```

#### createSong()

Using the generated id from the artist you can create a song with the following mutation. Also provide a title and duration.

```graphql
mutation {
	createSong(
		artist: "99a746e0-0734-11e7-b2fd-45ae0a3b9074"
		title: "Whatever"
		duration: 120
	) {
		id
	}
}
```

#### updateArtist()

```graphql
mutation {
	updateArtist(
		id: "99a746e0-0734-11e7-b2fd-45ae0a3b9074"
		first_name: "John"
		last_name: "Ruth"
	) {
		id
		first_name
		last_name
	}
}
```

#### updateSong()

```graphql
mutation {
	updateSong(
		id: "a8a0a060-071b-11e7-bd09-8562f101f7c2"
		artist: "99a746e0-0734-11e7-b2fd-45ae0a3b9074"
		duration: 130
		title: "A new title"
	) {
		id
	}
}
```

### Queries

#### Example query

```graphql
{
	songs {
		id
		title
		duration
		artist {
			id
			first_name
			last_name
		}
	}
}
```

This query will return a result similar to this

```json
{
	"data": {
		"songs": [
			{
				"id": "a8a0a060-071b-11e7-bd09-8562f101f7c2",
				"title": "Whatever",
				"duration": 120,
				"artist": {
					"id": "99a746e0-0734-11e7-b2fd-45ae0a3b9074",
					"first_name": "Billy",
					"last_name": "Crash"
				}
			}
		]
	}
}
```

## DynamoDB Streams

This project also includes an example of capturing table activity with DynamoDB Streams.
The `record` lambda function is triggered by two stream events. One for each table.

In `serverless.yml`:

```
record:
  handler: lib/handler.record
  events:
    - stream:
        type: dynamodb
        arn:
          Fn::GetAtt:
            - ArtistsDynamoDbTable
            - StreamArn
        batchSize: 1
    - stream:
        type: dynamodb
        arn:
          Fn::GetAtt:
            - SongsDynamoDbTable
            - StreamArn
        batchSize: 1
```

The stream is enabled when defining the DynamoDB table in the `serverless.yml` resources.

```
StreamSpecification:
  StreamViewType: NEW_AND_OLD_IMAGES
```
