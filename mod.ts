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
export async function validateNotionWebhookBody(
	body: ArrayBuffer,
	signature: string,
	verificationToken: string,
): Promise<void> {
	const key = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(verificationToken),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign", "verify"],
	);

	const encodedSignature = signatureToBase64Uint8Array(signature);
	const valid = await crypto.subtle.verify("HMAC", key, encodedSignature, body);
	if (!valid) {
		throw new Error(
			"Notion webhook body does not match signature and verification token",
		);
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
 *
 * @example Validate a request in a serverless function
 * ```ts
 * import { validateNotionWebhookRequest } from "./mod.ts"
 *
 * export default {
 *   async fetch(request: Request, env: Record<string, string>) {
 *     try {
 *       await validateNotionWebhookRequest(request, env.NOTION_VERIFICATION_TOKEN)
 *     } catch {
 *       return new Response(null, { status: 400 })
 *     }
 *     return new Response(null, { status: 201 })
 *   }
 * }
 * ```
 */
export async function validateNotionWebhookRequest(
	request: Request,
	verificationToken: string,
): Promise<void> {
	const signature = request.headers.get("X-Notion-Signature");
	if (!signature) {
		throw new Error("Notion webhook request does not have a signature header");
	}

	const body = await request.arrayBuffer();
	await validateNotionWebhookBody(body, signature, verificationToken);
}

function signatureToBase64Uint8Array(signature: string): BufferSource {
	return Uint8Array.from(atob(signature), (c) => c.charCodeAt(0));
}
