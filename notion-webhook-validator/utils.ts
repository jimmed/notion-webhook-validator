export function encodeSignature(signature: string): BufferSource {
	return Uint8Array.from(atob(signature), (c) => c.charCodeAt(0));
}

export async function importKey(verificationToken: string): Promise<CryptoKey> {
	return crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(verificationToken),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign", "verify"],
	);
}

export async function verifyKey(
	key: CryptoKey,
	encodedSignature: BufferSource,
	body: ArrayBuffer,
): Promise<boolean> {
	return crypto.subtle.verify("HMAC", key, encodedSignature, body);
}
