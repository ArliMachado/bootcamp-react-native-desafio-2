import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, StatusBar, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const goTo = navigateTo => (
  <TouchableOpacity onPress={navigateTo}>
    <Icon name="angle-left" size={26} style={styles.navigateIcon} />
  </TouchableOpacity>
);

const Header = ({ title, navigateTo }) => (
  <View style={styles.container}>
    <StatusBar barStyle="dark-content" />
    {title === 'Issues' ? goTo(navigateTo) : <View />}
    <Text style={styles.title}>{title}</Text>
    <View />
  </View>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired,
};

export default Header;
