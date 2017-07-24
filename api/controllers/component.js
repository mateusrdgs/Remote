import mongoose from 'mongoose';
import { sendJsonResponse, parseInt } from '../helper/helper';

const Account = mongoose.model('Account');
const Component = mongoose.model('Component');

function createComponent(req, res) {
  const { idAccount, idResidence, idRoom } = req.params.idAccount;
  const { idBoard, description, type } = req.body;  
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'No account found!'
      });
      return;
    }
    else {
      const residences = account.residences;
      if(!residences.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No residences on this account!'
        });
        return;
      }
      else {
        const residence = residences.id(idResidence);
        if(!residence) {
          sendJsonResponse(res, 404, {
            'Message': 'No residence found!'
          });
          return;
        }
        else {
          const rooms = residence.rooms;
          if(!rooms.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No rooms on this residence'
            });
            return;
          }
          else {
            const room = rooms.id(idRoom);
            if(!room) {
              sendJsonResponse(res, 404, {
                'Message': 'No room found!'
              });
              return;
            }
            else {
              const components = room.components;
              switch(type) {
                case 1: {
                  const { digitalPin } = req.body;
                  components.push(new Component({
                    idBoard,
                    description,
                    type,
                    digitalPin
                  }));
                }
                break;
                case 2: {
                  const { analogPin, frequency } = req.body;
                  components.push(new Component({
                    idBoard,
                    description,
                    type,
                    analogPin,
                    frequency
                  }));
                }
                break;
                case 3: {
                  const { digitalPin, rotation, minRange, maxRange } = req.body;
                  components.push(new Component({
                    idBoard,
                    description,
                    type,
                    digitalPin,
                    rotation,
                    minRange, maxRange
                  }));
                }
                break;
                default: {
                  sendJsonResponse(res, 400, {
                    'Message': 'Invalid component type'
                  });
                  return;
                }
              }
              account.save((error, account) => {
                if(error) {
                  sendJsonResponse(res, 500, {
                    'Error': error.errmsg
                  });
                  return;
                }
                else {
                  const componentsLength = components.length;
                  sendJsonResponse(res, 201, {
                    'Component': components[componentsLength - 1]
                  });
                  return;
                }
              });
              
            }
          }
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

function returnComponents(req, res) {
  const { idAccount, idResidence, idRoom } = req.params;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'No account found!'
      });
      return;
    }
    else {
      const residences = account.residences;
      if(!residences.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No residences on this account!'
        });
        return;
      }
      else {
        const residence = residences.id(idResidence);
        if(!residence) {
          sendJsonResponse(res, 404, {
            'Message': 'No residence found!'
          });
          return;
        }
        else {
          const rooms = residence.rooms;
          if(!rooms.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No rooms on this residence!'
            });
            return;
          }
          else {
            const room = rooms.id(idRoom);
            if(!room) {
              sendJsonResponse(res, 404, {
                'Message': 'No room found!'
              });
            }
            else {
              const components = room.components;
              if(!components.length) {
                sendJsonResponse(res, 404, {
                  'Message': 'No components on this room!'
                });
                return;
              }
              else {
                sendJsonResponse(res, 200, {
                  'Components': components
                });
                return;
              }
            }
          }
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

function returnComponentById(req, res) {
  const { idAccount, idResidence, idRoom, idComponent } = req.params;
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
      const residences = account.residences;
      if(!residences.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No residences on this account!'
        });
        return;
      }
      else {
        const residence = residences.id(idResidence);
        if(!residence) {
          sendJsonResponse(res, 404, {
            'Message': 'No residence found!'
          });
          return;
        }
        else {
          const rooms = residence.rooms;
          if(!rooms.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No rooms on this residence!'
            });
            return;
          }
          else {
            const room = rooms.id(idRoom);
            if(!room) {
              sendJsonResponse(res, 404, {
                'Message': 'No room found!'
              });
              return;
            }
            else {
              const components = room.components;
              if(!components.length) {
                sendJsonResponse(res, 404, {
                  'Message': 'No components on this room!'
                });
                return;
              }
              else {
                const component = components.id(idComponent);
                if(!component) {
                  sendJsonResponse(res, 404, {
                    'Message': 'No component found!'
                  });
                  return;
                }
                else {
                  sendJsonResponse(res, 200, {
                    'Component': component
                  });
                  return;
                }
              }
            }
          }
        }
      }
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
  });
}

