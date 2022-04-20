import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";

export default class StarScren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.navigation.getParam("name"),
      data: {},
    };
  }

  componentDidMount() {
    const { name } = this.state;
    this.getStarDetails(name);
  }

  getStarDetails = (name) => {
      /*write code to fetch data from your flask API.
        Make sure to use name argument.
        Store the fetched data in the state named data*/
  
    const url = `https://3402-121-241-7-122.ngrok.io/star?name=${name}`;
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    const { name, data } = this.state;
    if (data) {
      return (
        <ImageBackground
          source={require("../assets/bg_image.jpg")}
          style={{ flex: 1 }}
        >
          <SafeAreaView
            style={{
              marginTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
          />
          <Image source={require("../assets/star1.png")} style={styles.image} />
          <View style={styles.upperContainer}>
            <Text style={styles.starName}>{data.name}</Text>
          </View>
          <View style={styles.middleContainer}>
            <View>
              <Text style={styles.text}>{data.mass}</Text>
              <Text style={styles.text}>Mass</Text>
            </View>
            <View>
              <Text style={styles.text}>{Math.round(data.gravity)}</Text>
              <Text style={styles.text}>Gravity</Text>
            </View>
            <View>
              <Text style={styles.text}>{data.radius}</Text>
              <Text style={styles.text}>Radius</Text>
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <Text style={styles.text}>{data.distance}</Text>
            <Text style={styles.text}>Distance from Earth</Text>
          </View>
        </ImageBackground>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  upperContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  starName: {
    fontSize: RFValue(40),
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  middleContainer: {
    flex: 0.22,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontSize: RFValue(18),
    color: "#fff",
    fontWeight: "400",
    textAlign: "center",
  },
  lowerContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { 
    width: RFValue(200), 
    height: RFValue(200),
    alignSelf:"center"

  },
});
