import z from "@zod/zod";
import { pageProperty } from "./pageProperty";
import { isoDatetimeString } from "./isoDatetimeString";
import { filePropertyValue } from "./filePropertyValue";
import { formulaPropertyValue } from "./formulaPropertyValue";
import { minimalUser } from "./user";

const SelectObject = z.object({
	id: z.uuid(),
	name: z.string(),
	color: z.string(),
});
const RollupObject = z.unknown();
const RichTextObject = z.unknown();

// Page property types
export const checkbox = pageProperty("checkbox", z.boolean());
export const createdBy = pageProperty("created_by", minimalUser);
export const createdTime = pageProperty("created_time", isoDatetimeString);
export const date = pageProperty(
	"date",
	z.object({ start: isoDatetimeString, end: isoDatetimeString.nullish() }),
);
export const email = pageProperty("email", z.email());
export const files = pageProperty("files", filePropertyValue.array());
export const formula = pageProperty("formula", formulaPropertyValue);
export const lastEditedBy = pageProperty("last_edited_by", minimalUser);
export const lastEditedTime = pageProperty(
	"last_edited_time",
	isoDatetimeString,
);
export const multiSelect = pageProperty("multi_select", SelectObject.array());
export const number = pageProperty("number", z.number());
export const people = pageProperty("people", minimalUser.array());
export const phoneNumber = pageProperty("phone_number", z.string());
export const relation = pageProperty(
	"relation",
	z.object({ id: z.uuid() }).array(),
).and(z.object({ has_more: z.boolean().optional() }));
export const rollup = pageProperty("rollup", RollupObject);
export const richText = pageProperty("rich_text", RichTextObject.array());
export const select = pageProperty("select", SelectObject);
export const status = pageProperty("status", SelectObject);
export const title = pageProperty("title", RichTextObject.array());
export const url = pageProperty("url", z.url());
export const uniqueId = pageProperty(
	"unique_id",
	z.object({ number: z.number(), prefix: z.string().nullable() }),
);
