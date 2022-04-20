import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    /*write code to fetch data from your flask API.
     Store the fetched data in the state named data*/
     
     const url = "https://3402-121-241-7-122.ngrok.io";
     axios
       .get(url)
       .then((response) => {
         this.setState({ data: response.data.data });
       })
       .catch((error) => {
         console.log(error.message);
       });
     
  };

  renderItems = ({ item, index }) => {
    var num = index % 4;

    return (
      <TouchableOpacity
        style={[
          { backgroundColor: this.selectColor(index), opacity: 0.7 },
          styles.cardContainer,
        ]}
        onPress={() => {
          this.props.navigation.navigate("Star", { name: item.name });
        }}
      >
        <Image
          source={
            num == 0
              ? require("../assets/star1.png")
              : num == 1
              ? require("../assets/star2.png")
              : num == 2
              ? require("../assets/star3.png")
              : num == 3
              ? require("../assets/star4.png")
              : null
          }
          style={{ width: 50, height: 50 }}
        />
        <Text style={styles.cardTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  keyExtractor = (item, index) => index.toString();

  /*this function selects a color for the cards on the flatlist*/
  selectColor = (index) => {
    var color = ["#fbffd5", "#ffefff", "#ede5ff", "#eafff4"];
    var num = index % 4;
    return color[num];
  };

  render() {
    const { data } = this.state;
    return (
      <ImageBackground
        source={require("../assets/bg_image.jpg")}
        style={{ flex: 1 }}
      >
        <SafeAreaView
          style={{
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Stars</Text>
        </View>
        {data.length > 0 ? (
          <View style={styles.upperContainer}>
            <FlatList
              numColumns={3}
              data={data}
              renderItem={this.renderItems}
              keyExtractor={this.keyExtractor}
            />
          </View>
        ) : null}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: RFValue(28),
    fontWeight: "bold",
  },
  upperContainer: {
    flex: 0.9,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: RFValue(12),
    textAlign: "center",
    color: "navy",
  },
  cardContainer: {
    borderWidth: 0,
    borderRadius: 20,
    margin: RFValue(10),
    width: RFValue(100),
    height: RFValue(100),
    alignItems: "center",
    justifyContent: "center",
  },
});
