import React, { Component } from 'react';

import { View } from 'react-native';

import Header from '~/components/Header';
import styles from './styles';

export default class Issues extends Component {
  state = {
    data: [],
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Issues" />
      </View>
    );
  }
}
