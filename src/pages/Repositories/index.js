import React, { Component } from 'react';

import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '~/components/Header';
import styles from './styles';
import api from '~/services/api';
import RepositoryItem from './RepositoryItem';

export default class Repositories extends Component {
  state = {
    repositories: [],
    repositoryInput: '',
    loading: false,
    error: false,
  };

  getRepository = async () => {
    const { repositories, repositoryInput, error } = this.state;

    try {
      this.setState({ loading: true });

      const { data } = await api.get(`/repos/${repositoryInput}`);

      this.setState({
        repositories: [...repositories, data],
        loading: false,
        repositoryInput: '',
        error: false,
      });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  renderList = () => {
    const { repositories } = this.state;
    return (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
      />
    );
  };

  addRepository = () => (
    <TouchableOpacity onPress={this.getRepository}>
      <Icon name="plus" size={24} style={styles.infoIcon} />
    </TouchableOpacity>
  );

  render() {
    const { repositoryInput, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Repositórios" />
        {error && <Text style={styles.error}>Repositório inexistente</Text>}
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Adicionar novo repositório"
              underlineColorAndroid="transparent"
              value={repositoryInput}
              onChangeText={text => this.setState({ repositoryInput: text })}
            />
            {loading ? (
              <ActivityIndicator size={24} style={styles.loading} />
            ) : (
              this.addRepository()
            )}
          </View>
          <View style={styles.lineStyle} />
        </View>
        {this.renderList()}
        <View />
      </View>
    );
  }
}
