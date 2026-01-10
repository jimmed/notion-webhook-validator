import z from "@zod/zod";
import { file } from "./filePropertyValue";

const emoji = z.object({ type: z.literal("emoji"), emoji: z.emoji() });

const customEmoji = z.object({
	type: z.literal("custom_emoji"),
	custom_emoji: z.object({ id: z.uuid(), name: z.string(), url: z.httpUrl() }),
});

export const pageIcon = z.discriminatedUnion("type", [
	emoji,
	customEmoji,
	file,
]);
