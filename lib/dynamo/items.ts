import plaid from 'plaid';
import * as db from './dynamo';

const TableName = 'items';

export function getItemById(id: string) {
	const params = {
		TableName,
		Key: {
			id,
		},
	};

	return db.get(params);
}

export function getItemsByUser(user_id: string) {
	console.error('getItemsByUser not implemented');
	return null;
}

export function upsertItem(args: plaid.Item) {
	const { item_id, institution_id } = args;
	const params = {
		TableName,
		Item: {
			item_id,
			institution_id,
		},
	};

	return db.putItem(params);
}

export function deleteItem(args: { item_id: string }) {
	// TODO: delete all related accounts & transactions

	const params = {
		TableName,
		Key: {
			id: args.item_id,
		},
	};

	return db.deleteItem(params, args);
}
