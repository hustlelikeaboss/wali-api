import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const customScalarResolverMap = {
	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Date custom scalar type',
		parseValue(value) {
			return value; // save as is
		},
		serialize(value) {
			return value; // return as is
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return parseInt(ast.value, 10); // ast value is always in string format
			}
			return null;
		},
	}),
};

export default customScalarResolverMap;
