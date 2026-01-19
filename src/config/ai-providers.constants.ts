export const AI_PROVIDERS = [
	{
		id: 'ollama',
		curl: `curl -X POST http://127.0.0.1:11434/v1/chat/completions \\
    -H "Authorization: Bearer {{API_KEY}}" \\
    -H "Content-Type: application/json" \\
    -d '{
    "model": "{{MODEL}}",
    "messages": [{"role": "system", "content": "{{SYSTEM_PROMPT}}"}, {"role": "user", "content": [{"type": "text", "text": "{{TEXT}}"}, {"type": "image_url", "image_url": {"url": "data:image/png;base64,{{IMAGE}}"}}]}]
  }'`,
		responseContentPath: 'choices[0].message.content',
		streaming: true,
	},
]
