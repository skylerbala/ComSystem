"use strict"

const app = require('http').createServer().listen(3000, '0.0.0.0')
const io = require('socket.io').listen(app).sockets;
const db = require('./models');

// Connect to Socket.io
io.on('connection', (socket) => {

  let messages = db.Message;
  let employees = db.Employee;
  let statements = db.Statement;

  console.log('New Connection: ' + socket.id);

  let initialState = {}

  const all_messages = messages.findAll({ order: [['createdAt', 'ASC']] })
  const all_employees = employees.findAll({ order: [['createdAt', 'ASC']] })
  const all_statements = statements.findAll({ order: [['createdAt', 'ASC']] })

  Promise
    .all([all_messages, all_employees, all_statements])
    .then((res) => {
      initialState.messages = res[0]
      initialState.employees = res[1]
      initialState.statements = res[2]
      initialState.connected = true

      console.log('Sending Initial State: ' + initialState);

      socket.emit('initializeState', initialState);
    })
    .catch(err => {
      console.log(err.message);
    });

  // Add
  socket.on('addMessage', (data) => {
    let name = data.name;
    let statement = data.statement;
    let color = data.color;

    if (name === '' || statement === '') {
      sendStatus('Please enter a name and message');
    }
    else {
      let newMessage = {
        name: name,
        statement: statement,
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

  socket.on('addStatement', (data) => {
    let statement = data.statement;

    if (statement === '') {
      sendStatus('Please enter a statement');
    }
    else {
      let newStatement = {
        statement: statement,
      };

      statements.create(newStatement).then((res) => {
        io.emit('addStatement', res);
        console.log("Statement Added")

        sendStatus({
          message: 'Statement Sent',
        });
      }).catch((err) => {
        console.log('***There was an error creating', JSON.stringify(err))
      });
    }
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

  socket.on('deleteStatement', (data) => {
    let id = data.id

    statements.findById(id).then((res) => {
      res.destroy({ force: true });
      io.emit('deleteStatement', data);
      console.log("Statement Deleted")

    }).catch((err) => {
      console.log('***Error deleting', JSON.stringify(err))
    })
  });

  const sendStatus = (s) => {
    socket.emit('status', s);
  }

  socket.on('disconnect', () => {
    console.log('Disconnected: ', socket.id)
    let data = {}
    data.connected = false
    socket.emit('diconnect', data);
  })

  socket.on('error', function (err) {
    console.log('Socket Error: ', socket.id)
    console.log(err)
  })
});