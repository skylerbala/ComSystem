import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import moment from 'moment';
import { Audio } from 'expo';
import MainTabNavigator from './MainTabNavigator';
import AsyncStorageAPI from '../../library/utils/AsyncStorageAPI';

class Main extends Component {


    constructor(props) {
        super(props);
        const initialState = {
            messages: [],
            employees: [],
            statements: [],
            endpoint: "",
            connected: false
        }
        this.state = initialState
    }

    componentDidMount() {
        this.storage = new AsyncStorageAPI;
        this.storage.retrieveItem('endpoint').then((result) => {
            this.setState({ endpoint: result })
            this.setSocketIOClient("http://" + result + ":3000")
        }).catch((err) => {
            console.log(err);
        });
        this.timer = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        this.socket.close();
        clearInterval(this.timer)
    }

    setSocketIOClient(endpoint) {
        this.socket = SocketIOClient(endpoint);
        this.socket.on('initializeState', (data) => this.initializeState(data));
        this.socket.on('addMessage', (data) => this.handleReceivedMessage(data));
        this.socket.on('addEmployee', (data) => this.handleReceivedEmployee(data));
        this.socket.on('addStatement', (data) => this.handleReceivedStatement(data));
        this.socket.on('deleteMessage', (data) => this.handleReceivedDeleteMessage(data));
        this.socket.on('deleteEmployee', (data) => this.handleReceivedDeleteEmployee(data));
        this.socket.on('deleteStatement', (data) => this.handleReceivedDeleteStatement(data));
        this.socket.on('disconnect', (data) => this.handleDisconnect(data));
    }

    async playSound() {
        const sound = new Audio.Sound();
        try {
            await sound.loadAsync(require('../../assets/sounds/front-desk-bell.wav'));
            await sound.playAsync();
        } catch (err) {
            console.log(err);
        }
    }

    initializeState(data) {
        this.setState(data);
    }

    handleReceivedMessage(data) {
        this.setState({
            messages: [data, ...this.state.messages]
        })
        this.playSound()
    }

    handleReceivedEmployee(data) {
        this.setState({
            employees: [data, ...this.state.employees]
        })
    }

    handleReceivedStatement(data) {
        this.setState({
            statements: [data, ...this.state.statements]
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

    handleSendMessage(data) {
        this.socket.emit('addMessage', data);
    }

    handleAddEmployee(data) {
        this.socket.emit('addEmployee', data);
    }

    handleAddStatement(data) {
        this.socket.emit('addStatement', data);
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

    async handleIPChange(data) {
        newState = {
            messages: [],
            employees: [],
            statements: [],
            endpoint: data,
        }
        this.storage.storeItem('endpoint', data)
        this.setState(newState, () => {
            if (this.state.endpoint.length > 1) {
                console.log('sdf', this.state.endpoint)
                this.socket.close();
            }
            this.setSocketIOClient("http://" + data + ":3000");
        });

    }

    handleDisconnect(data) {
        connected = data.connected
        this.setState({
            messages: [],
            employees: [],
            statements: [],
            connected: false
        })
    }

    tick() {
        var newMessages = this.state.messages.map((e) => {
            let dateNow = moment(Date.now())
            let dateCreated = moment(e.createdAt)
            let duration = moment.duration(dateNow - dateCreated)._data;
            let timeElapsed = moment(duration).format('HH:mm:ss')
            if (timeElapsed === "Invalid date") {
                timeElapsed = "00:00:00";
            }
            e.timeElapsed = timeElapsed;
            return e
        });
        this.setState({
            messages: newMessages
        });

    }

    render() {
        return (
            <MainTabNavigator
                screenProps={
                    {
                        messages: this.state.messages,
                        employees: this.state.employees,
                        statements: this.state.statements,
                        endpoint: this.state.endpoint,
                        connected: this.state.connected,

                        handleSendMessage: (data) => this.handleSendMessage(data),
                        handleAddEmployee: (data) => this.handleAddEmployee(data),
                        handleAddStatement: (data) => this.handleAddStatement(data),
                        handleDeleteMessage: (data) => this.handleDeleteMessage(data),
                        handleDeleteEmployee: (data) => this.handleDeleteEmployee(data),
                        handleDeleteStatement: (data) => this.handleDeleteStatement(data),

                        handleIPChange: (data) => this.handleIPChange(data),

                        handleSendMessageSound: () => this.playSound()
                    }
                }
            >
            </MainTabNavigator>
        );
    }
}

export default Main;
