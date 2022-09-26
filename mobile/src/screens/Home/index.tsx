import { Image, FlatList } from "react-native";

import { styles } from "./styles";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Header } from "../../components/Header";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";

export function Home() {
	const [games, setGames] = useState<GameCardProps[]>([]);
	const navigation = useNavigation();
	function handleOpenGame({ id, name, bannerUrl }: GameCardProps) {
		navigation.navigate("game", { id, name, bannerUrl });
	}

	useEffect(() => {
		fetch("http://10.0.0.106:3001/games")
			.then((response) => response.json())
			.then((data) => setGames(data));
	}, []);
	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<Image style={styles.logo} source={logoImg} />
				<Header
					title="Encontre seu duo!"
					subtitle="Selecione o game que deseja jogar..."
				/>
				<FlatList
					data={games}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<GameCard onPress={() => handleOpenGame(item)} data={item} />
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.contentList}
				/>
			</SafeAreaView>
		</Background>
	);
}
