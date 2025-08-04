import React, { useContext } from "react";
import { View, Button, StyleSheet, Text } from 'react-native';
import { Switch } from "react-native-gesture-handler";
import { ThemeContext } from "../context/ThemeContext";

export default function HomeScreen({ navigation }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // burası önemli

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <Text style={[styles.title, themeStyles.text]}>
        REHBER
      </Text>

      <Button 
        title="Kişi Ekle" 
        onPress={() => navigation.navigate('AddPerson')} 
      />

      <View style={{ height: 16 }} />

      <Button 
        title="Kişi Listesi" 
        onPress={() => navigation.navigate('PersonList')} 
      />

      <View style={styles.switchContainer}>
        <Text style={[themeStyles.text]}>Gece Modu</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:24
  },
  title:{
    fontSize:22,
    fontWeight:'bold',
    marginBottom:32,
    textAlign: 'center',
  },
  switchContainer: {
    marginTop: 32,
    alignItems: 'center'
  }
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  text: {
    color: "#000000"
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
  },
  text: {
    color: "#ffffff"
  },
});
