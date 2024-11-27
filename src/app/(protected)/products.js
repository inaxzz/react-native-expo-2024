import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionics from "@expo/vector-icons/Ionicons";
import { z } from "zod";
import { useProductsDatabase } from "../../database/useProductsDatabase";

const productSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  descricao: z.string().optional(),
  preco: z.number().positive("O preço deve ser maior que zero"),
  quantidade: z.number().int().positive("A quantidade deve ser um número inteiro positivo"),
});

export default function Product() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("0,00");
  const [quantidade, setQuantidade] = useState("1");
  const precoRef = useRef();
  const quantidadeRef = useRef();
  const { createProduct } = useProductsDatabase();

  const handleChangePreco = (value) => {
    try {
      let precoLimpo = value.replace(",", "").replace(".", "");
      let precoConvertido = Number(precoLimpo) / 100;
      if (precoConvertido === 0 || isNaN(precoConvertido)) {
        setPreco("0,00");
        return;
      }
      let precoPtBR = Intl.NumberFormat("pt-BR", {
        style: "decimal",
        minimumFractionDigits: 2,
      }).format(precoConvertido);
      setPreco(precoPtBR);
    } catch (error) {
      setPreco("0,00");
    }
  };

  const convertPreco = (value) => {
    try {
      let precoLimpo = value.replace(",", "").replace(".", "");
      let precoConvertido = Number(precoLimpo) / 100;
      return precoConvertido || 0;
    } catch (error) {
      return 0;
    }
  };

  const handleSubmit = async () => {
    const product = {
      nome,
      descricao,
      preco: convertPreco(preco),
      quantidade: parseInt(quantidade, 10),
    };

    try {
      await productSchema.parseAsync(product); // Validação dos dados
      const { insertedID } = await createProduct(product); // Inserção no banco
      Alert.alert("Sucesso", `Produto cadastrado com ID: ${insertedID}`);
      setNome("");
      setDescricao("");
      setPreco("0,00");
      setQuantidade("1");
    } catch (error) {
      Alert.alert("Erro", `Erro ao cadastrar produto: ${error.message}`);
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text>Cadastrar Produto</Text>
        <View style={styles.inputView}>
          <Ionics name="pricetag-outline" size={24} color="black" />
          <TextInput
            placeholder="Nome do Produto"
            style={styles.inputTexto}
            value={nome}
            onChangeText={setNome}
          />
        </View>
        <View style={styles.inputView}>
          <Ionics name="information-circle-outline" size={24} color="black" />
          <TextInput
            placeholder="Descrição (opcional)"
            style={styles.inputTexto}
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>
        <View style={styles.inputView}>
          <Ionics name="cash-outline" size={24} color="black" />
          <TextInput
            placeholder="Preço"
            keyboardType="decimal-pad"
            style={styles.inputValor}
            value={preco}
            onChangeText={handleChangePreco}
            ref={precoRef}
          />
        </View>
        <View style={styles.inputView}>
          <Ionics name="layers-outline" size={24} color="black" />
          <TextInput
            placeholder="Quantidade"
            keyboardType="numeric"
            style={styles.inputTexto}
            value={quantidade}
            onChangeText={setQuantidade}
            ref={quantidadeRef}
          />
        </View>
        <View style={styles.contentButtons}>
          <Button title="Salvar" onPress={handleSubmit} />
          <Button title="Cancelar" onPress={() => router.back()} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  inputView: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  contentButtons: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  inputTexto: {
    flex: 1,
    padding: 10,
  },
  inputValor: {
    flex: 1,
    textAlign: "right",
    padding: 10,
  },
});
