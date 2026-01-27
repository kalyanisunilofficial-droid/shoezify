export async function translateText(text: string, targetLang: string): Promise<string> {
  const res = await fetch("http://localhost:3000/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, targetLang }),
  });

  if (!res.ok) {
    throw new Error(`Translation API error: ${res.statusText}`);
  }

  const data = await res.json();
  return data.translatedText;
}
