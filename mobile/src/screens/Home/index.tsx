import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { api } from "../../services/api";

import logoImage from "../../assets/logo-nlw-esports.png";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";

import { styles } from "./styles";

export function Home() {
  const navigation = useNavigation();

  const [games, setGames] = useState<GameCardProps[]>([]);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("gameScreen", { id, title, bannerUrl });
  }

  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get("/games");
        setGames(data);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImage} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        ></FlatList>
      </SafeAreaView>
    </Background>
  );
}
