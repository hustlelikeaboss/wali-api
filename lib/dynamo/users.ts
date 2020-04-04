
import * as db from './dynamo';
import * as wali from '../types';

const TableName = 'users';

export function getUsers() {
	const params = {
		TableName,
		AttributesToGet: ['user_id', 'email', 'last_login_at'],
	};

	return db.scan(params);
}

export function getUserById(user_id: string) {
	const params = {
		TableName,
		Key: {
			user_id,
		},
	};

	return db.get(params);
}

export function upsertUser(args: wali.User) {
	const { user_id, email, last_login_at } = args;
	const params = {
		TableName,
		Item: {
			user_id,
			email,
			last_login_at,
		},
	};

	return db.putItem(params);
}

export function updateUser(args: wali.User) {
	const { user_id, email, last_login_at } = args;
	const params = {
		TableName,
		Key: {
			id: args.user_id,
		},
		ExpressionAttributeValues: {
			':last_login_at': last_login_at,
		},
		UpdateExpression: 'SET last_login_at = :last_login_at',
		ReturnValues: 'ALL_NEW',
	};

	return db.updateItem(params, args);
}

export function deleteUser(args: { user_id: string }) {
	// TODO: delete all items, accounts, and transactions

	const params = {
		TableName,
		Key: {
			user_id: args.user_id,
		},
	};

	return db.deleteItem(params, args);
}
