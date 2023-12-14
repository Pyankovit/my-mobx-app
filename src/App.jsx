import { useLocalObservable, Observer } from "mobx-react-lite";
import userStore from "./store";
import { useState } from "react";
import "./App.css";

const defaultUser = { name: "", userId: null };

const App = () => {
  const localStore = useLocalObservable(() => userStore);
  const [newUser, setNewUser] = useState(defaultUser);
  const [editUser, setEdit] = useState(defaultUser);

  const resetUser = () => setNewUser(defaultUser);

  const handleEditUserName = (userId, newName) => {
    localStore.editUserName(userId, newName);
  };

  const handleDeleteUser = (userId) => {
    localStore.deleteUser(userId);
  };

  const handleToggleBlockUser = (userId) => {
    localStore.toggleBlockUser(userId);
  };

  const handleAddUser = () => {
    const user = {
      ...newUser,
      id: new Date().valueOf(),
    };
    localStore.addUser(user);
    resetUser();
  };

  return (
    <div>
      <h3>Users</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) =>
            setNewUser((user) => ({ ...user, name: e.target.value }))
          }
        />
        <button className="user-button" onClick={handleAddUser}>
          Add User
        </button>
        <button className="user-button" onClick={resetUser}>
          Cancel
        </button>
      </div>
      <ol>
        <Observer>
          {() =>
            localStore.users.map((user) => (
              <li key={user.id}>
                <div className="user-info">
                  <span>{user.name}</span>

                  {user.id === editUser.id ? (
                    <>
                      <input
                        type="text"
                        value={editUser.name}
                        onChange={(e) =>
                          setEdit((user) => ({ ...user, name: e.target.value }))
                        }
                      />
                      <button
                        className="user-button"
                        onClick={() => {
                          handleEditUserName(user.id, editUser.name);
                          if (!user.blocked) {
                            setEdit(defaultUser);
                          }
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        className="user-button"
                        onClick={() => setEdit(defaultUser)}
                      >
                        Cancel Edit
                      </button>
                    </>
                  ) : (
                    <button
                      className="user-button"
                      onClick={() => setEdit(user)}
                    >
                      Edit Name
                    </button>
                  )}
                  <button
                    className="user-button"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="user-button"
                    onClick={() => handleToggleBlockUser(user.id)}
                  >
                    Toggle Block
                  </button>
                  {user.blocked ? <span> (Blocked)</span> : null}
                </div>
              </li>
            ))
          }
        </Observer>
      </ol>
    </div>
  );
};

export default App;
