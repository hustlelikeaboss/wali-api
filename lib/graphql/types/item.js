// Item is a set of linked bank credentials
export default `
  type Item {
    item_id: ID!
    user_id: String!
    institution_id: String
    access_token: String
    
    accounts: [Account]
  }

  type Query {
    item(item_id: ID!): Item
  }

  type Mutation {
    upsertItem(
        item_id: ID!
        institution_id: String
        access_token: String
    ): Item

    deleteItem(
      item_id: ID!
    ): Item
  }
`;
