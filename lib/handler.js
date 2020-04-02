import { graphqlLambda } from 'graphql-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

// Types
import userType from './graphql/types/user';
import itemType from './graphql/types/item';
import accountType from './graphql/types/account';
import transactionType from './graphql/types/transaction';

// Resolvers
import userResolver from './graphql/resolvers/user';
import itemResolver from './graphql/resolvers/item';
import accountResolver from './graphql/resolvers/account';
import transactionResolver from './graphql/resolvers/transaction';

const typeDefs = mergeTypes([userType, itemType, accountType, transactionType]);
const resolvers = mergeResolvers([
  userResolver,
  itemResolver,
  accountResolver,
  transactionResolver,
]);

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
