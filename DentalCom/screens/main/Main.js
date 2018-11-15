import React, { Component } from 'react';
import { Root, Container, Icon, Header, Button, Content, Tab, Title, Text, Tabs, Fab, } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TabNavigator } from 'react-navigation';
import MainPanel from './MainPanel';
import Staff from './Staff';
import Messages from './Messages';
import SocketIOClient from 'socket.io-client';
import moment from 'moment';
import Expo from 'expo';

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
        this.interval = setInterval(() => this.tick(), 1000);
        this.socket = SocketIOClient('http://localhost:3000/');
        this.socket.on('addMessages', (data) => this.handleReceivedMessages(data));
        this.socket.on('addEmployees', (data) => this.handleReceivedEmployees(data));
        this.socket.on('addStatements', (data) => this.handleReceivedStatements(data));
        this.socket.on('deleteMessage', (data) => this.handleReceivedDeleteMessage(data));
        this.socket.on('deleteEmployee', (data) => this.handleReceivedDeleteEmployee(data));
        this.socket.on('deleteStatement', (data) => this.handleReceivedDeleteStatement(data));
    }

    async playSound() {

        const soundObject = new Expo.Audio.Sound();
        try {
            await soundObject.loadAsync(require('./sound.wav'));
            await soundObject.playAsync();
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }

    }

    handleReceivedMessages(data) {
        console.log(data)

        this.setState({
            messages: data.concat(this.state.messages)
        })

    }

    handleReceivedEmployees(data) {
        this.setState({
            employees: data.concat(this.state.employees)
        })
    }

    handleReceivedStatements(data) {
        this.setState({
            statements: data.concat(this.state.statements)
        })
    }

    handleReceivedDeleteMessage(data) {
        let newMessages = this.state.messages;
        deleteIndex = newMessages.findIndex(e => e.id == data.id)
        newMessages.splice(deleteIndex, 1)
        this.setState({
            messages: newMessages
        });
    }

    handleReceivedDeleteEmployee(data) {
        let newEmployees = this.state.employees;
        deleteIndex = newEmployees.findIndex(e => e.id == data.id)
        newEmployees.splice(deleteIndex, 1)
        this.setState({
            employees: newEmployees
        });
    }

    handleReceivedDeleteStatement(data) {
        let newStatements = this.state.statements;
        deleteIndex = newStatements.findIndex(e => e.id == data.id)
        newStatements.splice(deleteIndex, 1)
        this.setState({
            statements: newStatements
        });
    }

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

    tick() {

        var newMessages = this.state.messages.map((e) => {
            e.timeElapsed = moment(e.date_created).fromNow();
            return e
        });
        this.setState({
            messages: newMessages
        });
        
    }




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
                        handleAddMessageSound: () => this.playSound()
                    }
                }
            >
            </MainNavigator>
        );
    }
}

export default Main;
