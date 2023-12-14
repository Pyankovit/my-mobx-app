import { types } from "mobx-state-tree";
import { users } from "./users";

const UserModel = types.model({
  id: types.identifierNumber,
  name: types.string,
  blocked: types.optional(types.boolean, false),
});

const UserStore = types
  .model({
    users: types.array(UserModel),
  })
  .actions((self) => ({
    addUser(user) {
      self.users.push(user);
    },

    editUserName(userId, newName) {
      const user = self.users.find((u) => u.id === userId);
      if (!user.blocked && user) {
        user.name = newName;
      }
    },

    deleteUser(userId) {
      const index = self.users.findIndex((u) => u.id === userId);
      if (!self.users[index].blocked && index !== -1) {
        self.users.splice(index, 1);
      }
    },

    toggleBlockUser(userId) {
      const user = self.users.find((u) => u.id === userId);
      if (user) {
        user.blocked = !user.blocked;
      }
    },
  }));

const userStore = UserStore.create({
  users,
});

export default userStore;
