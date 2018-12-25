"use strict"

const app = require("http").createServer().listen(3000, "0.0.0.0")
const io = require("socket.io").listen(app).sockets;
const db = require("./models");

io.on("connection", (socket) => {

  console.log("New Connection: " + socket.id);

  let initialState = {}

  let allMessages = db.Message.findAll({ order: [["createdAt", "ASC"]] });
  let allEmployees = db.Employee.findAll({ order: [["createdAt", "ASC"]] });
  let allExpressions = db.Expression.findAll({ order: [["createdAt", "ASC"]] });

  Promise
    .all([allMessages, allEmployees, allExpressions])
    .then((result) => {
      initialState.messages = result[0];
      initialState.employees = result[1];
      initialState.expressions = result[2];
      initialState.messageBoxIsConnected = true;

      socket.emit("initState", initialState);

      console.log("Sending Initial State: " + initialState);
    })
    .catch(error => {
      console.log(error.message);
    });

  socket.on("sendMessage", (data) => {
    let name = data.name;
    let content = data.content;
    let color = data.color;

    if (content === "") {
      sendStatus({
        message: "Error: No message entered"
      });
    }
    else {
      let newMessage = {
        name: name,
        content: content,
        color: color
      };

      db.Message.create(newMessage).then((result) => {
        io.emit("sendMessage", result);
        sendStatus({
          message: "Success: Message Sent"
        });

      }).catch((error) => {
        sendStatus({ message: "Error: " + error });
      });
    }
  });

  socket.on("addEmployee", (data) => {
    let name = data.name;
    let color = data.color;

    if (name === "") {
      sendStatus({
        message: "Error: No employee name entered"
      });
    }
    else {
      let newEmployee = {
        name: name,
        color: color
      };
      db.Employee.create(newEmployee).then((result) => {
        io.emit("addEmployee", result);
        sendStatus({
          message: "Success: Employee Added",
        });
      }).catch((error) => {
        sendStatus({ message: "Error: " + error });
      });
    }
  });

  socket.on("addExpression", (data) => {
    let content = data.content;
    let type = data.type;

    if (content === "") {
      sendStatus({
        message: "Error: No expression entered",
      });
    }
    else {
      let newExpression = {
        content: content,
        type: type
      };

      db.Expression.create(newExpression).then((result) => {
        io.emit("addExpression", result);

        sendStatus({
          message: "Success: Expression Added",
        });
      }).catch((error) => {
        sendStatus({ message: "Error: " + error });
      });
    }
  });

  socket.on("updateEmployee", (data) => {
    console.log(data)
    let id = data.id
    let name = data.name
    let color = data.color

    db.Employee.findById(id).then((result) => {
      result.update({ name: name, color: color });
      io.emit("updateEmployee", data);
      sendStatus({
        message: "Success: Employee Updated",
      });
    }).catch((error) => {
      console.log("***Error deleting", JSON.stringify(error))
    })
  });

  socket.on("updateExpression", (data) => {
    let id = data.id
    let content = data.content;

    db.Expression.findById(id).then((result) => {
      result.update({ content: content });
      io.emit("updateExpression", data);
      sendStatus({
        message: "Success: Expression Updated",
      });
    }).catch((error) => {
      console.log("***Error deleting", JSON.stringify(error))
    })
  });

  socket.on("deleteMessage", (data) => {
    let id = data.id

    db.Message.findById(id).then((result) => {
      result.destroy({ force: true });
      io.emit("deleteMessage", data);
      sendStatus({
        message: "Success: Message Deleted",
      });
    }).catch((error) => {
      console.log("***Error deleting", JSON.stringify(error))
    })
  });

  socket.on("deleteEmployee", (data) => {
    let id = data.id

    db.Employee.findById(id).then((result) => {
      result.destroy({ force: true });
      io.emit("deleteEmployee", data);
      sendStatus({
        message: "Success: Employee Deleted",
      });
    }).catch((error) => {
      console.log("***Error deleting", JSON.stringify(error))
    })
  });

  socket.on("deleteExpression", (data) => {
    let id = data.id

    db.Expression.findById(id).then((result) => {
      result.destroy({ force: true });
      io.emit("deleteExpression", data);
      sendStatus({
        message: "Success: Expression Updated",
      });
    }).catch((error) => {
      console.log("***Error deleting", JSON.stringify(error))
    })
  });

  const sendStatus = (s) => {
    socket.emit("status", s);
  }

  socket.on("disconnect", () => {
    console.log("Disconnected: ", socket.id)
  })

  socket.on("error", function (error) {
    console.log("Socket Error: ", socket.id)
    console.log(error)
  })
});