import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },
  tabContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: metrics.basePadding / 2,
    marginHorizontal: metrics.baseMargin * 2,
    marginTop: metrics.baseMargin,
    backgroundColor: colors.light,
  },
  tabSelected(isSelected) {
    return isSelected ? { fontWeight: 'bold' } : { fontWeight: 'normal' };
  },
});

export default styles;
