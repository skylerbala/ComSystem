const client = require('socket.io').listen(3000).sockets;
const db = require('./models');

// Connect to Socket.io
client.on('connection', (socket) => {
  console.log('Connected: ' + socket.id)

  let messages = db.Message;
  let employees = db.Employee;
  let statements = db.Statement;


  // Connection init
  messages.findAll({ order: [['date_created', 'DESC']] }).then((res) => {
    socket.emit('addMessages', res);
  }).catch((err) => {
    console.log('There was an error querying', JSON.stringify('Problem' + err.message))
  });
  employees.findAll().then((res) => {
    socket.emit('addEmployees', res);
  }).catch((err) => {
    console.log('There was an error querying', JSON.stringify('Problem' + err.message))
  });
  statements.findAll().then((res) => {
    socket.emit('addStatements', res);
  }).catch((err) => {
    console.log('There was an error querying', JSON.stringify('Problem' + err.message))
  });

  // Add
  socket.on('addMessages', (data) => {
    let employeeName = data.employeeName;
    let statement = data.statement;

    if (employeeName === '' || statement === '') {
      sendStatus('Please enter a name and message');
    }
    else {
      let newInstance = {
        employeeName: employeeName,
        statement: statement,
        date_created: Date.now()
      };
      messages.create(newInstance).then((res) => {
        client.emit('addMessages', [res]);
        sendStatus({
          message: 'Message Sent',
          clear: true
        });
      }).catch((err) => {
        console.log('***There was an error creating', JSON.stringify(err))
      });
    }
  });

  socket.on('addEmployees', (data) => {
    let name = data.name;

    if (name === '') {
      sendStatus('Please enter employee name');
    }
    else {
      let newInstance = {
        name: name,
        date_created: Date.now()
      };
      employees.create(newInstance).then((res) => {
        client.emit('addEmployees', [res]);
        sendStatus({
          message: 'Employee Sent',
          clear: true
        });
      }).catch((err) => {
        console.log('***There was an error creating', JSON.stringify(err))
      });
    }
  });

  socket.on('addStatements', (data) => {
    let statement = data.statement;

    if (statement === '') {
      sendStatus('Please enter a statement');
    }
    else {
      let newInstance = {
        statement: statement,
        date_created: Date.now()
      };

      statements.create(newInstance).then((res) => {
        client.emit('addStatements', [res]);
        sendStatus({
          message: 'Statement Sent',
          clear: true
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
      res.destroy({force: true})
      client.emit('deleteMessage', data);
    }).catch((err) => {
      console.log('***Error deleting', JSON.stringify(err))
    })
  });

  socket.on('deleteEmployee', (data) => {
    let id = data.id

    employees.findById(id).then((res) => {
      res.destroy({force: true})
      client.emit('deleteEmployee', data);
    }).catch((err) => {
      console.log('***Error deleting', JSON.stringify(err))
    })
  });

  socket.on('deleteStatement', (data) => {
    let id = data.id

    statements.findById(id).then((res) => {
      res.destroy({force: true})
      client.emit('deleteStatement', data);
    }).catch((err) => {
      console.log('***Error deleting', JSON.stringify(err))
    })
  });

  const sendStatus = (s) => {
    socket.emit('status', s);
  }

  socket.on('disconnect', () => {
    console.log('client disconnect...', socket.id)
  })

  socket.on('error', function (err) {
    console.log('received error from client:', socket.id)
    console.log(err)
  })
});