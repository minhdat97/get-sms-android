import React, {Component} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import {View, Text, ScrollView} from 'react-native';
import styles from './getMessage.style';
import GetMessage from './getMessage';
import SmsAndroid from 'react-native-get-sms-android';

class GetMessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smsList: [],
    };
  }

  intervalID;

  async componentDidMount() {
    if (Platform.OS === 'android') {
      try {
        if (!(await this.checkPermissions())) {
          await this.requestPermissions();
        }

        if (await this.checkPermissions()) {
          this.listSMS();
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component
    */
    clearTimeout(this.intervalID);
  }

  async checkPermissions() {
    console.log('checking SMS permissions');
    let hasPermissions = false;
    try {
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      );
      if (!hasPermissions) {
        return false;
      }
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
      );
      if (!hasPermissions) {
        return false;
      }
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      );
      if (!hasPermissions) {
        return false;
      }
    } catch (e) {
      console.error(e);
    }
    return hasPermissions;
  }

  async requestPermissions() {
    let granted = {};
    try {
      console.log('requesting SMS permissions');
      granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        ],
        {
          title: 'Example App SMS Features',
          message: 'Example SMS App needs access to demonstrate SMS features',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use SMS features');
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  listSMS = () => {
    const {minDate, maxDate} = this.state;
    var filter = {
      box: 'inbox',
      maxCount: 30,
      address: '+16505556789',
    };
    if (minDate !== '') {
      filter.minDate = minDate;
    }
    if (maxDate !== '') {
      filter.maxDate = maxDate;
    }

    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        var arr = JSON.parse(smsList);
        console.log(arr);
        this.setState({smsList: arr});
        this.intervalID = setTimeout(this.listSMS.bind(this), 0);
      },
    );
  };

  render() {
    const {smsList} = this.state;
    return (
      <View style={styles.view1Container}>
        <View style={styles.view2Container}>
          <Text style={styles.welcome}>Tin nhắn</Text>
          {/* <Button title="refresh list" onPress={this.listSMS} /> */}
        </View>
        <ScrollView>
          <GetMessage smsList={smsList} />
        </ScrollView>
      </View>
    );
  }
}

export default GetMessageContainer;
