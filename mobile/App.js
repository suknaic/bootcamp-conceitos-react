import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  StatusBar as Bar,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [projects, setProject] = useState([]);

  useEffect(() => {
    api.get("/project").then((resposta) => {
      console.log(resposta.data);
      setProject(resposta.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post("project", {
      title: `novo projeto ${Date.now()}`,
      owner: "felipe suknaic",
    });

    setProject([...projects, response.data]);
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item }) => (
            <Text style={styles.titulo}>{item.title}</Text>
          )}
        />
        <TouchableOpacity
          onPress={handleAddProject}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
    paddingTop: Bar.currentHeight,
  },
  titulo: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