function updateComponentById(req, res) {
  const { idAccount, idResidence, idRoom, idComponent } = req.params;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'No account found!'
      });
      return;
    }
    else {
      const residences = account.residences;
      if(!residences.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No residences on this account!'
        });
        return;
      }
      else {
        const residence = residences.id(idResidence);
        if(!residence) {
          sendJsonResponse(res, 404, {
            'Message': 'No residence found!'
          });
          return;
        }
        else {
          const rooms = residence.rooms;
          if(!rooms.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No rooms on this residence!'
            });
            return;
          }
          else {
            const room = rooms.id(idRoom);
            if(!room) {
              sendJsonResponse(res, 404, {
                'Message': 'No room found!'
              });
              return;
            }
            else {
              const components = room.components;
              if(!components.length) {
                sendJsonResponse(res, 404, {
                  'Message': 'No components on this room!'
                });
                return;
              }
              else {
                const component = components.id(idComponent);
                if(!component) {
                  sendJsonResponse(res, 404, {
                    'Message': 'No component found!'
                  });
                  return;
                }
                else {
                  const { idBoard, description, type } = req.body;
                  component.idBoard = idBoard || component.idBoard;
                  component.description = description || component.description;
                  component.type = type || component.type;
                  switch(type) {
                    case 1: {
                      const { digitalPin } = req.body;
                      component.digitalPin = digitalPin || component.digitalPin;
                    }
                    break;
                    case 2: {
                      const { analogPin, frequency } = req.body;
                      component.analogPin = analogPin || component.analogPin;
                      component.frequency = frequency || component.frequency;
                    }
                    break;
                    case 3: {
                      const { digitalPin, rotation, minRange, maxRange } = req.body.digitalPin;
                      component.digitalPin = digitalPin || component.digitalPin;
                      component.rotation = rotation || component.rotation;
                      component.minRange = minRange || component.minRange;
                      component.maxRange = maxRange || component.maxRange;
                    }
                    break;
                    default: {
                      sendJsonResponse(res, 400, {
                        'Message': 'Component type not allowed!'
                      });
                      return;
                    }
                  }
                  account.save((error, account) => {
                    if(error) {
                      sendJsonResponse(res, 500, {
                        'Error': error.errmsg
                      });
                      return;
                    }
                    else {
                      sendJsonResponse(res, 200, {
                        'Component': component
                      });
                      return;
                    }
                  });
                }
              }
            }
          }
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

function deleteComponentById(req, res) {
  const { idAccount, idResidence, idRoom, idComponent } = req.params;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'No account found!'
      });
      return;
    }
    else {
      const residences = account.residences;
      if(!residences.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No residence on this account!'
        });
        return;
      }
      else {
        const residence = residences.id(idResidence);
        if(!residence) {
          sendJsonResponse(res, 404, {
            'Message': 'No residence found!'
          });
          return;
        }
        else {
          const rooms = residence.rooms;
          if(!rooms.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No rooms on this residence!'
            });
            return;
          }
          else {
            const room = room.id(idRoom);
            if(!room) {
              sendJsonResponse(res, 404, {
                'Message': 'No room found!'
              });
              return;
            }
            else {
              const components = room.components;
              if(!components.length) {
                sendJsonResponse(res, 404, {
                  'Message': 'No components on this room!'
                });
                return;
              }
              else {
                const component = components.id(idComponent);
                if(!component) {
                  sendJsonResponse(res, 404, {
                    'Message': 'No component found!'
                  });
                  return;
                }
                else {
                  component.remove();
                  account.save((error, account) => {
                    if(error) {
                      sendJsonResponse(res, 500, {
                        'Error': error.message
                      });
                      return;
                    }
                    else {
                      sendJsonResponse(res, 200, {
                        'Message': 'Component removed!'
                      });
                      return;
                    }
                  });
                }
              }
            }
          }
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

export {
  createComponent,
  returnComponents,
  returnComponentById,
  updateComponentById,
  deleteComponentById
}