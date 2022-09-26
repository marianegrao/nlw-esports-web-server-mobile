import "./styles/main.css";
import logoImg from "./assets/logo-nlw-esports.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";

interface Game {
	id: string;
	name: string;
	bannerUrl: string;
	_count: {
		ads: number;
	};
}

export default function App() {
	const [games, setGames] = useState<Game[]>([]);
	useEffect(() => {
		axios("http://localhost:3001/games").then((response) => {
			setGames(response.data);
		});
	}, []);
	return (
		<div className="max-w-[1344px] mx-auto flex flex-col items-center m-20">
			<img src={logoImg} alt="logo nlw eports" />
			<h1 className="text-6xl text-white font-black m-20">
				Seu{" "}
				<span className="text-transparent bg-nlw-gradient bg-clip-text">
					duo
				</span>{" "}
				está aqui.
			</h1>
			<div className="grid grid-cols-6 gap-6">
				{games &&
					games.map((game) => {
						return (
							<GameBanner
								key={game.id}
								bannerUrl={game.bannerUrl}
								title={game.name}
								adsCount={game._count.ads}
							/>
						);
					})}
			</div>

			<Dialog.Root>
				<CreateAdBanner />
				<CreateAdModal />
			</Dialog.Root>
		</div>
	);
}
