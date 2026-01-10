import z from "@zod/zod";

export const minimalUser = z.object({ object: z.enum(["user"]), id: z.uuid() });
export const fullUser = minimalUser
	.and(
		z.object({
			name: z.string().optional(),
			avatar_url: z.httpUrl().optional(),
		}),
	)
	.and(
		z.discriminatedUnion("type", [
			z.object({
				type: z.literal("person"),
				person: z.object({ email: z.email().optional() }),
			}),
			z.object({
				type: z.literal("bot"),
				bot: z.object({
					owner: z.object({ type: z.enum(["workspace", "user"]) }),
					workspace_name: z.string().nullable(),
					workspace_id: z.uuid(),
					workspace_limits: z.object({
						max_file_upload_size_in_bytes: z.int(),
					}),
				}),
			}),
		]),
	);
