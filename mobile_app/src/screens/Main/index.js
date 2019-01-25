import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import { Audio } from 'expo';
import MainTabNavigator from './MainTabNavigator';
import AsyncStorageAPI from '../../library/utils/AsyncStorageAPI';
import Sounds from '../../assets/sounds';
import Toast from 'react-native-root-toast';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            employees: [],
            expressions: [],
            messageBoxIP: null,
            messageBoxIsConnected: false
        };
        this.socket = null;
        this.storage = new AsyncStorageAPI;
        this.toast = null;
        global.currTab = 'MainPanel';
    }

    componentDidMount() {
        this.storage.retrieveItem('messageBoxIP').then((result) => {
            this.initSocketIOClient(result);
        }).catch((error) => {
            // console.log(error);
        });
    }

    componentWillUnmount() {
        this.socket.close();
    }

    initSocketIOClient = (messageBoxIP) => {
        this.setState({ messageBoxIP: messageBoxIP });
        this.socket = SocketIOClient("http://" + messageBoxIP + ":3000");
        this.socket.on('initState', (data) => this.initState(data));
        this.socket.on('sendMessage', (data) => this.handleInputSendMessage(data));
        this.socket.on('addEmployee', (data) => this.handleInputAddEmployee(data));
        this.socket.on('addExpression', (data) => this.handleInputAddExpression(data));
        this.socket.on('updateEmployee', (data) => this.handleInputUpdateEmployee(data));
        this.socket.on('updateExpression', (data) => this.handleInputUpdateExpression(data));
        this.socket.on('deleteMessage', (data) => this.handleInputDeleteMessage(data));
        this.socket.on('deleteEmployee', (data) => this.handleInputDeleteEmployee(data));
        this.socket.on('deleteExpression', (data) => this.handleInputDeleteExpression(data));
        this.socket.on('status', (data) => this.handleInputStatus(data));
        this.socket.on('disconnect', (data) => this.handleInputDisconnect());
    }

    handleMessageBoxIPChange = async (data) => {
        this.storage.storeItem('messageBoxIP', data);
        this.setState({ messageBoxIP: data }, () => {
            this.socket.close();

            if (this.state.messageBoxIP.length > 1) {
                this.initSocketIOClient(data);
            }
        });
    }

    initState = (data) => {
        this.setState({
            messages: data.messages,
            employees: data.employees,
            expressions: data.expressions,
            messageBoxIsConnected: true
        });
    }

    handleInputSendMessage = (data) => {
        this.setState({
            messages: [...this.state.messages, data]
        });
        this.playTone(data.ringtone);
    }

    handleInputAddEmployee = (data) => {
        this.setState({
            employees: [...this.state.employees, data]
        });
    }

    handleInputAddExpression = (data) => {
        this.setState({
            expressions: [...this.state.expressions, data]
        });
    }

    handleInputUpdateEmployee = (data) => {
        let updatedEmployees = [...this.state.employees];
        let target = updatedEmployees.findIndex(e => e.id === data.id);
        updatedEmployees[target] = data;
        this.setState({
            employees: updatedEmployees
        });
    }

    handleInputUpdateExpression = (data) => {
        let updatedExpressions = [...this.state.expressions];
        let target = updatedExpressions.findIndex(e => e.id === data.id);
        updatedExpressions[target] = data;
        this.setState({
            expressions: updatedExpressions
        });
    }

    handleInputDeleteMessage = (data) => {
        let updatedMessages = [...this.state.messages];
        let target = updatedMessages.findIndex(e => e.id === data.id);
        updatedMessages.splice(target, 1);
        this.setState({
            messages: updatedMessages
        });
    }

    handleInputDeleteEmployee = (data) => {
        let updatedEmployees = [...this.state.employees];
        let target = updatedEmployees.findIndex(e => e.id === data.id);
        updatedEmployees.splice(target, 1);
        this.setState({
            employees: updatedEmployees
        });
    }

    handleInputDeleteExpression = (data) => {
        let updatedExpressions = [...this.state.expressions];
        let target = updatedExpressions.findIndex(e => e.id === data.id);
        updatedExpressions.splice(target, 1);
        this.setState({
            expressions: updatedExpressions
        });
    }

    handleInputStatus = (data) => {
        let message = data.message;

        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 250,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });
    }

    handleInputDisconnect = () => {
        this.setState({
            messages: [],
            employees: [],
            expressions: [],
            messageBoxIsConnected: false
        });
    }

    handleOutputSendMessage = (data) => {
        this.socket.emit('sendMessage', data);
    }

    handleOutputAddEmployee = (data) => {
        this.socket.emit('addEmployee', data);
    }

    handleOutputAddExpression = (data) => {
        this.socket.emit('addExpression', data);
    }

    handleOutputUpdateEmployee = (data) => {
        this.socket.emit('updateEmployee', data);
    }

    handleOutputUpdateExpression = (data) => {
        this.socket.emit('updateExpression', data);
    }

    handleOutputDeleteMessage = (data) => {
        this.socket.emit('deleteMessage', data);
    }

    handleOutputDeleteEmployee = (data) => {
        this.socket.emit('deleteEmployee', data);
    }

    handleOutputDeleteExpression = (data) => {
        this.socket.emit('deleteExpression', data);
    }

    playTone = async (name) => {
        let sound = new Audio.Sound();
        try {
            let ringtone = await Sounds.find((e) => {
                if (e.name == name) {
                    return e.path
                }
            })

            await sound.loadAsync(ringtone.path);
            await sound.playAsync();
        } catch (error) {
            Toast.show("Error: Unable to play tone", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 250,
                onShow: () => {
                    // calls on toast\`s appear animation start
                },
                onShown: () => {
                    // calls on toast\`s appear animation end.
                },
                onHide: () => {
                    // calls on toast\`s hide animation start.
                },
                onHidden: () => {
                    // calls on toast\`s hide animation end.
                }
            });
        }
    }

    render() {
        return (
            <MainTabNavigator
                screenProps={{
                    messages: this.state.messages,
                    employees: this.state.employees,
                    expressions: this.state.expressions,
                    messageBoxIP: this.state.messageBoxIP,
                    messageBoxIsConnected: this.state.messageBoxIsConnected,

                    handleSendMessage: this.handleOutputSendMessage,
                    handleAddEmployee: this.handleOutputAddEmployee,
                    handleAddExpression: this.handleOutputAddExpression,
                    handleUpdateEmployee: this.handleOutputUpdateEmployee,
                    handleUpdateExpression: this.handleOutputUpdateExpression,
                    handleDeleteMessage: this.handleOutputDeleteMessage,
                    handleDeleteEmployee: this.handleOutputDeleteEmployee,
                    handleDeleteExpression: this.handleOutputDeleteExpression,

                    handleMessageBoxIPChange: this.handleMessageBoxIPChange,

                    playTone: this.playTone,
                }}
            >
            </MainTabNavigator>
        );
    }
}
