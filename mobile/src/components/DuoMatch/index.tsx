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
import { styles } from "./styles";
import { THEME } from "../../theme";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import { Header } from "../Header";
import * as Clipboard from "expo-clipboard";

interface Props extends ModalProps {
	discord: string;
	onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
	const [isCopping, setIsCopping] = useState(false);

	async function handleCopyDicordToClipboard() {
		setIsCopping(true);
		await Clipboard.setStringAsync(discord);
		Alert.alert("Discord copiado!", "Cole no Discord e encontre seu duo.");
		setIsCopping(false);
	}
	return (
		<Modal animationType="fade" transparent statusBarTranslucent {...rest}>
			<View style={styles.container}>
				<View style={styles.content}>
					<TouchableOpacity onPress={onClose} style={styles.closeIcon}>
						<MaterialIcons
							name="close"
							size={20}
							color={THEME.COLORS.CAPTION_500}
						/>
					</TouchableOpacity>
					<CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
					<Header
						title="Let's play!"
						subtitle="Agora é só começar a jogar"
						style={{ alignItems: "center", marginTop: 24 }}
					/>
					<Text style={styles.label}>Adicione no Discord</Text>
					<TouchableOpacity
						onPress={handleCopyDicordToClipboard}
						disabled={isCopping}
						style={styles.discordButton}
					>
						<Text style={styles.discord}>
							{isCopping ? (
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
