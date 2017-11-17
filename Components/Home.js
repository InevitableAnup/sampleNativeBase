import React from "react";
import Expo from "expo";
import { StyleSheet, Text, View } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  H1,
  H2,
  H3
} from "native-base";
import Trainings from "./Trainings";
import { StackNavigator } from "react-navigation";
const Stack = StackNavigator({
  Trainings: {
    screen: Trainings,
    navigationOptions: {
      title: "Trainings",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "green"
      }
    }
  }
});

export default class Home extends React.Component {
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
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <H1 style={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
            Trained | In
          </H1>
          <H3 style={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
            Making everything else about training... effortless
          </H3>
          <Button
            block
            success
            style={{ alignSelf: "center", marginTop: "10%" }}
            onPress={() => this.props.navigation.navigate("Trainings")}
          >
            <Text> Head to your Dashboard </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
