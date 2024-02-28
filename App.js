/*
Welcome to ForecastRathod. This app allows a user to enter coordiantes to anywhere on earth to receive weather information for that location. The user
has to enter this info in the text boxes at the top, and then press the enter button to allow the app to register these coordinates. The top part of 
the app displays current weather info for that location, while the bottom part displays weather info for the next 5 days. 

Currently, I have not found any limitations for the app, since the information that is displayed is correct to the accuracy that the API gives me.
*/


import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ImageBackground} from 'react-native';

const background = { uri: "https://i.pinimg.com/originals/8c/77/1a/8c771ae6354a9bcb56dfc3fcd4936063.jpg" };
const weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=40.85&lon=-74.58&appid={key}&units=imperial"

const time = new Date()
const date = time.getDate()
const month = time.getMonth()

export default function App() {

  const [long, setLong] = useState(0)
  const [lat, setLat] = useState(0)
  const [tempLong, setTempLong] = useState(0)
  const [tempLat, setTempLat] = useState(0)
  const [current, setCurrent] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([""]);
  const [daily, setDaily] = useState([{temp:{max:"0"}}, {temp:{max:"0"}}, {temp:{max:"0"}}, {temp:{max:"0"}}, {temp:{max:"0"}}, {temp:{max:"0"}}]);
  useEffect(() => {
    const weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&appid={key}&units=imperial"
    fetch(weatherAPI)
    .then((response) => response.json())
    .then((result) => {
      setCurrent(result.current)
      setDaily(result.daily)
      setCurrentWeather(result.current.weather)
    })
    
    .catch((error) => alert("Error"))
  }, [lat, long])

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style = {styles.background}>
      <View style = {styles.coordInputs}>

        <TextInput
          style={styles.input}
          onChangeText={(value) => {setTempLong(value);}} 
          placeholder="Longitude"
          placeholderTextColor = 'black'
          returnKeyType='done'/>
        

        <TextInput
          style={styles.input}
          onChangeText={(value) => {setTempLat(value);}} 
          placeholder="Latitude"
          placeholderTextColor = 'black'
          returnKeyType='done'/>


        <TouchableOpacity
          style = {styles.enterButton}
          onPress = {() => {
            if ((tempLong >= -180 && tempLong <= 180 && tempLong != "") && (tempLat >= -90 && tempLat <= 90 && tempLat != "")){
              setLong(tempLong)
              setLat(tempLat)
            }
            else{
              Alert.alert("Please enter valid cooridnates")
            }

          }}>
            <Text style = {styles.enterButtonFont}>Enter</Text>
        </TouchableOpacity>
        
        </View>

      <View style = {styles.rest}>

        <View style = {styles.topForecast}>
          <View style = {styles.topForecastLeft}>
            <Image
              style={{width: 100, height: 100}}
              source={{ uri: 'http://openweathermap.org/img/wn/'+currentWeather[0].icon+'@4x.png' }}
            />
            
            <Text style = {styles.topFont}>{currentWeather[0].main}</Text>
            <Text style = {styles.topFont}>{Math.round(current.temp)}°F</Text>
          </View>


          <View style = {styles.topForecastRight}> 
            <Text style = {styles.topFont}>Wind Speed: {Math.round(current.wind_speed)} MPH</Text>
            <Text style={styles.topFont}>Clouds: {(current.clouds)}%</Text>
            <Text style={styles.topFont}>Humidity: {(current.humidity)}%</Text>
            <Text style = {styles.highlow}>H/L: {Math.round(daily[0].temp.max)}°/{Math.round(daily[0].temp.min)}°</Text>
          </View> 
          


        </View>

        <View style = {styles.bottomForecast}>

          <View style = {styles.bottomPreds}>
            <Text style = {styles.bottomFont}>{month + 1}/{date + 1}</Text>

            <View style = {styles.predHighLow}>
              <Text style = {styles.bottomFont}>H: {Math.round(daily[1].temp.max)}°F</Text>
              <Text style = {styles.bottomFont}>L: {Math.round(daily[1].temp.min)}°F</Text>
            </View>

          </View>

          <View style = {styles.bottomPreds}>
            <Text style = {styles.bottomFont}>{month + 1}/{date + 2}</Text>

            <View style = {styles.predHighLow}>
              <Text style = {styles.bottomFont}>H: {Math.round(daily[2].temp.max)}°F</Text>
              <Text style = {styles.bottomFont}>L: {Math.round(daily[2].temp.min)}°F</Text>
            </View>
            
          </View>

          <View style = {styles.bottomPreds}>
            <Text style = {styles.bottomFont}>{month + 1}/{date + 3}</Text>

            <View style = {styles.predHighLow}>
              <Text style = {styles.bottomFont}>H: {Math.round(daily[3].temp.max)}°F</Text>
              <Text style = {styles.bottomFont}>L: {Math.round(daily[3].temp.min)}°F</Text>
            </View>
            
          </View>

          <View style = {styles.bottomPreds}>
            <Text style = {styles.bottomFont}>{month + 1}/{date + 4}</Text>

            <View style = {styles.predHighLow}>
              <Text style = {styles.bottomFont}>H: {Math.round(daily[4].temp.max)}°F</Text>
              <Text style = {styles.bottomFont}>L: {Math.round(daily[4].temp.min)}°F</Text>
            </View>
            
          </View>

          <View style = {styles.bottomPreds}>
            <Text style = {styles.bottomFont}>{month + 1}/{date + 5}</Text>

            <View style = {styles.predHighLow}>
              <Text style = {styles.bottomFont}>H: {Math.round(daily[5].temp.max)}°F</Text>
              <Text style = {styles.bottomFont}>L: {Math.round(daily[5].temp.min)}°F</Text>
            </View>
            
          </View>
            
        </View>

      </View>


      <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  coordInputs: {
    paddingTop: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    flex: 1,
  },
  rest: {
    flex: 5,
  },
  enterButton: {
    backgroundColor: "#00D3EC",
    borderWidth: 1,
    borderColor: "black",
    height: 50,
    width: 80,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  enterButtonFont: {
    color: "black",
    fontSize: 20,
  },
  topFont:{
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
  },
  highlow:{
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
  },
  input: {
    width: 150,
    height: 50,
    fontSize: 24,
    borderColor: "black",
    borderWidth: 1,
    textAlign: "center",
    backgroundColor: "white",
  },
  topForecast: {
    flex: 2,
    flexDirection: "row",
    width: 380,
    backgroundColor: "#00D3EC",
    borderRadius: 10,
    justifyContent: "space-evenly",
    marginVertical: -40,
    opacity: 0.8,
  },
  topForecastLeft: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  topForecastRight: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomForecast:{
    flex: 6,
    width: 380,
    backgroundColor: "#00D3EC",
    borderRadius: 10,
    marginVertical: 70,
    justifyContent: "space-evenly",
    alignItems: "center",
    opacity: 0.8,
  },
  bottomPreds: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#00B9FF",
    width: "95%",
    justifyContent: "space-evenly",
  },
  predHighLow: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomFont: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
  },


});
