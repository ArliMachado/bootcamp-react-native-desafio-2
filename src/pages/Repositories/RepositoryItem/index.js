import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const RepositoryItem = ({ repository }) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image style={styles.avatar} source={{ uri: repository.avatar_url }} />
    </View>

    <View style={styles.repositoryInfo}>
      <Text style={styles.repositoryName}>{repository.name}</Text>
      <Text style={styles.OrganizationName}>{repository.organization}</Text>
    </View>

    <View style={styles.navigate}>
      <Icon name="angle-right" size={24} style={styles.navigateIcon} />
    </View>
  </View>
);

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default RepositoryItem;
