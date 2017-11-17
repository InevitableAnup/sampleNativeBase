import React from "react";
import Expo from "expo";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ListView,
  FlatList,
  TouchableHighlight
} from "react-native";
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
  Input,
  Item,
  Form,
  List,ListItem
} from "native-base";
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";


import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC1ikrKiKxmKJUFpAp3aiFOtJ46rSbA0Pw",
  authDomain: "trainedin-c2c10.firebaseapp.com",
  databaseURL: "https://trainedin-c2c10.firebaseio.com",
  projectId: "trainedin-c2c10",
  storageBucket: "trainedin-c2c10.appspot.com"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const styles = require("./../style");

var trainingNames = [];



export default class Trainings extends React.Component {
  constructor() {
    super();
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      isReady: false,
      trianingName: "",
      trainingCo: "",
      contactName: "",
      contactNumber: "",
      startDate: "",
      endDate: "",
      warning: "",
      itemDataSource: ds,
      trainings: []
    };
    this.itemsRef = this.getRef().child('trainings').child('wqecTJUTZXbOZRJd9hW1eETE9gK2');
    
        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
  }

  getRef(){
    return firebaseApp.database().ref();
  }

  componentDidMount() {
    // base
    //   .ref("trainings")
    //   .child("wqecTJUTZXbOZRJd9hW1eETE9gK2")
    //   .on("value", snap => {
    //     console.log("All Data", snap.val());

    //     snap.forEach(child => {
    //       console.log("Training", child.val().contactName);
    //       trainingNames.push({
    //         trianingName: child.val().contactName
    //       });
    //     });

    //     this.setState = ({
    //       dataSource: this.state.dataSource.cloneWithRows([{trainingName: 'trainingTitle'}])
    //     })

    //     console.table(trainingNames);
    //   });

      this.getItems(this.itemsRef);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef) {
    itemsRef.on('value',(snap) => {
      let items=[];
      snap.forEach((child) => {
        items.push({
          trainingName: child.val().trainingName,
          _key: child.key
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });

  
  }

  pressRow(item){
    console.log(item);
  }

  renderRow(item){
    return(
      <TouchableHighlight 
      onPress={() => {
        this.pressRow(item);
      }} >
      <View style={styles.li}>
      <Text style={styles.liText}>{item.trainingName}</Text>
      </View>
      </TouchableHighlight>

    );
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
            <Title>Trainings</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <H1 style={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
            Trainings
          </H1>

          <ListView
          dataSource={this.state.itemDataSource}
          renderRow={this.renderRow}
          />

          <Button
            block
            success
            style={{ alignSelf: "center", marginTop: "10%" }}
            onPress={() => {
              this.popupDialog.show();
            }}
          >
            <Text> Add New Training </Text>
          </Button>

          <PopupDialog
            dialogTitle={<DialogTitle title="Add New Training" />}
            ref={popupDialog => {
              this.popupDialog = popupDialog;
            }}
          >
            <Container>
              <Content>
                <Form>
                  <Item>
                    <Input placeholder="Training Name" />
                  </Item>
                  <Item>
                    <Input placeholder="Training Company" />
                  </Item>
                  <Item>
                    <Input placeholder="Primary Contact Name" />
                  </Item>
                  <Item>
                    <Input placeholder="Primary Contact Number" />
                  </Item>
                  <Item>
                    <Input placeholder="Start Date" />
                  </Item>
                  <Item last>
                    <Input placeholder="End Date" />
                  </Item>
                </Form>
                <Button
                  block
                  success
                  style={{ alignSelf: "center", marginTop: "10%" }}
                  onPress={() => {
                    this.popupDialog.show();
                  }}
                >
                  <Text> Add New Training </Text>
                </Button>
              </Content>
            </Container>
          </PopupDialog>
        </Content>
      </Container>
    );
  }
}


