import z from "@zod/zod";

// Util types
export const isoDatetimeString = z.codec(z.iso.datetime(), z.date(), {
	encode: (date) => date.toISOString(),
	decode: (isoDate) => new Date(isoDate),
});
