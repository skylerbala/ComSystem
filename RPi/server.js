const MongoClient = require('mongodb').MongoClient;
const client = require('socket.io').listen(3000).sockets;

// Connect to MongoDB
MongoClient.connect('mongodb://127.0.0.1/mongochat', (err, mongo) => {
  if (err) throw err;

  console.log('MongoDB Connected');

  // Choose Database
  const db = mongo.db('DentalCom');

  // Connect to Socket.io
  client.on('connection', (socket) => {
    console.log('Connected: ' + socket.id)
    
    let messages = db.collection('messages');
    let employees = db.collection('employees');
    let statements = db.collection('statements');


    // Connection init
    messages.find().limit(100).sort({ _id: 1 }).toArray((err, res) => {
      if (err) throw err;
      socket.emit('addMessages', res);
    });
    employees.find().limit(100).sort({ _id: 1 }).toArray((err, res) => {
      if (err) throw err;
      socket.emit('addEmployees', res);
    });
    statements.find().limit(100).sort({ _id: 1 }).toArray((err, res) => {
      if (err) throw err;
      socket.emit('addStatements', res);
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
        messages.insert(newInstance, (err, res) => {
          if (err) throw err;
          
          socket.emit('addMessages', res.ops);

          sendStatus({
            message: 'Message Sent',
            clear: true
          });
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
        employees.insert(newInstance, (err, res) => {
          if (err) throw err;

          socket.emit('addEmployees', res.ops);

          sendStatus({
            message: 'Employee Added',
            clear: true
          });
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

        statements.insert(newInstance, (err, res) => {
          socket.emit('addStatements', res.ops);
          sendStatus({
            message: 'Statement Sent',
            clear: true
          });
        });
      }
    });

    // Delete
    socket.on('deleteMessage', (data) => {
      let toDelete = {
        _id: data._id
      };

      messages.deleteOne(toDelete, (err, res) => {
        if (err) throw err;

        socket.emit('deleteMessage', data);
      });
    });

    socket.on('deleteEmployee', (data) => {
      let toDelete = {
        _id: data._id
      };

      messages.deleteOne(toDelete, (err, res) => {
        if (err) throw err;

        socket.emit('deleteEmployee', data);
      });
    });

    socket.on('deleteStatement', (data) => {
      let toDelete = {
        _id: data._id
      };

      messages.deleteOne(toDelete, (err, res) => {
        if (err) throw err;

        socket.emit('deleteStatement', data);
      });
    });

    const sendStatus = (s) => {
      socket.emit('status', s);
    }
    
    socket.on('disconnect', () => {
      console.log('client disconnect...', socket.id)    })
  
      socket.on('error', function (err) {
      console.log('received error from client:', socket.id)
      console.log(err)
    })
  });

})



// const MongoClient = require('mongodb').MongoClient;
// const client = require('socket.io').listen(3000).sockets;

// // Connect to MongoDB
// MongoClient.connect('mongodb://127.0.0.1/mongochat', (err, mongo) => {
//   if (err) {
//     throw err;
//   }

//   console.log('MongoDB Connected')

//   const db = mongo.db('messages')

//   // Connect to Socket.io
//   client.on('connection', (socket) => {
//     let messages = db.collection('messages');

//     // Create function to send status
//     sendStatus = (s) => {
//       socket.emit('status', s);
//     }

//     // Get Messages from Mongo Collection when first connected
//     messages.find().limit(100).sort({_id: 1}).toArray((err, res) => {
//       if (err) {
//         throw err;
//       }

//       // Emit Messages
//       socket.emit('output', res);
//     });

//     // Handleput Events
//     socket.on('input', (data) => {
//       let name = data.name;
//       let message = data.message;

//       // Check for name and message
//       if (name === '' || message === '') {
//         // Send Error Status
//         sendStatus('Please enter a name and message');
//       }
//       else {
//         //sert a message
//         messages.insert({name: name, message: message}, (err, res) => {
//           // This is client because the message gets sent to everyone but the client
//           // socket is everyone

//           console.log(res.ops[0]._id);
//           client.emit('output', [data])

//           // Send Status Object
//           sendStatus({
//             message: 'Message Sent',
//             clear: true
//           })
//         });
//       }
//     });

//     // Handle Clear
//     socket.on('clear', (data) => {
//       // Remove all chats from collection
//       messages.remove({}, () => {
//         socket.emit('cleared');
//       });
//     });
//   });

// })
