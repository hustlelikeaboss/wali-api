export default `
  type User {
    user_id: ID! # DID token id, a unique blockchain public address
    email: String!
    last_login_at: Int # timestamp

    items: [Item]
  }

  type Query {
    user(user_id: ID!): User
    users: [User]
  }

  type Mutation {
    createUser(
        user_id: ID!
        email: String!
        last_login_at: Int
    ): User

    updateUser(
      user_id: ID!
      last_login_at: String!
    ): User

    deleteUser(
      user_id: ID!
    ): User
  }
`;
