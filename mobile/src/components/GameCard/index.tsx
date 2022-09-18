import {
  TouchableOpacity,
  TouchableOpacityProps,
  ImageBackground,
  Text,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import { THEME } from "../../theme";

export interface GameCardProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {
  const totalAds = data._count.ads;

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={{ uri: data.bannerUrl }}>
        <LinearGradient style={styles.footer} colors={THEME.COLORS.FOOTER}>
          <Text style={styles.name}>{data.title}</Text>
          <Text style={styles.ads}>
            {totalAds} anúnci{totalAds > 1 ? "os" : "o"}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
