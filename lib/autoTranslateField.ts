import { translateText } from "./translate"

  

export function extractPlainText(content: any, sourceLang: string): string {
  if (!content) return ""

  if (typeof content === "string") {
    return content.trim()
  }

  if (Array.isArray(content)) {
    return content
      .map((block: any) => {
        if (block._type === "block" && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text).join(" ")
        }
        return ""
      })
      .join(" ")
      .trim()
  }

  if (typeof content === "object") {
    return extractPlainText(content[sourceLang] ?? Object.values(content)[0], sourceLang)
  }

  return ""
}

export async function autoTranslateField(
  doc: Record<string, any>,
  fieldName: string,
  sourceLang: string,
  targetLanguages: string[],
  pageType: string
): Promise<{ doc: Record<string, any>; patchUpdates: Record<string, any> }> {
  console.log("🛠️ autoTranslateField called:", {
    fieldName,
    sourceLang,
    targetLanguages,
    pageType,
  })

  const patchUpdates: Record<string, any> = {}
  const field = doc[fieldName]

  if (!field || typeof field !== "object") {
    console.warn(`⚠️ '${fieldName}' is not an object. Skipping.`)
    return { doc, patchUpdates }
  }

  const sourceSection = field[sourceLang]?.[pageType]
  if (!sourceSection || typeof sourceSection !== "object") {
    console.warn(
      `⚠️ No source content at '${fieldName}.${sourceLang}.${pageType}'. Skipping.`
    )
    return { doc, patchUpdates }
  }

  for (const key of Object.keys(sourceSection)) {
    const raw = sourceSection[key]
    const baseText = extractPlainText(raw, sourceLang)
    if (!baseText) continue

    for (const targetLang of targetLanguages) {
      const existing = field?.[targetLang]?.[pageType]?.[key]
      const alreadyTranslated =
        (typeof existing === "string" && existing.trim() !== "") ||
        (Array.isArray(existing) && existing.length > 0)
      if (alreadyTranslated) continue

      const isBlock = Array.isArray(raw) && raw[0]?._type === "block"
      let translatedValue: any

      if (isBlock) {
        translatedValue = await Promise.all(
          raw.map(async (block: any) => {
            if (block._type !== "block") return block

            const text = block.children
              .filter((child: any) => child._type === "span")
              .map((child: any) => child.text)
              .join("")

            const translatedText = await translateText(text, targetLang)

            return {
              ...block,
              children: [
                {
                  _type: "span",
                  text: translatedText,
                  marks: [],
                },
              ],
            }
          })
        )

        patchUpdates[`${fieldName}.${targetLang}.${pageType}.${key}`] = translatedValue

        doc[fieldName] ??= {}
        doc[fieldName][targetLang] ??= {}
        doc[fieldName][targetLang][pageType] ??= {}
        doc[fieldName][targetLang][pageType][key] = translatedValue
      } else {
        const translatedText = await translateText(baseText, targetLang)
        const wrapNested =
          raw && typeof raw === "object" && !Array.isArray(raw) && sourceLang in raw

        if (wrapNested) {
          translatedValue = { [targetLang]: translatedText }
          patchUpdates[`${fieldName}.${targetLang}.${pageType}.${key}.${targetLang}`] =
            translatedText
        } else {
          translatedValue = translatedText
          patchUpdates[`${fieldName}.${targetLang}.${pageType}.${key}.${targetLang}`] =
            translatedText
        }

        doc[fieldName] ??= {}
        doc[fieldName][targetLang] ??= {}
        doc[fieldName][targetLang][pageType] ??= {}
        if (wrapNested) {
          doc[fieldName][targetLang][pageType][key] = translatedValue
        } else {
          doc[fieldName][targetLang][pageType][key] ??= {}
          doc[fieldName][targetLang][pageType][key][targetLang] = translatedText
        }
      }
    }
  }

  console.log("🛠️ autoTranslateField patchUpdates:", patchUpdates)
  return { doc, patchUpdates }
}

