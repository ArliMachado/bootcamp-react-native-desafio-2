import React, { Component } from 'react';

import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '~/components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import api from '~/services/api';
import RepositoryItem from './RepositoryItem';

const REPOSITORIES_STORAGE = '@GoNativeDesafio2:repositories';
export default class Repositories extends Component {
  state = {
    repositories: [],
    repositoryInput: '',
    loading: false,
    error: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const data = await AsyncStorage.getItem(REPOSITORIES_STORAGE);

    if (data) {
      this.setState({ repositories: JSON.parse(data), loading: false });
    }
    this.setState({ loading: false, error: false });
  }

  getRepository = async () => {
    const { repositories, repositoryInput, error } = this.state;

    try {
      this.setState({ loading: true });

      const { data } = await api.get(`/repos/${repositoryInput}`);
      const repo = {
        id: data.id,
        name: data.name,
        organization: data.organization.login,
        avatar_url: data.owner.avatar_url,
      };

      this.setState({
        repositories: [...repositories, repo],
        loading: false,
        repositoryInput: '',
        error: false,
      });

      const repoJson = JSON.stringify(this.state.repositories);

      await AsyncStorage.setItem(REPOSITORIES_STORAGE, repoJson);
    } catch (err) {
      console.tron.log(err);
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
