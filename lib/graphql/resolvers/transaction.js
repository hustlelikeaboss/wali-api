import * as dbTransactions from '../../dynamo/transactions';

export default {
  Query: {
    transaction: (_, args) => dbTransactions.getTransactionById(args.transaction_id),
    transactionsByAccount: (_, args) => dbTransactions.getTransactionsByAccount(args.account_id),
    transactionsByDateRange: (_, args) => dbTransactions.getTransactionsByDateRange(args.start, args.end, args.offset),
  },
  Mutation: {
    upsertTransaction: (_, args) => dbTransactions.upsertTransaction(args),
    deleteTransaction: (_, args) => dbTransactions.deleteTransaction(args),
  },
};
