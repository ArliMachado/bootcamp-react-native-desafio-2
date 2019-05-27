import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: metrics.basePadding,
    marginHorizontal: metrics.baseMargin * 2,
    marginTop: metrics.baseMargin * 2,
  },
  imageContainer: {
    marginRight: metrics.baseMargin * 2,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  repositoryInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  repositoryName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.darker,
  },
  OrganizationName: {
    fontSize: 14,
    color: colors.regular,
    marginTop: metrics.baseMargin,
  },
  navigate: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigateIcon: {
    color: colors.regular,
  },
});

export default styles;
