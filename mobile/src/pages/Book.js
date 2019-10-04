import React, { useState } from "react";
import {
  SafeAreaView,
  Alert,
  AsyncStorage,
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";

import api from "../services/api";

export default function Book({ navigation }) {
  const [date, setDate] = useState("");

  const id = navigation.getParam("id");

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem("user");

    await api.post(
      `/spots/${id}/bookings`,
      {
        date
      },
      {
        headers: { user_id }
      }
    );

    Alert.alert("Solicitação de reserva enviada!");

    navigation.navigate("List");
  }

  function handleCancell() {
    navigation.navigate("List");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.label}> DATA DE INTERESSE *</Text>
        <TextInput
          style={styles.input}
          placeholder="Data de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={date}
          onChangeText={setDate}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}> Solicitar Reserva </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCancell} style={styles.cancelButton}>
        <Text style={styles.buttonText}> Cancelar Reserva </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  label: {
    marginTop: 50,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  cancelButton: {
    marginTop: 10,
    height: 42,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
