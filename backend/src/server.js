"use strict"

const app = require('http').createServer().listen(3000, '0.0.0.0')
const io = require('socket.io').listen(app).sockets;
const db = require('./models');

// Connect to Socket.io
io.on('connection', (socket) => {

  let messages = db.Message;
  let employees = db.Employee;
  let expressions = db.Expression;


  console.log('New Connection: ' + socket.id);

  let initialState = {}

  const all_messages = messages.findAll({ order: [['createdAt', 'ASC']] })
  const all_employees = employees.findAll({ order: [['createdAt', 'ASC']] })
  const all_expressions = expressions.findAll({ order: [['createdAt', 'ASC']] })

  Promise
    .all([all_messages, all_employees, all_expressions])
    .then((res) => {
      initialState.messages = res[0]
      initialState.employees = res[1]
      initialState.expressions = res[2]
      initialState.isConnected = true

      console.log('Sending Initial State: ' + initialState);

      socket.emit('initializeState', initialState);
    })
    .catch(err => {
      console.log(err.message);
    });

  // Add
  socket.on('addMessage', (data) => {
    let name = data.name;
    let content = data.content;
    let color = data.color;

    if (name === '' || content === '') {
      sendStatus('Please enter a name and message');
    }
    else {
      let newMessage = {
        name: name,
        content: content,
        color: color
      };

      messages.create(newMessage).then((res) => {
        io.emit('addMessage', res);
        console.log("Message Added")

        sendStatus({
          message: 'Message Sent',
        });
      }).catch((err) => {
        console.log('***There was an error creating', JSON.stringify(err))
      });
    }
  });

  socket.on('addEmployee', (data) => {
    let name = data.name;
    let color = data.color;

    if (name === '') {
      sendStatus('Please enter employee name');
    }
    else if (color === '') {
      sendStatus('Please enter color')
    }
    else {
      let newEmployee = {
        name: name,
        color: color
      };
      employees.create(newEmployee).then((res) => {
        io.emit('addEmployee', res);
        console.log("Employee Added")
        sendStatus({
          message: 'Employee Sent',
        });
      }).catch((err) => {
        console.log('***There was an error creating', JSON.stringify(err))
      });
    }
  });

  socket.on('addExpression', (data) => {
    let content = data.content;
    let type = data.type;

    if (content === '') {
      sendStatus('Please enter a expression');
    }
    else {
      let newExpression = {
        content: content,
        type: type
      };

      expressions.create(newExpression).then((res) => {
        io.emit('addExpression', res);
        console.log("Expression Added")

        sendStatus({
          message: 'Expression Sent',
        });
      }).catch((err) => {
        console.log('***There was an error creating', JSON.stringify(err))
      });
    }
  });

  // Update
  socket.on('updateEmployee', (data) => {
    console.log(data)
    let id = data.id
    let name = data.name
    let color = data.color

    employees.findById(id).then((res) => {
      res.update({ name: name, color: color });
      io.emit('updateEmployee', data);
      console.log("Employee Updated")

    }).catch((err) => {
      console.log('***Error deleting', JSON.stringify(err))
    })
  });

  socket.on('updateExpression', (data) => {
    let id = data.id
    let content = data.content;

    expressions.findById(id).then((res) => {
      res.update({ content: content });
      io.emit('updateExpression', data);
      console.log("Expression Updated")

    }).catch((err) => {
      console.log('***Error deleting', JSON.stringify(err))
    })
  });

  // Delete
  socket.on('deleteMessage', (data) => {
    let id = data.id

    messages.findById(id).then((res) => {
      res.destroy({ force: true });
      io.emit('deleteMessage', data);
      console.log("Message Deleted")

    }).catch((err) => {
      console.log('***Error deleting', JSON.stringify(err))
    })
  });

  socket.on('deleteEmployee', (data) => {
    let id = data.id

    employees.findById(id).then((res) => {
      res.destroy({ force: true });
      io.emit('deleteEmployee', data);
      console.log("Employee Deleted")

    }).catch((err) => {
      console.log('***Error deleting', JSON.stringify(err))
    })
  });

  socket.on('deleteExpression', (data) => {
    let id = data.id

    expressions.findById(id).then((res) => {
      res.destroy({ force: true });
      io.emit('deleteExpression', data);
      console.log("Expression Deleted")

    }).catch((err) => {
      console.log('***Error deleting', JSON.stringify(err))
    })
  });

  const sendStatus = (s) => {
    socket.emit('status', s);
  }

  socket.on('disconnect', () => {
    console.log('Disconnected: ', socket.id)

  })

  socket.on('error', function (err) {
    console.log('Socket Error: ', socket.id)
    console.log(err)
  })
});