import { FlatList, ScrollView, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState("")

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Participante existe", "Já existe na lista com esse nome!")
    }
    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [{ text: "Sim", onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name)) }, { text: "Não", style: 'cancel' }])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>16 de junho de 2023</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} onChangeText={/*text => setParticipantName(text)*/ setParticipantName} value={participantName} placeholder="Nome do participante" placeholderTextColor="#6B6B6B" />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.eventName}> Maneira 1 - Mais performático carregando o elemento so quando entra na área de visualização </Text> */}
      <FlatList ListEmptyComponent={() => (<Text style={styles.listEmptyText}>Ninguem chegou ao evento ainda!</Text>)} showsVerticalScrollIndicator={false} data={participants} keyExtractor={item => item} renderItem={({ item }) => (
        <Participant key={item} name={item} onRemove={() => handleParticipantRemove(item)} />

      )} />
      {/* <Text style={styles.eventName}> Maneira 2 - Menos performático renderizando todos os elementos mesmo não aparecendo na tela </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {participants.map(participant => (
          <Participant key={participant} name={participant} onRemove={() => handleParticipantRemove("Rodrigo")} />
        ))}
      </ScrollView> */}

    </View>
  );
}
