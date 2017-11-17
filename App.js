import React from 'react';
import Expo from "expo";
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Trainings from './Components/Trainings';
import SideBar from './Components/SideBar';
import Live from './Components/Live';
import { DrawerNavigator } from "react-navigation";

const Drawer = DrawerNavigator({
  Home:{
    screen: Home,
  },
  Profile:{
    screen: Profile,
  },
  Live:{
    screen: Live,

  },
  Trainings:{
    screen: Trainings,
  }
})

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }



  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Drawer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
