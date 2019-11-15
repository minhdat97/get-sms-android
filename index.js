/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SmsAndroid from 'react-native-get-sms-android';

const Message = async data => {
  console.log('Receiving Message!');
  console.log('DATA:', data);
  if (data.action === 'new_message') {
    var filter = {
      box: 'inbox',
      maxCount: 30,
      address: '+16505556789',
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        var arr = JSON.parse(smsList);
        console.log('fetch data', arr);
        //   this.setState({smsList: arr});
        //   this.intervalID = setTimeout(this.listSMS.bind(this), 0);
      },
    );
  }
};

AppRegistry.registerHeadlessTask('GetMessage', () => Message);
AppRegistry.registerComponent(appName, () => App);
