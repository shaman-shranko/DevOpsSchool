/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {LogBox} from "react-native";

LogBox.ignoreLogs([
"exported from 'deprecated-react-native-prop-types'.",
])

AppRegistry.registerComponent(appName, () => App);
