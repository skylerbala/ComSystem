import React from 'react';
import { View } from 'react-native';
import { Card, FormLabel, FormInput } from 'react-native-elements';
import Button from '../../common/components/Button'
import { scale } from '../../../../library/utils/ScalingAPI';
import styles from '../styles';
import ExpressionButton from '../../common/components/ExpressionButton';

export default class ModalCards extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expression: props.expression,
            isEditing: props.isEditing
        }
    }

    onSaveExpressionPress = () => {
        let newExpression = {
            id: this.state.expression.id,
            content: this.state.expression.content,
            type: this.state.expression.type
        }
        if (this.state.isEditing) {
            this.props.handleUpdateExpression(newExpression);
        }
        else {
            this.props.handleAddExpression(newExpression);
        }
        this.props.handleResetState();
    }

    onUpdateExpressionContent = (content) => {
        this.setState({
            expression: {
                id: this.state.expression.id,
                type: this.state.expression.type,
                content: content
            }
        });
    }

    render() {
        return (
            <Card title={this.state.modalTitle} containerStyle={styles.modalCard}>
                <FormLabel labelStyle={{ fontSize: scale(16), color: "#43484D" }}>Expression</FormLabel>
                <FormInput onChangeText={this.onUpdateExpressionContent} />
                <View style={{ flex: 1, alignItems: 'center', marginBottom: 50, marginTop: 5 }}>
                    <ExpressionButton
                        expression={this.state.expression}
                        onClick={null}
                    />
                </View>
                <Button title='Save' onPress={this.onSaveExpressionPress} />
            </Card>
        );
    }
}