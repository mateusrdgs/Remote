const mongoose = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      ObjectId = mongoose.Types.ObjectId;

function createComponent(req, res, next) {
  const { idAccount, idResidence, idRoom } = req.params;
  const { idBoard, description  } = req.body;
  let { type } = req.body;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!idResidence || !ObjectId.isValid(idResidence)) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else if(!idRoom || !ObjectId.isValid(idRoom)) {
    sendJsonResponse(res, 400, {
      'Message': 'Room Id is required!'
    });
    return;
  }
  else if((!idBoard || !ObjectId.isValid(idBoard)) || !description || !type) {
    sendJsonResponse(res, 400, {
      'Message': 'Board Id, component description and type are required!'
    });
  }
  else {
    type = parseInt(type);
    switch(type) {
      case 1: {
        const { digitalPin } = req.body;
        if(!parseInt(digitalPin)) {
          sendJsonResponse(res, 400, {
            'Message': 'Field digitalPin is required!'
          });
          return;
        }
        else {
          next();
        }
      }
      break;
      case 2: {
        const { analogPin, frequency } = req.body;
        if(!parseInt(analogPin) || !parseInt(frequency)) {
          sendJsonResponse(res, 400, {
            'Message': 'Fields analogPin and frequency are required!'
          });
          return;
        }
        else {
          next();
        }
      }
      break;
      case 3: {
        const { digitalPin, rotation, minRange, maxRange } = req.body;
        if(!parseInt(digitalPin) || !parseInt(rotation) || !parseInt(minRange) || !parseInt(maxRange)) {
          sendJsonResponse(res, 400, {
            'Message': 'Fields digitalPin, rotation, minRange and maxRange are required!'
          });
          return;
        }
        else {
          next();
        }
      }
      break;
      default: {
        sendJsonResponse(res, 400, {
          'Message': 'Invalid component type'
        });
        return;
      }
    }
  }
}

function returnComponents(req, res, next) {
  const { idAccount, idResidence, idRoom } = req.params;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!idResidence || !ObjectId.isValid(idResidence)) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else if(!idRoom || !ObjectId.isValid(idRoom)) {
    sendJsonResponse(res, 400, {
      'Message': 'Room Id is required!'
    });
    return;
  }
  else {
    next();
  }
}

function returnAndDeleteComponentById(req, res, next) {
  const { idAccount, idResidence, idRoom, idComponent } = req.params;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!idResidence || !ObjectId.isValid(idResidence)) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else if(!idRoom || !ObjectId.isValid(idRoom)) {
    sendJsonResponse(res, 400, {
      'Message': 'Room Id is required!'
    });
    return;
  }
  else if(!idComponent || !ObjectId.isValid(idComponent)) {
    sendJsonResponse(res, 400, {
      'Message': 'Component Id is required!'
    });
  }
  else {
    next();
  }
}

function updateComponentById(req, res, next) {
  const { idAccount, idResidence, idRoom, idComponent } = req.params;
  const { idBoard, description  } = req.body;
  let { type } = req.body;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!idResidence || !ObjectId.isValid(idResidence)) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else if(!idRoom || !ObjectId.isValid(idRoom)) {
    sendJsonResponse(res, 400, {
      'Message': 'Room Id is required!'
    });
    return;
  }
  else if(!idComponent || !Object.isValid(idComponent)) {
    sendJsonResponse(res, 400, {
      'Messsage': 'Component Id is required!'
    });
    return;
  }
  else if((!idBoard || !ObjectId.isValid(idBoard)) || !description || !type) {
    sendJsonResponse(res, 400, {
      'Message': 'Board Id, component description and type are required!'
    });
    return;
  }
  else {
    type = parseInt(type);
    switch(type) {
      case 1: {
        const { digitalPin } = req.body;
        if(!parseInt(digitalPin)) {
          sendJsonResponse(res, 400, {
            'Message': 'Field digitalPin is required!'
          });
          return;
        }
        else {
          next();
        }
      }
      break;
      case 2: {
        const { analogPin, frequency } = req.body;
        if(!parseInt(analogPin) || !parseInt(frequency)) {
          sendJsonResponse(res, 400, {
            'Message': 'Fields analogPin and frequency are required!'
          });
          return;
        }
        else {
          next();
        }
      }
      break;
      case 3: {
        const { digitalPin, rotation, minRange, maxRange } = req.body;
        if(!parseInt(digitalPin) || !parseInt(rotation) || !parseInt(minRange) || !parseInt(maxRange)) {
          sendJsonResponse(res, 400, {
            'Message': 'Fields digitalPin, rotation, minRange and maxRange are required!'
          });
          return;
        }
        else {
          next();
        }
      }
      break;
      default: {
        sendJsonResponse(res, 400, {
          'Message': 'Invalid component type'
        });
        return;
      }
    }
  }
}

module.exports = {
  createComponent,
  returnComponents,
  returnAndDeleteComponentById,
  updateComponentById
}