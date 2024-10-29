import { StatusBar } from "expo-status-bar";
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { useAuth } from "../hooks/Auth";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function App() {
  const { signIn, signOut } = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState("A123456a!");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email, password });
    } catch (error) {
      Alert.alert("Erro", error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("/workspaces/react-native-expo-2024/src/assets/controle.png")}
      />
      <View style={styles.inputBox}>
        <Ionicons name="mail-open-outline" size={20} color="gray" />
        <TextInput
          style={styles.emailInput}
          placeholder="E-mail"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color="gray" />
        <TextInput
          style={styles.emailInput}
          placeholder="Senha"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
        />
        <Ionicons
          name={passwordVisible ? "eye-off-outline" : "eye-outline"}
          size={20}
          color="gray"
          onPress={togglePasswordVisibility}
          style={styles.eyeIcon}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEntrarSuper}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("about")}>
        <Text style={styles.link}>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => BackHandler.exitApp()}>
        <Text style={styles.link}>Sair do Aplicativo</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 30,
    resizeMode: "contain", 
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    width: "100%",
    top: -100,
  },
  emailInput: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 10,
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 8,
    marginVertical: 20,
    width: "100%",
    alignItems: "center",
    top: -100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#007BFF",
    fontSize: 16,
    marginTop: 10,
    top: -100,
  },
});
