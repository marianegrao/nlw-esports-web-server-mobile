import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHouresToStingToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHoursString } from "./utils/convert-minutes-to-hour-string";
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

app.get("/games", async (req: any, res: any) => {
	const games = await prisma.game.findMany({
		include: {
			_count: {
				select: {
					ads: true,
				},
			},
		},
	});
	return res.json(games);
});

app.post("/games/:id/ads", async (req, res) => {
	const { id: gameId } = req.params;
	const body = req.body;

	// TODO: validacao Zod

	const ad = await prisma.ad.create({
		data: {
			gameId,
			name: body.name,
			yearsPlaying: body.yearsPlaying,
			discord: body.discord,
			weekDays: body.weekDays.join(","),
			hourStart: convertHouresToStingToMinutes(body.hourStart),
			hourEnd: convertHouresToStingToMinutes(body.hourEnd),
			useVoiceChannel: body.useVoiceChannel,
		},
	});

	return res.status(201).json(ad);
});

app.get("/games/:id/ads", async (req, res) => {
	const { id: gameId } = req.params;
	const ads = await prisma.ad.findMany({
		select: {
			id: true,
			name: true,
			yearsPlaying: true,
			weekDays: true,
			hourStart: true,
			hourEnd: true,
			useVoiceChannel: true,
		},
		orderBy: {
			createAt: "desc",
		},
		where: {
			gameId,
		},
	});
	const adsFormated = ads.map((ad) => {
		return {
			...ad,
			weekDays: ad.weekDays.split(","),
			hourStart: convertMinutesToHoursString(ad.hourStart),
			hourEnd: convertMinutesToHoursString(ad.hourEnd),
		};
	});
	return res.json(adsFormated);
});

app.get("/ads/:id/discord", async (req, res) => {
	const { id: adId } = req.params;

	const ad = await prisma.ad.findUniqueOrThrow({
		select: {
			discord: true,
		},
		where: {
			id: adId,
		},
	});
	return res.json({ discord: ad.discord });
});

app.listen(3001);
