# @jimmed/hono-notion-webhook

Hono middleware for handling Notion webhook requests

```ts
import { Hono } from "hono"
import { notionWebhook } from "@jimmed/hono-notion-webhook"

const webhookMiddleware = notionWebhook({
  verificationToken: ({ env }) => env.NOTION_WEBHOOK_VERIFICATION_TOKEN,
}) 
 
export default new Hono()
  .use('/webhook', webhookMiddleware, async (c) => {
    const events = c.get('webhookEvents')
  })
```
