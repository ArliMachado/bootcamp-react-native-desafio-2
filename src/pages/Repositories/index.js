import React, { Component } from 'react';

import { View } from 'react-native';

import Header from '~/components/Header';
import styles from './styles';

export default class Repositories extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title="Repositórios" />
      </View>
    );
  }
}
