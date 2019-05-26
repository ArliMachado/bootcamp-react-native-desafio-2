import './config/DevToolsConfig';
import './config/ReactotronConfig';
import React from 'react';
import createNavigator from '~/routes';

const Routes = createNavigator();
const App = () => <Routes />;

export default App;
