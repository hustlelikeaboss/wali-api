import { graphqlLambda } from 'graphql-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

// Types
import artistType from './data/types/artist';
import songType from './data/types/song';

// Resolvers
import artistResolver from './data/resolvers/artist';
import songResolver from './data/resolvers/song';

const typeDefs = mergeTypes([artistType, songType]);
const resolvers = mergeResolvers([artistResolver, songResolver]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

exports.graphql = (event, context, callback) => {
  const callbackFilter = (error, output) => {
    const outputWithHeader = {
      ...output,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    callback(error, outputWithHeader);
  };

  graphqlLambda({ schema })(event, context, callbackFilter);
};

exports.record = (event, context, callback) => {
  event.Records.forEach((record) => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};
