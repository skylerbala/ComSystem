import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import moment from 'moment';
import { Audio } from 'expo';
import MainTabNavigator from './MainTabNavigator';
import DialogInput from 'react-native-dialog-input';
import { AsyncStorage } from 'react-native';

class Main extends Component {

    state = {
        messages: [],
        employees: [],
        statements: [],
        endpoint: "",
    }

    constructor(props) {
        super(props);
    }

    async storeItem(key, item) {
        try {
            const storedItem = await AsyncStorage.setItem(key, item);
            return storedItem;
        } catch (error) {
            console.log(error.message);
        }
        return;
    }

    async retrieveItem(key) {
        try {
            const retrievedItem = await AsyncStorage.getItem(key);
            return retrievedItem;
        } catch (error) {
            console.log(error.message);
        }
        return 'none'
    }

    componentDidMount() {
        this.retrieveItem('endpoint').then((result) => {
            this.setState({ endpoint: result })
            this.setSocketIOClient(result)
        }).catch((err) => {
            console.log(err);
        });
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentDidMount() {
        this.retrieveItem('endpoint').then((result) => {
            this.setState({ endpoint: result })
            this.setSocketIOClient(result)
        }).catch((err) => {
            console.log(err);
        });
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        this.socket.close();
    }

    setSocketIOClient(endpoint) {
        this.socket = SocketIOClient(endpoint);
        this.socket.on('addMessages', (data) => this.handleReceivedMessages(data));
        this.socket.on('addEmployees', (data) => this.handleReceivedEmployees(data));
        this.socket.on('addStatements', (data) => this.handleReceivedStatements(data));
        this.socket.on('deleteMessage', (data) => this.handleReceivedDeleteMessage(data));
        this.socket.on('deleteEmployee', (data) => this.handleReceivedDeleteEmployee(data));
        this.socket.on('deleteStatement', (data) => this.handleReceivedDeleteStatement(data));
    }

    async playSound() {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(require('./sound.wav'));
            await soundObject.playAsync();
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    }

    handleReceivedMessages(data) {
        this.setState({
            messages: data.concat(this.state.messages)
        })
        if (data.length === 1) {
            this.playSound()
        }
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

    handleSendMessage(data) {
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

    async handleIPChange(data) {
        newState = {
            messages: [],
            employees: [],
            statements: [],
            endpoint: data,
        }
        this.storeItem('endpoint', data)
        this.setState(newState);
        this.socket.close();
        this.setSocketIOClient(data);
    }

    tick() {
        var newMessages = this.state.messages.map((e) => {
            let timeElapsed = moment(moment(Date.now()).diff(e.date_created)).format('mm:ss');
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
