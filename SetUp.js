import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SetUpScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [interests, setInterests] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const categories = ["Furniture", "Electronics", "Books", "Clothes", "MakeUp", "Accessories", "Perfumes", "Tools", "Toys", "Sports"];
  const countries = [
    "Select your country",
    "USA",
    "UK",
    "Canada",
    "Germany",
    "France",
    "Saudi Arabia",
    "UAE",
    "Egypt",
  ];

  const handleFinish = () => {
    if (!name.trim() || !username.trim() || !country || country === "Select your country" || interests.length === 0) {
      Alert.alert("Incomplete Profile", "Please fill all fields and select at least one interest");
      return;
    }
    
    // Navigate to the main app when setup is complete
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={require("../assets/images/logo.png")} style={styles.logoSmall} />

        {step === 1 ? (
          <View style={styles.card}>
            <View style={styles.headerBox}>
              <Text style={styles.headerText}>
                Good start! let's get to know each other.
              </Text>
            </View>
            <Text style={styles.title}>Setup your account</Text>
            <Text style={styles.label}>Introduce yourself.</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.label}>Create username.</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.label}>Select your country</Text>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.pickerText}>
                {country || "Select your country"}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={country}
                  onValueChange={(value) => {
                    setCountry(value);
                    setShowPicker(false);
                  }}
                  style={styles.picker}
                >
                  {countries.map((c, index) => (
                    <Picker.Item key={index} label={c} value={c} />
                  ))}
                </Picker>
                <TouchableOpacity 
                  style={styles.closePicker}
                  onPress={() => setShowPicker(false)}
                >
                  <Text style={styles.closePickerText}>Close</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={styles.headerBox}>
              <Text style={styles.headerText}>
                You are almost there! Only 1 step left to complete your profile.
              </Text>
            </View>
            <Text style={styles.title}>Your Interests</Text>
            <Text style={styles.label}>Select a few categories that you are interested in:</Text>
            <View style={styles.grid}>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.category,
                    interests.includes(item) && styles.selectedCategory,
                  ]}
                  onPress={() =>
                    setInterests((prev) =>
                      prev.includes(item)
                        ? prev.filter((i) => i !== item)
                        : [...prev, item]
                    )
                  }
                >
                  <Text style={[
                    styles.categoryText,
                    interests.includes(item) && styles.selectedCategoryText,
                  ]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.buttonSecondary} onPress={() => setStep(1)}>
                <Text style={styles.buttonSecondaryText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4EFEB",
    paddingTop: 60,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  logoSmall: {
    width: 90,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#CBD9E6",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerBox: {
    backgroundColor: "#F4EFEB",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 16,
    color: "#2F4358",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2F4358",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#2F4358",
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#F4EFEB",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: "#2F4358",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#F4EFEB",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: "center",
  },
  pickerText: {
    fontSize: 16,
    color: "#2F4358",
  },
  pickerWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    height: 150,
    width: "100%",
  },
  closePicker: {
    backgroundColor: "#2F4358",
    padding: 10,
    alignItems: "center",
  },
  closePickerText: {
    color: "#F4EFEB",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2F4358",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "#F4EFEB",
    fontWeight: "bold",
    fontSize: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  category: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#F4EFEB",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    width: "48%",
  },
  selectedCategory: {
    backgroundColor: "#2F4358",
    borderColor: "#2F4358",
  },
  categoryText: {
    color: "#2F4358",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: "#F4EFEB",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: "#F4EFEB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2F4358",
  },
  buttonSecondaryText: {
    color: "#2F4358",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    flex: 1,
    backgroundColor: "#2F4358",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
});