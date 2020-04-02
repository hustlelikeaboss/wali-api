import * as dbItems from '../../dynamo/items';
import * as dbAccounts from '../../dynamo/accounts';

export default {
  Query: {
    item: (_, args) => dbItems.getItemById(args.id),
  },
  Mutation: {
    upsertItem: (_, args) => dbItems.upsertItem(args),
    deleteItem: (_, args) => dbItems.deleteItem(args),
  },
  Item: {
    accounts: (item) => dbAccounts.getAccountsByItem(item.item_id),
  },
};
