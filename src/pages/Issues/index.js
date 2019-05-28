import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, FlatList, ActivityIndicator } from 'react-native';

import Header from '~/components/Header';
import styles from './styles';
import api from '~/services/api';
import Listitem from '~/components/ListItem';

export default class Issues extends Component {
  state = {
    data: [],
    refreshing: true,
    loading: true,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  componentWillMount() {
    this.loadIssues();
  }

  loadIssues = async (filter = '') => {
    const { navigation } = this.props;
    const fullName = navigation.getParam('fullName');

    const { data } = await api.get(`/repos/${fullName}/issues${filter}`);

    const issues = data.map(issue => ({
      id: issue.id,
      title: issue.title,
      subTitle: issue.user.login,
      avatar_url: issue.user.avatar_url,
    }));

    this.setState({ data: issues, refreshing: false, loading: false });
  };

  renderListItem = ({ item }) => <Listitem data={item} navigateTo={() => {}} />;

  goToRepositories = async () => {
    const { navigation } = this.props;
    navigation.navigate('Repositories');
  };

  renderList = () => {
    const { data, refreshing } = this.state;
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadIssues}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Issues" navigateTo={this.goToRepositories} />
        <View>
          {loading ? <ActivityIndicator size={24} style={styles.loading} /> : this.renderList()}
        </View>
      </View>
    );
  }
}
