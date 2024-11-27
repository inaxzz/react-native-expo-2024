import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Banner } from "../../components/Banner"; // Seu componente existente
import { useNavigation } from "@react-navigation/native"; // Para navegação

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {/* Banner */}
      <Banner />

      <ScrollView style={styles.container}>
        {/* Resumo do Estoque */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo do Estoque</Text>
          <Text>Total de Produtos: 120</Text>
          <Text>Estoque Baixo: 5</Text>
          <Text>Valor Total: R$ 50.000,00</Text>
        </View>

        {/* Produtos em Estoque Crítico */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estoque Crítico</Text>
          <Text>1. Produto A - Quantidade: 2</Text>
          <Text>2. Produto B - Quantidade: 1</Text>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {/* Últimas Movimentações */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Últimas Movimentações</Text>
          <Text>Saída: Produto C - 10 un</Text>
          <Text>Entrada: Produto D - 20 un</Text>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddProduct")}
          >
            <Text style={styles.buttonText}>Adicionar Produto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ProductList")}
          >
            <Text style={styles.buttonText}>Listagem de Produtos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Reports")}
          >
            <Text style={styles.buttonText}>Relatórios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
