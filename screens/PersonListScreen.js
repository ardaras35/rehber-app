import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import { PersonContext } from "../context/PersonContext";
import { ThemeContext } from "../context/ThemeContext";

export default function PersonListScreen({ route, navigation }) {
  const { people } = useContext(PersonContext);
  const { isDarkMode } = useContext(ThemeContext); 
    const { data } = route.params || null;

if (data) 
 Alert.alert("Güncellendi", "numarası güncellendi.");

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' }
      ]}
      onPress={() => navigation.navigate("PersonDetail", { item })}
    >
      <View style={styles.cardContent}>
        <View style={styles.avatar}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{item.name?.charAt(0)}</Text>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
            {item.name}
          </Text>
          <Text style={[styles.info, { color: isDarkMode ? '#cccccc' : '#555555' }]}>
            📞 {item.phone}
          </Text>
          <Text style={[styles.info, { color: isDarkMode ? '#cccccc' : '#555555' }]}>
            📍 {item.city}
          </Text>
          <Text style={[styles.more, { color: isDarkMode ? '#aaaaaa' : '#888888' }]}>
            Daha fazla bilgi için tıklayın.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000000' : '#f9f9f9' }
      ]}
    >
      <Text style={[styles.title, { color: isDarkMode ? '#ffffff' : '#333333' }]}>
        Rehber
      </Text>
      {people.length === 0 ? (
        <Text style={[styles.empty, { color: isDarkMode ? '#aaaaaa' : '#777777' }]}>
          Henüz kişi eklemediniz.
        </Text>
      ) : (
        <FlatList
          data={people}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  info: {
    fontSize: 15,
  },
  more: {
    marginTop: 8,
    fontSize: 13,
    fontStyle: 'italic',
  },
});



// data çekilecek 