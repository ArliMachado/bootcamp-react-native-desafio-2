import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },
  formContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: metrics.basePadding,
    marginTop: metrics.baseMargin,
  },
  form: {
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: metrics.baseMargin,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 44,

    // paddingHorizontal: metrics.basePadding,
  },
  infoIcon: {
    color: colors.dark,
    marginLeft: metrics.baseMargin,
  },

  lineStyle: {
    marginTop: metrics.baseMargin * 2,
    borderWidth: 0.5,
    borderColor: colors.light,
  },
});

export default styles;
