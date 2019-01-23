import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';
import { Card } from 'react-native-elements';
import MessageFront from './MessageFront';
import Button from '../../common/components/Button';
import ExpressionButton from '../../common/components/ExpressionButton';
import styles from '../styles'

export default class ModalCard extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        content: [],
    }

    onExpressionPress = (expression) => {
        this.setState({
            content: [...this.state.content, expression.content],
        });
    }

    renderExpressionButton = (rowData) => {
        return (
            <ExpressionButton
                expression={rowData.item}
                onClick={this.onExpressionPress}
            />
        );
    }

    getFinalContent = () => {
        let newContent = this.state.content
        if (newContent != []) {
            newContent = newContent.join(' ');
        }
        return newContent;
    }

    onClearPress = () => {
        this.setState({
            content: [],

        });
    }

    getFinalMessage = (message) => {
        let newMessage = Object.assign({}, message);
        if (newMessage.content != []) {
            newMessage.content = newMessage.content.join(' ');
        }
        return newMessage;
    }

    onSendMessagePress = () => {
        newMessage = {
            name: this.props.name,
            content: this.state.content,
            color: this.props.color,
            ringtone: this.props.ringtone
        }
        let newMessage = this.getFinalMessage(newMessage);
        this.props.handleSendMessage(newMessage);
        this.props.handleResetState();
    }

    render() {
        return (
            <Card title={"Send Message"} containerStyle={styles.modalCard}>
                <Text style={styles.expressionCategoryText}>Expressions 1</Text>
                <View style={styles.expressionsView}>
                    <FlatList
                        contentContainerStyle={styles.listContainer}
                        data={this.props.expressionsType1}
                        renderItem={this.renderExpressionButton}
                        keyExtractor={(rowData) => rowData.id.toString()}
                        numColumns={3}
                    />
                </View>
                <Text style={styles.expressionCategoryText}>Expressions 2</Text>
                <View style={styles.expressionsView}>
                    <FlatList
                        contentContainerStyle={styles.listContainer}
                        data={this.props.expressionsType2}
                        renderItem={this.renderExpressionButton}
                        keyExtractor={(rowData) => rowData.id.toString()}
                        numColumns={3}
                    />
                </View>
                <MessageFront
                    color={this.props.color}
                    name={this.props.name}
                    content={this.getFinalContent()}
                    playRingtone={this.props.playRingtone}
                    isPreview
                />
                <View style={{ flexDirection: 'row' }}>
                    <Button containerStyle={{ flex: 1, marginRight: 5, backgroundColor: '#FF2E29' }} onPress={this.onClearPress} title={"Clear"} />
                    <Button containerStyle={{ flex: 1, marginLeft: 5 }} onPress={this.onSendMessagePress} title={"Send"} />
                </View>
            </Card>
        );
    }
}