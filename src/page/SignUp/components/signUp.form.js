import {Form, Input, Item, Label} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class SignUpForm extends Component {
  render() {
    return (
      <View>
        <Form>
          <Item floatingLabel>
            <Label style={styles.input}>Tên</Label>
            <Input placeholder="Tên" style={styles.input} />
          </Item>
          <Item floatingLabel>
            <Label style={styles.input}>Username</Label>
            <Input placeholder="Username" style={styles.input} />
          </Item>
          <Item floatingLabel last>
            <Label style={styles.input}>Mật khẩu</Label>
            <Input
              secureTextEntry={true}
              placeholder="Mật khẩu"
              style={styles.input}
            />
          </Item>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: 'black',
  },
});
