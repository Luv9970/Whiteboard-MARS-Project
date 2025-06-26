const users = [];

// Join user to chat
const addUser = ({userId, name, roomId, host, presenter}) => {
  const user = { userId, name, roomId, host, presenter };

  users.push(user);
  return user;
};
// User leaves chat
const removeUser = (id) => {
  const index = users.findIndex((user) => user.userId === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
 
//get users
const getusersInRoom =(roomId) => {
    return users.filter(user => user.roomId === roomId);
}



const getUser = (id) => {
  return users.find((user) => user.userId === id);
}

module.exports = {
    addUser,
    removeUser,
    getusersInRoom,
    getUser
};