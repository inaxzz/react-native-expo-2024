import { router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Ionics from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  const handleCalendar = (event, selectedDate) => {
    setViewCalendar(false);
    setData(selectedDate);
  };
  const [observacao, setObservacao] = useState("");

  return (
    <View style={styles.content}>
      <Text>Inserir Pagamentos</Text>
      <View style={styles.inputView}>
        <Ionics name="wallet-outline" size={24} color="black" />
        <TextInput
          placeholder="Valor"
          keyboardType="decimal-pad"
          style={styles.inputValor}
          value={valor}
          onChangeText={setValor}
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
        <Button title="Salvar" />
        <Button title="Continuar" />
        <Button title="Cancelar" onPress={() => router.back()} />
      </View>
    </View>
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
