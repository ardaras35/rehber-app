import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { PersonContext } from "../context/PersonContext";
import { ThemeContext } from "../context/ThemeContext";

export default function AddPersonScreen({ navigation }) {
    const { addPerson } = useContext(PersonContext);
    const { isDarkMode } = useContext(ThemeContext);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');

    const handleAdd = () => {
        if (!name || !phone || !city) {
            Alert.alert("Hata!", "Lütfen tüm boşlukları doldurun.");
            return;
        }

        const newPerson = {
            id: Date.now(),
            name,
            phone,
            city,
        };

        addPerson(newPerson);
        Alert.alert("Başarılı", `${name} kişisi başarıyla eklendi.`);
        setName('');
        setPhone('');
        setCity('');
        navigation.navigate('PersonList');
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Text style={[styles.title, { color: isDarkMode ? '#ffffff' : '#000' }]}>Yeni Kişi Ekle</Text>

            <TextInput
                style={[styles.input, { color: isDarkMode ? '#ffffff' : '#000', borderColor: isDarkMode ? '#666666' : '#bbbbbb' }]}
                placeholder="Ad Soyad"
                placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={[styles.input, { color: isDarkMode ? '#ffffff' : '#000000', borderColor: isDarkMode ? '#666666' : '#bbbbbb' }]}
                placeholder="Telefon Numarası"
                placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <TextInput
                style={[styles.input, { color: isDarkMode ? '#ffffff' : '#000000', borderColor: isDarkMode ? '#666666' : '#bbbbbb' }]}
                placeholder="Şehir"
                placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
                value={city}
                onChangeText={setCity}
            />

            <Button title="Kişiyi Ekle" onPress={handleAdd} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
        fontSize: 16,
    },
});
