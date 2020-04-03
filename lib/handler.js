// apollo-server-lambda
import { ApolloServer } from 'apollo-server-lambda';
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

const isLocal = process.env.NODE_ENV !== 'production';
const server = new ApolloServer({
	typeDefs,
	resolvers,
	// enable playground and introspection in local
	playground: isLocal,
	introspection: isLocal,
	// pass request info along as context
	context: ({ event, context }) => ({
		headers: event.headers,
		functionName: context.functionName,
		event,
		context,
	}),
});

exports.graphql = server.createHandler({
	cors: {
		origin: '*',
		credentials: true,
	},
});

exports.record = (event, context, callback) => {
	event.Records.forEach(record => {
		console.log(record.eventID);
		console.log(record.eventName);
		console.log('DynamoDB Record: %j', record.dynamodb);
	});
	callback(null, `Successfully processed ${event.Records.length} records.`);
};
