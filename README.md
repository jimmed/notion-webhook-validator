# @jimmed/notion-webhook-validator

Validates the body of Notion webhook requests.

## Examples

```ts
import { validateNotionWebhookRequest } from "@jimmed/notion-webhook-validator"
 *
export default {
  async fetch(request: Request, env: Record<string, string>) {
    // Validate the body of the webhook request
    try {
      const token = env.NOTION_VERIFICATION_TOKEN
      await validateNotionWebhookRequest(request, token)
    } catch {
      // If the token is invalid, respond with HTTP 400
      return new Response(null, { status: 400 })
    }

    // Handle your webhook like normal here

    // Finally, respond with HTTP 201
    return new Response(null, { status: 201 })
  }
}
```
This example demonstrates how to `validateNotionWebhookRequest` in a Cloudflare
Worker. It assumes that you have an environment variable binding called
`NOTION_VERIFICATION_TOKEN`, containing the verification token you obtained
from Notion during the webhook setup process.
