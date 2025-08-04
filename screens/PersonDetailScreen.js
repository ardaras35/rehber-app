import React, { useContext, useState } from "react";
import { 
  Linking,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { PersonContext } from "../context/PersonContext";
import { ThemeContext } from "../context/ThemeContext";

export default function PersonDetailScreen({ route, navigation }) {
  const { deletePerson, updatePerson } = useContext(PersonContext);
  const { item } = route.params;
  const { isDarkMode } = useContext(ThemeContext);

  const [phone, setPhone] = useState(item.phone);
  const [selectedImage, setSelectedImage] = useState(item.image || null);

  const handleDelete = () => {
    Alert.alert("Emin misiniz?", "Bu kişiyi silmek istediğinize emin misiniz?", [
      { text: "İptal", style: "cancel" },
      {
        text: "Sil", style: "destructive", onPress: () => {
          deletePerson(item.id);
          Alert.alert("Silindi", `${item.name} rehberinizden silindi.`);
          navigation.goBack();
        }
      }
    ]);
  };

  const handleUpdate = () => {
    const updated = { ...item, phone };
    updatePerson(updated);
    Alert.alert("Güncellendi", `${item.name} numarası güncellendi.`);
    navigation.goBack({data : 5});
    Alert.alert("Güncellendi", "numarası güncellendi.");
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      Alert.alert("İzin gerekli", "Galeriye erişim izni vermelisiniz.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

 const handleSaveImage = () => {
  const updated = { ...item, image: selectedImage };
  updatePerson(updated);
  Alert.alert("Fotoğraf kaydedildi.");
};

const callPhone = ({phone}) => {Linking.openURL('tel:+' + phone)}

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{item.name}</Text>
      <Text style={[styles.label, { color: isDarkMode ? '#ccc' : '#333' }]}>Şehir: {item.city}</Text>

      <TextInput
        style={[
          styles.input,
          {
            borderColor: isDarkMode ? '#666' : '#bbb',
            color: isDarkMode ? '#fff' : '#000'
          }
        ]}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button onPress={callPhone(phone)} title= "Bu numarayı ara."> </Button>
      <Button title="Numarayı Güncelle" onPress={handleUpdate} />
      <View style={{ height: 16 }} />
      <Button title="Kişiyi Sil" color="red" onPress={handleDelete} />

      <View style={{ marginTop: 24 }}>
        <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Fotoğraf Seç</Text>
        </TouchableOpacity>

        {selectedImage && (
          <>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            <TouchableOpacity onPress={handleSaveImage} style={styles.saveButton}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Kaydet</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  photoButton: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 8,
  },
  selectedImage: {
    width: 120,
    height: 120,
    marginTop: 16,
    borderRadius: 60,
    alignSelf: 'center',
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
  },
});
