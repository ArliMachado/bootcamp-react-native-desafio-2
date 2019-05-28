import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const ListItem = ({ data, navigateTo }) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image style={styles.avatar} source={{ uri: data.avatar_url }} />
    </View>

    <View style={styles.repositoryInfo}>
      <Text style={styles.repositoryName}>{data.title}</Text>
      <Text style={styles.OrganizationName}>{data.subTitle}</Text>
    </View>

    <View style={styles.navigate}>
      <TouchableOpacity onPress={navigateTo}>
        <Icon name="angle-right" size={24} style={styles.navigateIcon} />
      </TouchableOpacity>
    </View>
  </View>
);

ListItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    full_name: PropTypes.string,
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    organization: PropTypes.string,
  }).isRequired,
  navigateTo: PropTypes.func.isRequired,
};

export default ListItem;
