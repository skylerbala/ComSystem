import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { scale } from '../../../../library/utils/ScalingAPI';
import { Card } from 'react-native-elements';
import Button from '../../common/components/Button';
import EmployeeButton from '../../common/components/EmployeeButton';
import styles from '../styles'
import RNPickerSelect from 'react-native-picker-select';
import { HueSlider, SaturationSlider, LightnessSlider } from 'react-native-color';
import tinycolor from 'tinycolor2';
import Sounds from '../../../../assets/sounds';

export default class ModalCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            employee: props.employee,
            isEditing: props.isEditing
        }
    }

    onSaveEmployeePress = () => {
        let newEmployee = {
            id: this.state.employee.id,
            name: this.state.employee.name,
            color: tinycolor(this.state.employee.color).toHexString(),
            ringtone: this.state.employee.ringtone
        }
        if (this.state.isEditing) {
            this.props.handleUpdateEmployee(newEmployee);
        }
        else {
            this.props.handleAddEmployee(newEmployee);
        }
        this.props.handleResetState();
    }

    onEmployeeNameChange = (name) => {
        this.setState({
            employee: {
                id: this.state.employee.id,
                name: name,
                color: this.state.employee.color,
                ringtone: this.state.employee.ringtone
            }
        });
    }

    onRingtoneChange = (ringtone) => {
        this.setState({
            employee: {
                id: this.state.employee.id,
                name: this.state.employee.name,
                color: this.state.employee.color,
                ringtone: ringtone
            }
        });
        this.props.playTone(ringtone);
    }

    onUpdateHue = (h) => {
        this.setState({
            employee: {
                id: this.state.employee.id,
                name: this.state.employee.name,
                color: { ...this.state.employee.color, h },
                ringtone: this.state.employee.ringtone
            }
        });
    }

    onUpdateSaturation = (s) => {
        this.setState({
            employee: {
                id: this.state.employee.id,
                name: this.state.employee.name,
                color: { ...this.state.employee.color, s },
                ringtone: this.state.employee.ringtone
            }
        });
    }

    onUpdateLightness = (l) => {
        this.setState({
            employee: {
                id: this.state.employee.id,
                name: this.state.employee.name,
                color: { ...this.state.employee.color, l },
                ringtone: this.state.employee.ringtone
            }
        });
    }

    render() {
        return (
            <Card title={this.props.modalTitle} containerStyle={styles.modalCard}>
                <FormLabel labelStyle={{ fontSize: scale(16), color: "#43484D" }}>Employee Name</FormLabel>
                <FormInput onChangeText={this.onEmployeeNameChange} />
                <FormLabel labelStyle={{ fontSize: scale(16), color: "#43484D" }}>Message Ringtone</FormLabel>
                <View
                    style={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 15,
                        marginBottom: 5,
                    }}
                >
                    <RNPickerSelect
                        placeholder={{
                            label: 'Select a ringtone...',
                            value: null,
                            color: '#bdc6cf',
                            fontSize: scale(16),
                        }}
                        style={{
                            fontColor: "#bdc6cf",
                            fontSize: scale(16),
                        }}
                        placeholderTextColor={"#bdc6cf"}
                        items={Sounds}
                        onValueChange={(value) => this.onRingtoneChange(value)}
                        value={this.state.employee.ringtone}
                        hideIcon
                        useNativeAndroidPickerStyle={false}
                    />
                </View>
                <FormLabel labelStyle={{ fontSize: scale(16), color: "#43484D" }}>Color</FormLabel>
                <FormLabel labelStyle={{ fontSize: scale(12), color: "#43484D" }}>Hue</FormLabel>
                <View
                    style={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 5,
                    }}
                >
                    <HueSlider
                        gradientSteps={100}
                        value={this.state.employee.color.h}
                        color={this.state.employee.color}
                        onValueChange={this.onUpdateHue}
                    />
                    <FormLabel labelStyle={{ fontSize: scale(12), color: "#43484D" }}>Saturation</FormLabel>
                    <SaturationSlider
                        gradientSteps={100}
                        value={this.state.employee.color.s}
                        color={this.state.employee.color}
                        onValueChange={this.onUpdateSaturation}
                    />
                    <FormLabel labelStyle={{ fontSize: scale(12), color: "#43484D" }}>Lightness</FormLabel>
                    <LightnessSlider
                        gradientSteps={100}
                        value={this.state.employee.color.l}
                        color={this.state.employee.color}
                        onValueChange={this.onUpdateLightness}
                    />
                </View>

                <View style={{ flex: 1, alignItems: 'center', marginBottom: 60 }}>
                    <EmployeeButton
                        name={this.state.employee.name}
                        color={tinycolor(this.state.employee.color).toHexString()}
                        onClick={null}
                    />
                </View>
                <Button title='Save' onPress={this.onSaveEmployeePress} />
            </Card>
        );
    }
}