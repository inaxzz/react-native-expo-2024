import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionics from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { z } from "zod";
import {useAuth} from "../../hooks/Auth/index";

const paymentSchema = z.object({
  valor_pago: z.number().gt(0),
  user_id: z.number().int().positive(),
  user_cadastro: z.number().int().positive(),
  data_pagamento: z.date(),
  observacao: z.string(),
});

export default function Payment() {
  const [valor, setValor] = useState("0,00");
  const [sugestoes, setSugestoes] = useState([
    {
      id: 1,
      nome: "Trula Matiebe",
    },
    {
      id: 2,
      nome: "Nicolai Booth",
    },
    {
      id: 3,
      nome: "Abagael Brose",
    },
    {
      id: 4,
      nome: "Audra Pezey",
    },
    {
      id: 5,
      nome: "Bianka Czaja",
    },
    {
      id: 6,
      nome: "Maison Huckin",
    },
    {
      id: 7,
      nome: "Goldia Williscroft",
    },
    {
      id: 8,
      nome: "Cliff Lockery",
    },
    {
      id: 9,
      nome: "Ellene Hamlington",
    },
    {
      id: 10,
      nome: "Lolly Bondy",
    },
    {
      id: 11,
      nome: "Yehudit Habergham",
    },
    {
      id: 12,
      nome: "Rem Follan",
    },
    {
      id: 13,
      nome: "Fax Pothecary",
    },
    {
      id: 14,
      nome: "Blinni Moreman",
    },
    {
      id: 15,
      nome: "Anabel Karlqvist",
    },
    {
      id: 16,
      nome: "Schuyler Splevings",
    },
    {
      id: 17,
      nome: "Scott Wybern",
    },
    {
      id: 18,
      nome: "Jeanine Peppard",
    },
    {
      id: 19,
      nome: "Greer Branwhite",
    },
    {
      id: 20,
      nome: "Joane Vaughan",
    },
    {
      id: 21,
      nome: "Temp Glenton",
    },
    {
      id: 22,
      nome: "Gabbey Bray",
    },
    {
      id: 23,
      nome: "Derick Giraldon",
    },
    {
      id: 24,
      nome: "Ryun Coppins",
    },
    {
      id: 25,
      nome: "Cletis Goseling",
    },
    {
      id: 26,
      nome: "Tildy Sheehy",
    },
    {
      id: 27,
      nome: "Harold Gosling",
    },
    {
      id: 28,
      nome: "Kailey Normadell",
    },
    {
      id: 29,
      nome: "Willey Aggett",
    },
    {
      id: 30,
      nome: "Richie Tiffany",
    },
    {
      id: 31,
      nome: "Levey Waterson",
    },
    {
      id: 32,
      nome: "Lavinie Laxe",
    },
    {
      id: 33,
      nome: "Susy McKniely",
    },
    {
      id: 34,
      nome: "Flo Dudmarsh",
    },
    {
      id: 35,
      nome: "Gaspar Shovelin",
    },
  ]);
  const [id, setId] = useState(1);
  const [data, setData] = useState(new Date());
  const [viewCalendar, setViewCalendar] = useState(false);
  const [observacao, setObservacao] = useState("");
  const valueRef = useRef();
  const {user} = useAuth();

  const handleCalendar = (event, selectedDate) => {
    setViewCalendar(false);
    setData(selectedDate);
  };

  useEffect(() => {
    valueRef?.current?.focus();
  }, []);

  const handleChangeValor = (value) => {
    try {
      let valorLimpo = value.replace(",", "").replace(".", "");
      let valorConvertido = Number(valorLimpo) / 100;
      if (valorConvertido === 0 || isNaN(valorConvertido)) {
        setValor("0,00");
        return;
      }
      let valorPtBR = Intl.NumberFormat("pt-BR", {
        style: "decimal",
        minimumFractionDigits: 2,
      }).format(valorConvertido);
      setValor(valorPtBR);
    } catch (error) {
      setValor("0,00");
    }
  };

  const convertValue = (value) => {
    try {
      let valorLimpo = value.replace(",", "").replace(".", "");
      let valorConvertido = Number(valorLimpo) / 100;
      if (valorConvertido === 0 || isNaN(valorConvertido)) {
        return 0;
      }
      return valorConvertido;
    } catch (error) {
      return valorConvertido;
    }
  };

  const handleSubmit = async () => {
    const payment = {
      user_id: id,
      user_cadastro: Number(user.user.id),
      valor_pago: convertValue(valor),
      data_pagamento: data,
      observacao,
    };

    try {
      const result = await paymentSchema.parseAsync(payment);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text>Inserir Pagamentos</Text>
        <View style={styles.inputView}>
          <Ionics name="wallet-outline" size={24} color="black" />
          <TextInput
            placeholder="Valor"
            keyboardType="decimal-pad"
            style={styles.inputValor}
            value={valor}
            onChangeText={(newValue) => {
              handleChangeValor(newValue);
            }}
            ref={valueRef}
          />
        </View>
        <View style={styles.inputView}>
          <Picker
            selectedValue={id}
            onValueChange={(itemValue, index) => {
              setId(itemValue);
            }}
            style={{ width: "100%" }}
          >
            {sugestoes?.map((item) => {
              return (
                <Picker.Item key={item.id} label={item.nome} value={item.id} />
              );
            })}
          </Picker>
        </View>
        <View style={styles.inputView}>
          <Text onPress={() => setViewCalendar(true)} style={styles.inputData}>
            {data.toLocaleDateString().split("T")[0]}
          </Text>
          {viewCalendar && (
            <DateTimePicker
              value={data}
              onChange={handleCalendar}
              mode="date"
              testID="dateTimePicker"
            />
          )}
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Observações"
            style={styles.inputObservacao}
            value={observacao}
            onChangeText={setObservacao}
            multiline={true}
          />
        </View>
        <View style={styles.contentButtons}>
          <Button title="Salvar" onPress={handleSubmit} />
          <Button title="Continuar" />
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
  inputValor: {
    flex: 1,
    textAlign: "right",
    padding: 10,
  },
  inputData: {
    width: "100%",
    textAlign: "center",
    fontFamily: "regular",
    fontSize: 20,
    padding: 10,
  },
  inputObservacao: {
    fontFamily: "regular",
    fontSize: 20,
    flex: 1,
    lineHeight: 20,
  },
});
