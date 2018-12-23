import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import moment from 'moment';
import { Audio } from 'expo';
import MainTabNavigator from './MainTabNavigator';
import AsyncStorageAPI from '../../library/utils/AsyncStorageAPI';
import Sounds from '../../assets/sounds';


export default class Main extends Component {
    state = {
        messages: [],
        employees: [],
        expressions: [],
        endpoint: "",
        isConnected: false,
        ring: null
    }

    constructor(props) {
        super(props);

        this.handleSendMessage = this.handleSendMessage.bind(this)
        this.handleAddEmployee = this.handleAddEmployee.bind(this)
        this.handleAddExpression = this.handleAddExpression.bind(this)
        this.handleUpdateEmployee = this.handleUpdateEmployee.bind(this)
        this.handleUpdateExpression = this.handleUpdateExpression.bind(this)
        this.handleDeleteMessage = this.handleDeleteMessage.bind(this)
        this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this)
        this.handleDeleteExpression = this.handleDeleteExpression.bind(this)
        this.handleIPChange = this.handleIPChange.bind(this)
        this.handleRingChange = this.handleRingChange.bind(this)
        this.handleSendMessageSound = this.playSound.bind(this)
    }

    componentDidMount() {
        this.storage = new AsyncStorageAPI;
        this.storage.retrieveItem('endpoint').then((result) => {
            this.setState({ endpoint: result })
            this.setSocketIOClient("http://" + result + ":3000")
        }).catch((err) => {
            console.log(err);
        });

        this.storage.retrieveItem('ring').then((result) => {
            let ring = result
            if (ring == null) {
                ring = Sounds[0].name;
            }
            this.setState({ ring: ring })
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
        this.socket.on('addExpression', (data) => this.handleReceivedExpression(data));
        this.socket.on('updateEmployee', (data) => this.handleReceivedUpdateEmployee(data));
        this.socket.on('updateExpression', (data) => this.handleReceivedUpdateExpression(data));
        this.socket.on('deleteMessage', (data) => this.handleReceivedDeleteMessage(data));
        this.socket.on('deleteEmployee', (data) => this.handleReceivedDeleteEmployee(data));
        this.socket.on('deleteExpression', (data) => this.handleReceivedDeleteExpression(data));
        this.socket.on('disconnect', (data) => this.handleDisconnect(data));
    }

    async playSound() {
        let sound = new Audio.Sound();

        try {
            ring = await Sounds.find((e) => {
                if (e.name == this.state.ring) {
                    return e.path
                }
            })

            // console.log(ring)

            await sound.loadAsync(ring.path);
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
            messages: [...this.state.messages, data]
        })
        this.playSound()
    }

    handleReceivedEmployee(data) {
        this.setState({
            employees: [...this.state.employees, data]
        })
    }

    handleReceivedExpression(data) {
        this.setState({
            expressions: [...this.state.expressions, data]
        })
    }

    handleReceivedUpdateEmployee(data) {
        let newEmployees = this.state.employees;
        updateIndex = newEmployees.findIndex(e => e.id == data.id)
        newEmployees[updateIndex] = data;
        this.setState({
            employees: newEmployees
        });
    }

    handleReceivedUpdateExpression(data) {
        let newExpressions = this.state.expressions;
        updateIndex = newExpressions.findIndex(e => e.id == data.id)
        newExpressions[updateIndex] = data;
        this.setState({
            expressions: newExpressions
        });
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

    handleReceivedDeleteExpression(data) {
        let newExpressions = this.state.expressions;
        deleteIndex = newExpressions.findIndex(e => e.id == data.id)
        newExpressions.splice(deleteIndex, 1)
        this.setState({
            expressions: newExpressions
        });
    }

    handleSendMessage(data) {
        this.socket.emit('addMessage', data);
    }

    handleAddEmployee(data) {
        this.socket.emit('addEmployee', data);
    }

    handleAddExpression(data) {
        this.socket.emit('addExpression', data);
    }

    handleUpdateEmployee(data) {
        this.socket.emit('updateEmployee', data);
    }

    handleUpdateExpression(data) {
        this.socket.emit('updateExpression', data);
    }

    handleDeleteMessage(data) {
        this.socket.emit('deleteMessage', data);
    }

    handleDeleteEmployee(data) {
        this.socket.emit('deleteEmployee', data);
    }

    handleDeleteExpression(data) {
        this.socket.emit('deleteExpression', data);
    }

    async handleIPChange(data) {
        newState = {
            messages: [],
            employees: [],
            expressions: [],
            endpoint: data,
        }
        this.storage.storeItem('endpoint', data)
        this.setState(newState, () => {
            if (this.state.endpoint.length > 1) {
                this.socket.close();
            }
            this.setSocketIOClient("http://" + data + ":3000");
        });
    }

    async handleRingChange(data) {
        this.storage.storeItem('ring', data)
        this.setState({
            ring: data
        })
    }


    handleDisconnect(data) {
        this.setState({
            messages: [],
            employees: [],
            expressions: [],
            isConnected: false
        })
    }

    tick() {
        var newMessages = this.state.messages.map((e) => {
            let dateNow = moment(Date.now())
            let dateCreated = moment(e.createdAt)
            let duration = moment.duration(dateNow - dateCreated)._data;
            let timeElapsed = moment(duration).format('mm:ss')
            if (timeElapsed === "Invalid date") {
                timeElapsed = "00:00";
            }
            if (duration.minutes % 2 === 0 && duration.seconds === 0) {
                // this.playSound();
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
                        expressions: this.state.expressions,
                        endpoint: this.state.endpoint,
                        isConnected: this.state.isConnected,
                        ring: this.state.ring,

                        handleSendMessage: this.handleSendMessage,
                        handleAddEmployee: this.handleAddEmployee,
                        handleAddExpression: this.handleAddExpression,
                        handleUpdateEmployee: this.handleUpdateEmployee,
                        handleUpdateExpression: this.handleUpdateExpression,
                        handleDeleteMessage: this.handleDeleteMessage,
                        handleDeleteEmployee: this.handleDeleteEmployee,
                        handleDeleteExpression: this.handleDeleteExpression,

                        handleIPChange: this.handleIPChange,
                        handleRingChange: this.handleRingChange,

                        handleSendMessageSound: this.playSound,
                    }
                }
            >
            </MainTabNavigator>
        );
    }
}
