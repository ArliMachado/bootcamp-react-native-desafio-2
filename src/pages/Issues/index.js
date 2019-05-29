import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, FlatList, ActivityIndicator, TouchableOpacity,
} from 'react-native';

import Header from '~/components/Header';
import styles from './styles';
import api from '~/services/api';
import Listitem from '~/components/ListItem';

export default class Issues extends Component {
  state = {
    data: [],
    refreshing: true,
    loading: true,
    tabs: [
      { id: 1, name: 'Todas', isActive: false },
      {
        id: 2,
        name: 'Abertas',
        status: 'open',
        isActive: false,
      },
      {
        id: 3,
        name: 'Fechadas',
        status: 'closed',
        isActive: false,
      },
    ],
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

  selectTab = (tab) => {
    const { tabs } = this.state;
    const newTab = [...tabs];
    newTab.forEach(t => (t.id === tab.id ? (t.isActive = true) : (t.isActive = false)));
    this.setState({ tabs: newTab });
  };

  render() {
    const { loading, tabs } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Issues" navigateTo={this.goToRepositories} />
        <View style={styles.tabContent}>
          {tabs.map(tab => (
            <TouchableOpacity key={tab.id} onPress={() => this.selectTab(tab)}>
              <Text style={styles.tabSelected(tab.isActive)}>{tab.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          {loading ? <ActivityIndicator size={24} style={styles.loading} /> : this.renderList()}
        </View>
      </View>
    );
  }
}
