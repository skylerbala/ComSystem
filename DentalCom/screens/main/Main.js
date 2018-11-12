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
    seconds2time(seconds) {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds - (hours * 3600)) / 60);
        var seconds = seconds - (hours * 3600) - (minutes * 60);
        var time = "";

        if (hours != 0) {
            time = hours + ":";
        }
        if (minutes != 0 || time !== "") {
            minutes = (minutes < 10 && time !== "") ? "0" + minutes : String(minutes);
            time += minutes + ":";
        }
        if (time === "") {
            time = seconds + "s";
        }
        else {
            time += (seconds < 10) ? "0" + seconds : String(seconds);
        }
        return time;
    }
    state = {
        messages: [
            {
                id: uuid.v1(),
                staffName: "Skyler",
                message: "Go to Hell",
                timeElapsed: 0,
                timeElapsedString: () => this.seconds2time(0)
            },
            {
                id: uuid.v1(),
                staffName: "Glenn",
                message: "Sup",
                timeElapsed: 0,
                timeElapsedString: () => this.seconds2time(0)
            }
        ],
        staff: [
            {
                id: uuid.v1(),
                name: "Skyler"
            },
            {
                id: uuid.v1(),
                name: "Jacob"
            },
            {
                id: uuid.v1(),
                name: "Glenn"
            },
        ],
        messageOptions: [
            {
                id: uuid.v1(),
                message: "Hello"
            },
            {
                id: uuid.v1(),
                message: "Bye"
            },
            {
                id: uuid.v1(),
                message: "Go To L5"
            },
        ],

    }


    tick() {
        var newMessages = this.state.messages.map((e) => {
            e.timeElapsed += 1
            e.timeElapsedString = this.seconds2time(e.timeElapsed)
            return e
        });
        this.setState({
            messages: newMessages
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    constructor(props) {
        super(props);
        this.socket = SocketIOClient('http://localhost:3000/');
        this.socket.on('messages', (newStaffName, newMessage) => this.onReceivedMessage(newStaffName, newMessage));
    }

    onReceivedMessage(newStaffName, newMessage) {

        var newMessage = {
            id: uuid.v1(),
            staffName: newStaffName,
            message: newMessage,
            timeElapsed: 0,
            timeElapsedString: () => this.seconds2time(0)
        }

        this.setState({
            messages: [newMessage, ...this.state.messages]
        })
    }

    handleStaffAdd(staffName) {
        newStaff = {
            id: uuid.v1(),
            name: staffName
        }
        this.setState({
            staff: [...this.state.staff, newStaff]
        });
    }

    handleStaffDelete(id) {
        var newStaffArr = [...this.state.staff]
        indexOfDelete = newStaffArr.findIndex(e => e.id == id)
        newStaffArr.splice(indexOfDelete, 1)
        this.setState({
            staff: newStaffArr
        });
    }

    handleMessageOptionAdd(message) {
        newMessage = {
            message: message
        }
        this.setState({
            messageOptions: [...this.state.messageOptions, newMessage]
        });
    }

    handleMessageOptionDelete(id) {
        var newMessageOptions = [...this.state.messageOptions]
        indexOfDelete = newMessageOptions.findIndex(e => e.id == id)
        newMessageOptions.splice(indexOfDelete, 1)
        this.setState({
            messageOptions: newMessageOptions
        });
    }

    handleMessageAdd(staffName, message) {
        var newMessage = {
            id: uuid.v1(),
            staffName: staffName,
            message: message,
            timeElapsed: 0,
            timeElapsedString: () => this.seconds2time(0)
        }
        this.setState({
            messages: [newMessage, ...this.state.messages]
        });
        
        this.socket.emit('messages', staffName, message);
    }

    handleMessageDelete(id) {
        var newMessages = [...this.state.messages]
        indexOfDelete = newMessages.findIndex(e => e.id == id)
        newMessages.splice(indexOfDelete, 1)
        this.setState({
            messages: newMessages
        });
    }


    render() {
        return (
            <MainNavigator
                screenProps={
                    {
                        onStaffAdd: (staffName) => this.handleStaffAdd(staffName),
                        onStaffDelete: (id) => this.handleStaffDelete(id),
                        onMessageOptionsAdd: (message) => this.handleMessageOptionAdd(message),
                        onMessageOptionsDelete: (id) => this.handleMessageOptionDelete(id),
                        onMessageAdd: (staffName, message) => this.handleMessageAdd(staffName, message),
                        onMessageDelete: (id) => this.handleMessageDelete(id),
                        messageOptions: this.state.messageOptions,
                        messages: this.state.messages,
                        staff: this.state.staff,
                    }
                }
            >
            </MainNavigator>
        );
    }
}

export default Main;
