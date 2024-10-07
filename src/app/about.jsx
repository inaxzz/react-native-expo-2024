import { router } from "expo-router";
import { Button, Text, View, StyleSheet, ScrollView, Linking } from "react-native";

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título e Introdução */}
      <Text style={styles.title}>App de Controle de Estoque</Text>

      {/* Descrição do Aplicativo */}
      <Text style={styles.sectionTitle}>Sobre o Aplicativo</Text>
      <Text style={styles.paragraph}>
        Este aplicativo foi desenvolvido para facilitar o gerenciamento de estoques de empresas.
        Com ele, você pode cadastrar, editar e remover produtos, além de monitorar a quantidade em estoque
        de maneira eficiente e rápida.
      </Text>

      {/* Desenvolvedores */}
      <Text style={styles.sectionTitle}>Desenvolvedores</Text>
      <Text style={styles.paragraph}>Desenvolvido por Inácio da Silva Rodrigues.</Text>

      {/* Contato */}
      <Text style={styles.sectionTitle}>Suporte</Text>
      <Text style={styles.paragraph}>
        Para dúvidas ou suporte, entre em contato pelo email: suporte@controledeestoque.com
      </Text>

      {/* Botão Voltar */}
      <Button
        title="Voltar"
        onPress={() => {
          router.replace("/");
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  version: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});
