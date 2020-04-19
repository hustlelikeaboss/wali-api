export default `
  scalar Date

  type User {
    user_id: ID! # DID token id, a unique blockchain public address
    email: String!
    last_login_at: Date # timestamp

    items: [Item]
  }

  type Query {
    user(user_id: ID!): User
    users: [User]
  }

  type Mutation {
    upsertUser(
        user_id: ID!
        email: String!
        last_login_at: Date
    ): User

    deleteUser(
      user_id: ID!
    ): User
  }
`;
