export default `
  type Account {
    account_id: ID!
    balances: Balances
    mask: String
    name: String
    official_name: String
    subtype: String
    type: String

    transactions: [Transaction]
  }

  type Balances {
    available: Float
    current: Float
    iso_currency_code: String
    limit: Int
    unofficial_currency_code: String
  }

  input InputBalances {
    available: Float
    current: Float
    iso_currency_code: String
    limit: Int
    unofficial_currency_code: String
  }

  type Query {
    account(account_id: ID!): Account
    accountsByUser(user_id: ID!): [Account]
  }

  type Mutation {
    upsertAccount(
      account_id: ID!
      balances: InputBalances
      mask: String
      name: String
      official_name: String
      subtype: String
      type: String
    ): Account

    deleteAccount(
      account_id: ID!
    ): Account
  }
`;
