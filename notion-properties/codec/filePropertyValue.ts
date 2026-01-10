import z from "@zod/zod";
import { isoDatetimeString } from "./isoDatetimeString";

export const external = z.object({
	type: z.literal("external"),
	external: z.httpUrl(),
	name: z.string().optional(),
});

export const file = z.object({
	type: z.literal("file"),
	file: z.object({ url: z.httpUrl(), expiryTime: isoDatetimeString }),
});

export const fileUpload = z.object({
	type: z.literal("file_upload"),
	file_upload: z.object({ id: z.uuid() }),
	name: z.string().optional(),
});

export const filePropertyValue = z.discriminatedUnion("type", [
	external,
	file,
	fileUpload,
]);
