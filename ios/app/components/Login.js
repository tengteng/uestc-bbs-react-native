import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TextInput,
  AlertIOS,
  AsyncStorage,
  Navigator
} from 'react-native';
import Button from 'react-native-button';
import { userLogin } from '../actions/authorizeAction';

var styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF'
  },
  formItem: {
    height: 40,
    borderRadius: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  formSubmit: {
    color: '#fff',
    backgroundColor: '#93adc6',
    paddingTop: 8,
  },
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this._userNameValue = '';
    this._passwordValue = '';
  }

  _onSubmit() {
    if (this._userNameValue === '') {
      AlertIOS.alert('提示', '请输入用户名');
      return;
    }

    if (this._passwordValue === '') {
      AlertIOS.alert('提示', '请输入密码');
      return;
    }

    this.props.dispatch(userLogin(this._userNameValue, this._passwordValue));
  }

  render() {
    this.router = this.props.router;
    let { isFetching, authrization, hasError } = this.props.entities.user;

    if (hasError) { AlertIOS.alert('提示', authrization.errcode); }

    if (authrization.token) {
      authrization = JSON.stringify(authrization);
      AsyncStorage.setItem('authrization', authrization)
        .then(this.router.popToHome());
      return <View></View>;
    }

    return (
      <View style={styles.form}>
        <TextInput
          ref={component => this._userName = component}
          style={[styles.formItem, styles.formInput]}
          onChangeText={(text) => {
            this._userName.setNativeProps({ text: text });
            this._userNameValue = text;
          }}
          placeholder='请输入用户名'
          autoFocus={true}
          editable={!isFetching} />
        <TextInput
          ref={component => this._password = component}
          style={[styles.formItem, styles.formInput]}
          onChangeText={(text) => {
            this._password.setNativeProps({ text: text });
            this._passwordValue = text;
          }}
          placeholder='请输入密码'
          secureTextEntry={true}
          editable={!isFetching} />
        <Button
          style={[styles.formItem, styles.formSubmit]}
          onPress={this._onSubmit.bind(this)} >
          登录
        </Button>
      </View>
    );
  }
}