export default `
  type Transaction {
    transaction_id: ID!
    account_id: String
    account_owner: String
	  iso_currency_code: String
    amount: Float
    date: String
    transaction_type: String
    pending: Boolean
    name: String # merchant name
    catetory_id: String
    category: [String]
  }

  type Query {
    transaction(transaction_id: ID!): Transaction
    transactionsByAccount(account_id: ID!): [Transaction]
    transactionsByDateRange(start: String, end: String, offset: Int): [Transaction]
  }

  type Mutation {
    upsertTransaction(
      transaction_id: ID!
      account_id: String
      account_owner: String
      iso_currency_code: String
      amount: Float
      date: String
      transaction_type: String
      pending: Boolean
      name: String # merchant name
      catetory_id: String
      category: [String]
    ): Transaction

    deleteTransaction(
      transaction_id: ID!
    ): Transaction
  }
`;
