export async function generateAvatar(genre: string): Promise<string> {
  const apiKey = import.meta.env.VITE_REPLICATE_API_KEY!;
  const prompt = `A whimsical avatar representing a ${genre} book reader in fantasy style`;
  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${apiKey}`
    },
    body: JSON.stringify({
      version: "6debd181",
      input: { prompt, width: 512, height: 512 }
    })
  });
  if (!res.ok) throw new Error(`Replicate error ${res.status}`);
  const data = await res.json();
  return data.output?.[0];
}
