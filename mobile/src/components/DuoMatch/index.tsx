import { useState } from "react";
import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import * as Clipboard from "expo-clipboard";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState<boolean>(false);

  async function handleCopyDiscordToClipboardAsync() {
    try {
      setIsCopying(true);
      await Clipboard.setStringAsync(discord);
      Alert.alert(
        "Ahoooy!",
        "Usuário do discord copiado com sucesso, agora é só colar no seu Discord!"
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Ops!", "Não foi possível copiar o usuário do discord.");
    } finally {
      setIsCopying(false);
    }
  }

  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            style={{ alignItems: "center", marginTop: 24 }}
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
          />
          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboardAsync}
            disabled={isCopying}
          >
            <Text style={styles.discord}>
              {isCopying ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
