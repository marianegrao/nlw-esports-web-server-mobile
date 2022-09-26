import {
	ImageBackground,
	ImageSourcePropType,
	TouchableOpacity,
	TouchableOpacityProps,
	Text,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import { THEME } from "../../theme";

export interface GameCardProps {
	id: string;
	name: string;
	_count: { ads: number };
	bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
	data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {
	return (
		<TouchableOpacity style={styles.container} {...rest}>
			<ImageBackground source={{ uri: data.bannerUrl }} style={styles.cover}>
				<LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
					<Text style={styles.name}>{data.name}</Text>
					<Text style={styles.ads}>{data._count.ads} anúncio(s)</Text>
				</LinearGradient>
			</ImageBackground>
		</TouchableOpacity>
	);
}
