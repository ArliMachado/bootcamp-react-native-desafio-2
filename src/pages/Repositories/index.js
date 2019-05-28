import React, { Component } from 'react';

import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '~/components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import api from '~/services/api';
import ListItem from '~/components/ListItem';

const REPOSITORIES_STORAGE = '@GoNativeDesafio2:repositories';
export default class Repositories extends Component {
  state = {
    repositories: [],
    repositoryInput: '',
    loading: false,
    refreshing: false,
    error: false,
  };

  componentDidMount = async () => {
    this.loadRepositories();
  };

  loadRepositories = async () => {
    this.setState({ refreshing: true });
    const data = await AsyncStorage.getItem(REPOSITORIES_STORAGE);

    if (data) {
      this.setState({ repositories: JSON.parse(data), loading: false, refreshing: false });
    }
    this.setState({ loading: false, refreshing: false, error: false });
  };

  getRepository = async () => {
    const { repositories, repositoryInput } = this.state;

    try {
      this.setState({ loading: true });

      const { data } = await api.get(`/repos/${repositoryInput}`);
      const repo = {
        id: data.id,
        full_name: data.full_name,
        title: data.name,
        subTitle: data.organization.login,
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

  goToIssues = async (item) => {
    const { navigation } = this.props;
    navigation.navigate('Issues', {
      fullName: item.full_name,
    });
  };

  renderListItem = ({ item }) => <ListItem data={item} navigateTo={() => this.goToIssues(item)} />;

  renderList = () => {
    const { repositories, refreshing } = this.state;
    return (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
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
        <Header title="Repositórios" navigateTo={() => {}} />
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
      </View>
    );
  }
}
