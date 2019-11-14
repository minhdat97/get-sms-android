import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  view2Style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  view1Style: {
    borderColor: '#bbb',
    borderWidth: 1,
  },
  view1Container: {
    flex: 2,
    alignItems: 'flex-start',
  },
  view2Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
