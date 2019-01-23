import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { scale } from '../../../../library/utils/ScalingAPI';
import { Card } from 'react-native-elements';
import Button from '../../common/components/Button';
import EmployeeButton from '../../common/components/EmployeeButton';
import ExpressionButton from '../../common/components/ExpressionButton';
import styles from '../styles'
import RNPickerSelect from 'react-native-picker-select';
import { HueSlider, SaturationSlider, LightnessSlider } from 'react-native-color';
import tinycolor from 'tinycolor2';
import Sounds from '../../../../assets/sounds';

export default class ModalCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            employee: props.employee
        }
    }

    onRingtoneChange = (ringtone) => {
		this.setState({
			employee: {
				ringtone: ringtone
			}
		});
		this.props.playRingtone(ringtone);
	}

    render() {
        return (
            <Card title={this.props.modalTitle} containerStyle={styles.modalCard}>
                <FormLabel labelStyle={{ fontSize: scale(14) }}>Employee Name</FormLabel>
                <FormInput onChangeText={this.onUpdateEmployeeName} />
                <FormLabel labelStyle={{ fontSize: scale(14) }}>Message Ringtone</FormLabel>
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
                            fontSize: scale(14),
                        }}
                        style={{
                            fontColor: "#bdc6cf",
                            fontSize: scale(14),
                        }}
                        placeholderTextColor={"#bdc6cf"}
                        items={Sounds}
                        onValueChange={(value) => this.onRingtoneChange(value)}
                        value={this.state.employee.ringtone}
                        hideIcon
                        useNativeAndroidPickerStyle={false}
                    />
                </View>
                <FormLabel labelStyle={{ fontSize: scale(14) }}>Color</FormLabel>
                <FormLabel labelStyle={{ fontSize: scale(12), color: "#43484D" }}>Hue</FormLabel>
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
                <View style={{ flex: 1, alignItems: 'center', marginBottom: 50 }}>
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