import * as dbUsers from '../../dynamo/users';
import * as dbItems from '../../dynamo/items';

export default {
  Query: {
    user: (_, args) => dbUsers.getUserById(args.id),
    users: () => dbUsers.getUsers(),
  },
  Mutation: {
    createUser: (_, args) => dbUsers.createUser(args),
    updateUser: (_, args) => dbUsers.updateUser(args),
    deleteUser: (_, args) => dbUsers.deleteUser(args),
  },
  User: {
    items: (user) => dbItems.getItemsByUser(user.user_id),
  },
};
