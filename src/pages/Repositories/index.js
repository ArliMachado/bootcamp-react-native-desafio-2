import React, { Component } from 'react';

import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '~/components/Header';
import styles from './styles';

export default class Repositories extends Component {
  state = {
    data: [],
    repository: '',
  };

  render() {
    const { repository } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Repositórios" />

        <View style={styles.formContainer}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Adicionar novo repositório"
              underlineColorAndroid="transparent"
              value={repository}
              onChangeText={text => this.setState({ repository: text })}
            />
            <TouchableOpacity onPress={() => {}}>
              <Icon name="plus" size={24} style={styles.infoIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.lineStyle} />
        </View>
      </View>
    );
  }
}
