import React, { Component } from 'react';
import { Root, Container, Icon, Header, Button, Content, Tab, Title, Text, Tabs, Fab, } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TabNavigator } from 'react-navigation';
import MainPanel from './MainPanel';
import Staff from './Staff';
import Messages from './Messages';
import SocketIOClient from 'socket.io-client';

var uuid = require('react-native-uuid');

const MainNavigator = TabNavigator(
    {
        MainPanel: {
            screen: MainPanel,
            navigationOptions: {
                title: 'MainPanel',
                tabBarIcon: ({ tintColor }) => {
                    return (<Icon type="FontAwesome" name="home" style={{ color: tintColor }} />)
                }
            }
        },
        Staff: {
            screen: Staff,
            navigationOptions: {
                title: 'Staff',
                tabBarIcon: ({ tintColor }) => {
                    return (<Icon type="FontAwesome" name="user" style={{ color: tintColor }} />)
                }
            }
        },
        Messages: {
            screen: Messages,
            navigationOptions: {
                title: 'Messages',
                tabBarIcon: ({ tintColor }) => {
                    return (<Icon type="FontAwesome" name="envelope" style={{ color: tintColor }} />)
                }
            }
        }
    }, {
        initialRouteName: 'MainPanel',
    }
);




class Main extends Component {
    state = {
        messages: [],
        employees: [],
        statements: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.interval = setInterval(() => this.tick(), 1000);
        this.socket = SocketIOClient('http://localhost:3000/');
        this.socket.on('addMessages', (data) => this.handleReceivedMessages(data));
        this.socket.on('addEmployees', (data) => this.handleReceivedEmployees(data));
        this.socket.on('addStatements', (data) => this.handleReceivedStatements(data));
        this.socket.on('deleteMessage', (data) => this.handleReceivedDeleteMessage(data));
        this.socket.on('deleteEmployee', (data) => this.handleReceivedDeleteEmployee(data));
        this.socket.on('deleteStatement', (data) => this.handleReceivedDeleteStatement(data));
    }

    handleReceivedMessages(data) {
        this.setState({
            messages: [...data, ...this.state.messages]
        })
        
    }

    handleReceivedEmployees(data) {
        this.setState({
            employees: [...data, ...this.state.employees]
        })
    }

    handleReceivedStatements(data) {
        this.setState({
            statements: [...data, ...this.state.statements]
        })
    }

    handleReceivedDeleteMessage(data) {
        let newMessages = this.state.messages;
        deleteIndex = newMessages.findIndex(e => e._id == data._id)
        newMessages.splice(deleteIndex, 1)
        this.setState({
            messages: newMessages
        });
    }

    handleReceivedDeleteEmployee(data) {
        let newEmployees = this.state.employees;
        deleteIndex = newEmployees.findIndex(e => e._id == data._id)
        newEmployees.splice(deleteIndex, 1)
        this.setState({
            employees: newEmployees
        });
    }

    handleReceivedDeleteStatement(data) {
        let newStatements = this.state.statements;
        deleteIndex = newStatements.findIndex(e => e._id == data._id)
        newStatements.splice(deleteIndex, 1)
        this.setState({
            statements: newStatements
        });
    }

    // handleStaffAdd(staffName) {
    //     newStaff = {
    //         id: uuid.v1(),
    //         name: staffName
    //     }
    //     this.setState({
    //         staff: [...this.state.staff, newStaff]
    //     });
    // }

    // handleStaffDelete(id) {
    //     var newStaffArr = [...this.state.staff]
    //     indexOfDelete = newStaffArr.findIndex(e => e.id == id)
    //     newStaffArr.splice(indexOfDelete, 1)
    //     this.setState({
    //         staff: newStaffArr
    //     });
    // }

    // handleMessageOptionAdd(message) {
    //     newMessage = {
    //         message: message
    //     }
    //     this.setState({
    //         messageOptions: [...this.state.messageOptions, newMessage]
    //     });
    // }

    // handleMessageOptionDelete(id) {
    //     var newMessageOptions = [...this.state.messageOptions]
    //     indexOfDelete = newMessageOptions.findIndex(e => e.id == id)
    //     newMessageOptions.splice(indexOfDelete, 1)
    //     this.setState({
    //         messageOptions: newMessageOptions
    //     });
    // }

    handleAddMessage(data) {
        this.socket.emit('addMessages', data);
    }

    handleAddEmployee(data) {
        this.socket.emit('addEmployees', data);
    }

    handleAddStatement(data) {
        this.socket.emit('addStatements', data);
    }

    handleDeleteMessage(data) {
        this.socket.emit('deleteMessage', data);
    }

    handleDeleteEmployee(data) {
        this.socket.emit('deleteEmployee', data);
    }

    handleDeleteStatement(data) {
        this.socket.emit('deleteStatement', data);
    }

    // handleMessageDelete(id) {
    //     var newMessages = [...this.state.messages]
    //     indexOfDelete = newMessages.findIndex(e => e.id == id)
    //     newMessages.splice(indexOfDelete, 1)
    //     this.setState({
    //         messages: newMessages
    //     });
    // }

    // seconds2time(seconds) {
    //     var hours = Math.floor(seconds / 3600);
    //     var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    //     var seconds = seconds - (hours * 3600) - (minutes * 60);
    //     var time = "";

    //     if (hours != 0) {
    //         time = hours + ":";
    //     }
    //     if (minutes != 0 || time !== "") {
    //         minutes = (minutes < 10 && time !== "") ? "0" + minutes : String(minutes);
    //         time += minutes + ":";
    //     }
    //     if (time === "") {
    //         time = seconds + "s";
    //     }
    //     else {
    //         time += (seconds < 10) ? "0" + seconds : String(seconds);
    //     }
    //     return time;
    // }

    // tick() {
    //     var newMessages = this.state.messages.map((e) => {
    //         e.timeElapsed += 1
    //         e.timeElapsedString = this.seconds2time(e.timeElapsed)
    //         return e
    //     });
    //     this.setState({
    //         messages: newMessages
    //     });
    // }

    


    render() {
        return (
            <MainNavigator
                screenProps={
                    {
                        messages: this.state.messages,
                        employees: this.state.employees,
                        statements: this.state.statements,
                        handleAddMessage: (data) => this.handleAddMessage(data),
                        handleAddEmployee: (data) => this.handleAddEmployee(data),
                        handleAddStatement: (data) => this.handleAddStatement(data),
                        handleDeleteMessage: (data) => this.handleDeleteMessage(data),
                        handleDeleteEmployee: (data) => this.handleDeleteEmployee(data),
                        handleDeleteStatement: (data) => this.handleDeleteStatement(data),
                    }
                }
            >
            </MainNavigator>
        );
    }
}

export default Main;
