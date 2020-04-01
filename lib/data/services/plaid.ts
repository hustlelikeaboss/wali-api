import plaid from 'plaid';
import moment from 'moment';

export default class PlaidClient {
	client: plaid.Client;

	constructor() {
		this.client = new plaid.Client(
			process.env.PLAID_CLIENT_ID || '',
			process.env.PLAID_SECRET || '',
			process.env.PLAID_PUBLIC_KEY || '',
			`https://${process.env.PLAID_ENV}.plaid.com`,
			{
				version: '2019-05-29',
			}
		);
	}

	getAccounts(accessToken: string, accounts: string[]): Promise<plaid.AccountsResponse> {
		return this.client.getAccounts(accessToken, {
			account_ids: accounts,
		});
	}

	getBalance(accessToken: string, accountIds: string[]): Promise<plaid.AccountsResponse> {
		return this.client.getBalance(accessToken, {
			account_ids: accountIds,
		});
	}

	getTransactions(
		accessToken: string,
		accountIds: string[],
		startDate?: string,
		endDate?: string
	): Promise<plaid.TransactionsResponse> {
		const now = moment();
		const today = now.format('YYYY-MM-DD');
		const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');

		return this.client.getTransactions(
			accessToken,
			startDate ? moment(startDate).format('YYYY-MM-DD') : thirtyDaysAgo,
			endDate ? moment(endDate).format('YYYY-MM-DD') : today,
			{
				account_ids: accountIds,
				count: 100,
				offset: 0,
			}
		);
	}
}
