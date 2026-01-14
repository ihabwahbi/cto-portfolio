/**
 * AI Model Factory
 *
 * Controls which AI model powers the Ihab AI assistant.
 * Set AI_PROVIDER in .env.local to choose your provider.
 */

import { openai } from "@ai-sdk/openai"
import { createOpenAICompatible } from "@ai-sdk/openai-compatible"

export type ProviderName = "openai" | "glm-fireworks" | "glm-cerebras" | "deepseek-fireworks"

const VALID_PROVIDERS = ["openai", "glm-fireworks", "glm-cerebras", "deepseek-fireworks"]

/**
 * Get AI model based on AI_PROVIDER environment variable.
 * Defaults to glm-cerebras if not set.
 */
export function getAIModel() {
  const provider = process.env.AI_PROVIDER || "glm-cerebras"

  if (provider === "openai") {
    requireKey("OPENAI_API_KEY", provider)
    const model = process.env.OPENAI_MODEL || "gpt-4o"
    return openai(model)
  }

  if (provider === "glm-fireworks") {
    requireKey("FIREWORKS_API_KEY", provider)
    const fireworks = createOpenAICompatible({
      name: "fireworks",
      apiKey: process.env.FIREWORKS_API_KEY!,
      baseURL: "https://api.fireworks.ai/inference/v1",
    })
    const model = process.env.FIREWORKS_GLM_MODEL || "accounts/fireworks/models/glm-4p6"
    return fireworks(model)
  }

  if (provider === "glm-cerebras") {
    requireKey("CEREBRAS_API_KEY", provider)
    const cerebras = createOpenAICompatible({
      name: "cerebras",
      apiKey: process.env.CEREBRAS_API_KEY!,
      baseURL: "https://api.cerebras.ai/v1",
    })
    const model = process.env.CEREBRAS_GLM_MODEL || "zai-glm-4.7"
    return cerebras(model)
  }

  if (provider === "deepseek-fireworks") {
    requireKey("FIREWORKS_API_KEY", provider)
    const fireworks = createOpenAICompatible({
      name: "fireworks",
      apiKey: process.env.FIREWORKS_API_KEY!,
      baseURL: "https://api.fireworks.ai/inference/v1",
    })
    const model = process.env.FIREWORKS_DEEPSEEK_MODEL || "accounts/fireworks/models/deepseek-v3p2"
    return fireworks(model)
  }

  throw new Error(
    `Unknown AI_PROVIDER: "${provider}"\n` +
    `  Valid options: ${VALID_PROVIDERS.join(", ")}`
  )
}

/** Helper to check for required API key */
function requireKey(keyName: string, provider: string): void {
  if (!process.env[keyName]) {
    throw new Error(`${keyName} is required when AI_PROVIDER=${provider}`)
  }
}
