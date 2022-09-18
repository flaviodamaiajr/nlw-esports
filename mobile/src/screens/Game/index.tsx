import { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";
import { THEME } from "../../theme";

import { GameParams } from "../../@types/navigation";

import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { api } from "../../services/api";
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {
  const route = useRoute();
  const navigation = useNavigation();

  const game = route.params as GameParams;

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");
  const [discordUserName, setDiscordUserName] = useState("");

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    try {
      const { data } = await api.get(`/ads/${adsId}/discord`);
      setDiscordDuoSelected(data.discord);
      setDiscordUserName(data.discord);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get(`/games/${game.id}/ads`);
        setDuos(data);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          style={styles.cover}
          source={{ uri: game.bannerUrl }}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          style={styles.containerList}
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => {
                getDiscordUser(item.id);
              }}
            />
          )}
          horizontal
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anuncios publicados ainda.
            </Text>
          )}
        />

        <DuoMatch
          onClose={() => setDiscordDuoSelected("")}
          visible={discordDuoSelected.length > 0}
          discord={discordUserName}
        />
      </SafeAreaView>
    </Background>
  );
}
