import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Home';
import Do from './src/Do';

const Drawer = createDrawerNavigator();

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar backgroundColor="#0163d2" barStyle="light-content" />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0163d2',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Todo Page" component={Do} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
