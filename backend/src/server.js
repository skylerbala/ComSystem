"use strict"

const app = require("http").createServer().listen(3000, "0.0.0.0")
const io = require("socket.io").listen(app).sockets;
const db = require("./models");

io.on("connection", (socket) => {

  const sendSelfStatus = (s) => {
    socket.emit("status", s);
  }

  const sendReceivedStatus = (s) => {
    socket.broadcast.emit("status", s);
  }

  const sendAllStatus = (s) => {
    io.emit("status", s);
  }

  console.log("New Connection: " + socket.id);

  let initialState = {}

  let allMessages = db.Message.findAll({ order: [["createdAt", "ASC"]] });
  let allEmployees = db.Employee.findAll({ order: [["createdAt", "ASC"]] });
  let allExpressions = db.Expression.findAll({ order: [["createdAt", "ASC"]] });

  sendSelfStatus({
    message: "Success: Connection Established",
  });
  
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
    let ringtone = data.ringtone;

    if (content === "") {
      sendSelfStatus({
        message: "Error: No message entered"
      });
    }
    else {
      let newMessage = {
        name: name,
        content: content,
        color: color,
        ringtone: ringtone
      };

      db.Message.create(newMessage).then((result) => {
        io.emit("sendMessage", result);

        sendReceivedStatus({
          message: "Message Received"
        });
        
        sendSelfStatus({
          message: "Message Sent"
        });

      }).catch((error) => {
        sendSelfStatus({ message: "Error: " + error });
      });
    }
  });

  socket.on("addEmployee", (data) => {
    let name = data.name;
    let color = data.color;
    let ringtone = data.ringtone;
    if (name === "") {
      sendSelfStatus({
        message: "Error: No employee name entered"
      });
    }
    else if (ringtone === null || ringtone.substring(0, 4) != "Ring") {
      sendSelfStatus({
        message: "Error: No ringtone entered"
      });
    } 
    else {
      let newEmployee = {
        name: name,
        color: color,
        ringtone: ringtone
      };
      db.Employee.create(newEmployee).then((result) => {
        io.emit("addEmployee", result);
        sendAllStatus({
          message: "Employee Added",
        });
      }).catch((error) => {
        sendSelfStatus({ message: "Error: " + error });
      });
    }
  });

  socket.on("addExpression", (data) => {
    let content = data.content;
    let type = data.type;

    if (content === "") {
      sendSelfStatus({
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

        sendAllStatus({
          message: "Expression Added",
        });
      }).catch((error) => {
        sendSelfStatus({ message: "Error: " + error });
      });
    }
  });

  socket.on("updateEmployee", (data) => {
    let id = data.id
    let name = data.name
    let color = data.color
    let ringtone = data.ringtone

    db.Employee.findById(id).then((result) => {
      result.update({ name: name, color: color, ringtone: ringtone });
      io.emit("updateEmployee", data);
      sendAllStatus({
        message: "Employee Updated",
      });
    }).catch((error) => {
      sendSelfStatus({
        message: "Error: Employee Update Fail",
      });
      console.log("***Error deleting", JSON.stringify(error))
    })
  });

  socket.on("updateExpression", (data) => {
    let id = data.id
    let content = data.content;

    db.Expression.findById(id).then((result) => {
      result.update({ content: content });
      io.emit("updateExpression", data);
      sendAllStatus({
        message: "Expression Updated",
      });
    }).catch((error) => {
      sendSelfStatus({
        message: "Error: Expression Updated Fail",
      });
      console.log("***Error deleting", JSON.stringify(error))
    })
  });

  socket.on("deleteMessage", (data) => {
    let id = data.id;

    db.Message.findById(id).then((result) => {
      result.destroy({ force: true });
      io.emit("deleteMessage", data);
      sendAllStatus({
        message: "Message Deleted",
      });
    }).catch((error) => {
      sendSelfStatus({
        message: "Error: Message Delete Fail",
      });
      console.log("***Error deleting", JSON.stringify(error))
    })
  });

  socket.on("deleteEmployee", (data) => {
    let id = data.id

    db.Employee.findById(id).then((result) => {
      result.destroy({ force: true });
      io.emit("deleteEmployee", data);
      sendAllStatus({
        message: "Employee Deleted",
      });
    }).catch((error) => {
      sendSelfStatus({
        message: "Error: Employee Delete Fail",
      });
      console.log("***Error deleting", JSON.stringify(error))
    })
  });

  socket.on("deleteExpression", (data) => {
    let id = data.id

    db.Expression.findById(id).then((result) => {
      result.destroy({ force: true });
      io.emit("deleteExpression", data);
      sendAllStatus({
        message: "Expression Deleted",
      });
    }).catch((error) => {
      sendSelfStatus({
        message: "Error: Expression Delete Fail",
      });
      console.log("***Error deleting", JSON.stringify(error))
    })
  });

  socket.on("disconnect", () => {
    sendSelfStatus({
      message: "Disconnected",
    });
    console.log("Disconnected: ", socket.id)
  })

  socket.on("error", function (error) {
    sendSelfStatus({
      message: "eMessage Box Error",
    });
    console.log("Socket Error: ", socket.id)
    console.log(error)
  })
});