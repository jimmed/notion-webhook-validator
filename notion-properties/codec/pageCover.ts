import z from "@zod/zod";
import { external, fileUpload } from "./filePropertyValue";

export const pageCover = z.discriminatedUnion("type", [external, fileUpload]);
