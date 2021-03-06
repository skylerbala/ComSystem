import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scale } from '../../../../library/utils/ScalingAPI';
import moment from 'moment';

export default class MessageFront extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timeElapsed = "00:00";
  }

  componentDidMount() {
    if (this.props.hasTimer) {
      this.timer = setInterval(() => this.timerTick(), 1000);
    }
  }

  timerTick = () => {
    let dateNow = moment(Date.now());
    let dateCreated = moment(this.props.createdAt)
    let duration = moment.duration(dateNow - dateCreated)._data;
    let timeElapsed = moment(duration).format('mm:ss')
    if (timeElapsed === "Invalid date") {
      timeElapsed = "00:00";
    }
    if (duration.minutes % 3 === 0 && duration.seconds === 0 && duration.minutes > 1) {
      this.props.playTone(this.props.ringtone);
    }

    if (global.currTab === "MainPanel") {
      this.timeElapsed = timeElapsed;
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let previewText;
    if (this.props.isPreview) {
      previewText = {
        fontSize: scale(42.5),
        color: 'white',
      }
    }
    else {
      previewText = {
        fontSize: scale(50),
        color: 'white',
      }
    }
    return (
      <View style={[styles.messageRowFront, { backgroundColor: this.props.color }]}>
        <View style={styles.messageRowFrontContent}>
          <Text style={previewText}>
            {this.props.name}: {this.props.content}
          </Text>
        </View>
        <View style={styles.messageRowFrontTimer}>
          <Text style={styles.messageRowFrontTimerText}>
            {this.timeElapsed}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageRowFront: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: scale(30),
    borderRadius: 5,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  messageRowFrontContent: {
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  messageRowFrontContentText: {
    fontSize: scale(50),
    color: 'white',
  },
  messageRowFrontTimer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  messageRowFrontTimerText: {
    fontSize: scale(15),
    color: 'white'
  },
});