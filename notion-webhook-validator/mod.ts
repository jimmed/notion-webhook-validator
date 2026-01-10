/**
 * Validates the body of Notion webhook requests using a verification token.
 *
 * Refer to the [Notion webhook documentation](https://developers.notion.com/reference/webhooks#step-3-validating-event-payloads-recommended)
 * for more information.
 *
 * @example Validate a request in a serverless function
 * ```ts
 * import { validateRequest } from "@jimmed/notion-webhook-validator"
 *
 * export default {
 *   async fetch(request: Request, env: Record<string, string>) {
 *     try {
 *       await validateRequest(request, env.NOTION_VERIFICATION_TOKEN)
 *     } catch {
 *       return new Response(null, { status: 400 })
 *     }
 *     return new Response(null, { status: 201 })
 *   }
 * }
 * ```
 *
 * @module notionWebhookValidator
 */

import { encodeSignature, importKey, verifyKey } from "./utils.ts";

/**
 * Validates the body of a Notion webhook request.
 *
 * @param body The body of the request to validate.
 * @param signature The content of the `X-Notion-Signature` header from the webhook request.
 * @param verificationToken The verification token obtained while setting up the webhook.
 * @throws if the body is not valid.
 *
 * @see https://developers.notion.com/reference/webhooks#step-3-validating-event-payloads-recommended
 */
export async function validateBody(
	body: ArrayBuffer,
	signature: string,
	verificationToken: string,
): Promise<void> {
	const key = await importKey(verificationToken);
	const valid = await verifyKey(key, encodeSignature(signature), body);
	if (!valid) {
		throw new Error("Notion webhook body does not match signature");
	}
}

/**
 * Validates a Notion webhook request.
 *
 * @param request The request to validate
 * @param verificationToken The verification token obtained while setting up the webhook.
 * @throws if the request is missing the `X-Notion-Signature` header, or the body is not valid.
 *
 * @see https://developers.notion.com/reference/webhooks#step-3-validating-event-payloads-recommended
 */
export async function validateRequest(
	request: Request,
	verificationToken: string,
): Promise<void> {
	const signature = request.headers.get("X-Notion-Signature");
	if (!signature) {
		throw new Error("Notion webhook request does not have a signature header");
	}

	const body = await request.arrayBuffer();
	await validateBody(body, signature, verificationToken);
}
