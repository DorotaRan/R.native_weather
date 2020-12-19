import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';
import Moment from 'moment';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const imageConfig = {
  Clear: require('./assets/sun.png'),
  Rain: require('./assets/rainy.png'),
  Drizzle: require('./assets/rainy.png'),
  Thunderstorm: require('./assets/thunderstorm.png'),
  Mist: require('./assets/fog.png'),
  Clouds: require('./assets/clouds.png'),
  Snow: require('./assets/snow.png'),
  Error: require('./assets/error.png'),
};

export default function App() {
  const data = Moment().format('dddd, Do MMM');
  const [temperature, setTemperature] = useState('0');
  const [weather, setWeather] = useState('Rain');
  const [isLoading, setIsLoading] = useState(true);
  const url = `https://api.openweathermap.org/data/2.5/`;
  const apiKey = 'ab06cf297e8f65ab0d86ffab4a9e88b4';

  useEffect(() => {
    this.getCurrentWeather();
  }, []);

  this.getCurrentWeather = () => {
    setIsLoading(true);

    return setTimeout(
      () =>
        fetch(`${url}weather?q=Warsaw&units=metric&APPID=${apiKey}`)
          .then((response) => response.json())
          .then((responseJson) => {
            setWeather(responseJson.weather[0].main);
            setTemperature(responseJson.main.temp.toFixed());
            setIsLoading(false);
          })
          .catch((error) => {
            setWeather('Error');
            setTemperature('-');
            setIsLoading(false);
          }),
      2000
    );
  };

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="grey" style={{ height: '100%' }} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{data}</Text>
      <Image
        source={imageConfig[weather] || imageConfig['Error']}
        style={styles.image}
      />
      <Text style={styles.desc}> {weather} </Text>
      <Text style={styles.temperature}> {temperature} °C</Text>
      <TouchableOpacity style={styles.refresh} onPress={this.getCurrentWeather}>
        <Text>Refresh data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#fffaf5',
  },
  desc: {
    fontSize: 24,
    marginBottom: 5,
    marginTop: 0,
  },
  image: {
    height: '40%',
    width: '100%',
    resizeMode: 'contain',
  },
  temperature: {
    fontSize: 48,
    color: '#494d59',
    marginBottom: 25,
  },
  date: {
    fontSize: 24,
    color: '#494d59',
    marginBottom: 20,
  },
  refresh: {
    height: '5%',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#494d59',
  },
});
