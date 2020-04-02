import plaid from 'plaid';
import * as db from './dynamo';

const TableName = 'transactions';

export function getTransactionById(transaction_id: string) {
	const params = {
		TableName,
		Key: {
			transaction_id,
		},
	};

	return db.get(params);
}

export function getTransactionsByAccount(account_id: string) {
	console.error('getTransactionsByAccount not implemented');
	return null;
}

export function getTransactionsByDateRange(start: string, end: string, offset: number) {
	console.error('getTransactionsByDateRange not implemented');
	return null;
}

export function upsertTransaction(args: plaid.Transaction) {
	const {
		transaction_id,
		account_id,
		account_owner,
		iso_currency_code,
		amount,
		date,
		transaction_type,
		pending,
		name,
		category,
	} = args;
	const params = {
		TableName,
		Item: {
			transaction_id,
			account_id,
			account_owner,
			iso_currency_code,
			amount,
			date,
			transaction_type,
			pending,
			name,
			category,
		},
	};

	return db.putItem(params);
}

export function deleteTransaction(args: { transaction_id: string }) {
	const params = {
		TableName,
		Key: {
			transaction_id: args.transaction_id,
		},
	};

	return db.deleteItem(params, args);
}
