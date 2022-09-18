import { View, TouchableOpacity, Text } from "react-native";
import { GameController } from "phosphor-react-native";
import { DuoInfo } from "../DuoInfo";

import { THEME } from "../../theme";
import { styles } from "./styles";

export interface DuoCardProps {
  hourStart: string;
  hourEnd: string;
  id: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  const {
    id,
    name,
    hourStart,
    hourEnd,
    useVoiceChannel,
    weekDays,
    yearsPlaying,
  } = data;

  const totalWeekDays = weekDays.length;

  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={name} />
      <DuoInfo
        label="Tempo de jogo"
        value={`${yearsPlaying} an${yearsPlaying > 1 ? "os" : "o"}`}
      />
      <DuoInfo
        label="Disponibilidade"
        value={`${totalWeekDays} di${
          totalWeekDays > 1 ? "as" : "a"
        } \u2022 ${hourStart} - ${hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={useVoiceChannel ? "Sim" : "Não"}
        colorValue={useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController size={20} color={THEME.COLORS.TEXT} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
