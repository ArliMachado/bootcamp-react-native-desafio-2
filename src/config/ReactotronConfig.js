import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '10.168.69.163' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
