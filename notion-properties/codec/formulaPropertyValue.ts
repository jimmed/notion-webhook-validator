import z from "@zod/zod";
import { isoDatetimeString } from "./isoDatetimeString";

export const formulaPropertyValue = z.discriminatedUnion("type", [
	z.object({ type: z.literal("boolean"), boolean: z.boolean() }),
	z.object({ type: z.literal("date"), date: isoDatetimeString }),
	z.object({ type: z.literal("number"), number: z.number() }),
	z.object({ type: z.literal("string"), string: z.string() }),
]);
