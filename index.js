/**
 * @format
 */
import 'reflect-metadata';
import { AppRegistry } from 'react-native';
import App from './src/navigation';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import './src/locale';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
