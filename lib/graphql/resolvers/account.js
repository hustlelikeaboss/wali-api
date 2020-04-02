import * as dbAccounts from '../../dynamo/accounts';
import * as dbTransactions from '../../dynamo/transactions';

export default {
  Query: {
    account: (_, args) => dbAccounts.getAccountById(args.account_id),
    accountsByUser: (_, args) => dbAccounts.getAccountsByUser(args.user_id),
  },
  Mutation: {
    upsertAccount: (_, args) => dbAccounts.upsertAccount(args),
    deleteAccount: (_, args) => dbAccounts.deleteAccount(args),
  },
  Account: {
    transactions: (account) => dbTransactions.getTransactionsByAccount(account.account_id),
  },
};
