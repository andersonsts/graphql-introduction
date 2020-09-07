import User from '../../../models/User';
import { USER_ADDED } from './channels';

export default {
  User: {
    fullname: (user) => `${user.firstname} ${user.lastname}`,
  },
  Query: {
    users: () => User.find(),
    user: (_, { id }) => User.findById(id),
  },
  Mutation: {
    createUser: (_, { data }, { pubsub }) => {
      const user = await User.create(data);

      pubsub.publish(USER_ADDED, {
        userAdded: user,
      });

      return user;
    },
    updateUser: (_, { id, data }) => User.findOneAndUpdate(id, data, { new: true }),
    deleteUser: async (_, { id }) => !!(await User.findOneAndDelete(id))
  },
  Subscription: {
    userAdded: {
      subscribe: (object, arguments, { pubsub }) => pubsub.asyncIterator(USER_ADDED)
    }
  }
};