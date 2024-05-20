import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const apikey = "b6d30de5b9613bd19fbdfa62a9815835";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const COLORS = { primary: '#1f145c', white: '#fff' };

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apikey}`);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        setWeather(null);
      }
    } catch {
      setWeather(null);
    }
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good night';
    }
  };

  const greetingMessage = `${getGreeting()}, Govardhan`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greetingText}>{greetingMessage}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
          />
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={fetchWeather}>
          <Icon name="search" color="white" size={30} />
        </TouchableOpacity>
        {weather ? (
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherText}>Temperature: {weather.main.temp}°C</Text>
            <Text style={styles.weatherText}>Weather: {weather.weather[0].description}</Text>
            <Text style={styles.weatherText}>Location: {weather.name}</Text>
          </View>
        ) : (
          <Text style={styles.weatherText}>Enter a city name to get weather</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    height: 40,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: COLORS.white,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 300, // Ensure the input doesn't take the full width
    maxHeight: 50, // Ensure the input doesn't take the full width
  },
  textInput: {
    height: '100%',
    fontSize: 16,
    color: COLORS.primary,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    color: COLORS.primary,
    marginTop: 10,
    textAlign: 'center',
  },
});
