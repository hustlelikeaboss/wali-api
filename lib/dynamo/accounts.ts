/// <reference path="../../node_modules/plaid/index.d.ts" />
import plaid from 'plaid';
import * as db from './dynamo';

const TableName = 'accounts';

export function getAccountById(account_id: string) {
	const params = {
		TableName,
		Key: {
			account_id,
		},
	};

	return db.get(params);
}

export function getAccountsByUser(user_id: string) {
	console.error('getAccountByUser not implemented');
	return null;
}

export function getAccountsByItem(item_id: string) {
	console.error('getAccountsByUItem not implemented');
	return null;
}

export function upsertAccount(args: { account: plaid.Account }) {
	const params = {
		TableName,
		Item: args.account,
	};

	return db.putItem(params);
}

export function deleteAccount(args: { account_id: string }) {
	const params = {
		TableName,
		Key: {
			account_id: args.account_id,
		},
	};

	return db.deleteItem(params, args);
}
