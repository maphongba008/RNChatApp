/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/navigation';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import './src/locale';

AppRegistry.registerComponent(appName, () => App);
