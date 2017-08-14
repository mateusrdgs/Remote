const mongoose = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      Account  = mongoose.model('Account'),
      AdminUser = require('../models/user').AdminUser,
      CommonUser = require('../models/user').CommonUser;

function createUser(req, res) {
  const { idAccount } = req.params;
  let { name, type, pin } = req.body;
  type = Boolean(type);
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {          
      sendJsonResponse(res, 404, {
        'Message': 'Account not found!'
      });
      return;
    }
    else {
      const users = account.users;
      if(type) {
        const userAdmin = new AdminUser();
        userAdmin.name = name;
        userAdmin.setPin(pin.toString());
        console.log(userAdmin);
        users.push(userAdmin);
        const length = users.length - 1;        
        console.log(users[length]);
      }
      else {
        const user = new CommonUser();
        user.name = name;
        users.push(user);
      }
      account.save((error, account) => {
        if(error) {
          sendJsonResponse(res, 500, {
            'Error': error.errmsg
          });
          return;
        }
        else {
          const usersLength = users.length - 1;
          sendJsonResponse(res, 201, { 
            'User': users[usersLength]
          });
          return;
        }
      });
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
    return;
  });
}

function returnUsers(req, res) {
  const { idAccount } = req.params;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'Account not found!'
      });
      return;
    }
    else {
      const users = account.users;
      if(!users.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No users on this account!'
        });
        return;
      }
      else {
        sendJsonResponse(res, 200, {
          'Users': users
        });
      }
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
  });
}

function returnUserById(req, res) {
  const { idAccount, idUser } = req.params;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      console.log(idAccount, idUser);
      sendJsonResponse(res, 404, {
        'Message': 'Account not found!'
      });
      return;
    }
    else {
      console.log(idAccount, idUser);
      const users = account.users;
      if(!users) {
        sendJsonResponse(res, 404, {
          'Message': 'No users on this account!'
        });
        return;
      }
      else {
        const user = users.id(idUser);
        if(!user) {
          sendJsonResponse(res, 404, {
            'Message': 'User not found!'
          });
          return;
        }
        else {
          sendJsonResponse(res, 200, {
            'User': user
          });
          return;
        }
      }
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
    return;
  });
}

function updateUserById(req, res) {
  const { idAccount, idUser } = req.params;
  const { name, type } = req.body;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'Account not found!'
      });
      return;
    }
    else {
      const users = account.users;
      if(!users.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No users on this account!'
        });
        return;
      }
      else {            
        const user = users.id(idUser);
        if(!user) {
          sendJsonResponse(res, 404, {
            'Message': 'User not found!'
          });
          return;
        }
        else {          
          user.name = name || user.name;
          user.type = type || user.type;
          account.save((error, account) =>  {
            if(error) {
              sendJsonResponse(res, 500, {
                'Error': error.errmsg
              });
            }
            else {
              sendJsonResponse(res, 200, {
                'User': user
              });
              return;
            }
          });
        }
      }
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
  });
}

function deleteUserById(req, res) {
  const { idAccount, idUser } = req.params;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 400, {
        'Message': 'Account not found!'
      });
      return;
    }
    else {
      const users = account.users;
      if(!users.length) {
        sendJsonResponse(res, 400, {
          'Message': 'No users on this account!'
        });
        return;
      }
      else {
        const user = users.id(idUser);
        if(!user) {
          sendJsonResponse(res, 400, {
            'Message': 'User not found!'
          });
          return;
        }
        else {
          user.remove();
          account.save((error, account) => {
            if(error) {
              sendJsonResponse(res, 400, {
                'Error': error.errmsg
              });
              return;
            }
            else {
              sendJsonResponse(res, 200, {
                'Message': 'User removed!'
              });
              return;
            }
          });
        }
      }
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
    return;
  });
}

module.exports = {
  createUser,
  returnUsers,
  returnUserById,
  updateUserById,
  deleteUserById
}