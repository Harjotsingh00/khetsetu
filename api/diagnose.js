module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'AI photo analysis is not configured. Add GEMINI_API_KEY in deployment settings.' });
  const { image, mimeType, symptom, crop, location } = req.body || {};
  if (typeof image !== 'string' || image.length > 6_000_000) return res.status(400).json({ error: 'Please upload a smaller photo (under about 4 MB).' });
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(mimeType)) return res.status(400).json({ error: 'Use a JPEG, PNG, or WebP photo.' });
  try {
    const prompt = `You are a cautious crop-health screening assistant for smallholder farmers. Examine this leaf or crop photo. Crop named by farmer: ${crop || 'unknown'}. Farmer-observed symptom: ${symptom || 'not provided'}. Location: ${location || 'unknown'}. Clearly state whether the image is suitable to assess. Give a tentative visual observation, 1-3 plausible causes only if supported by visible evidence, and safe immediate steps (isolate affected plants when practical, avoid handling wet foliage, photograph both sides, ask local extension/agronomy service). Do not claim certainty, provide pesticide names or dosages, or diagnose from image alone. If the photo is unclear, say so and suggest what photo to take next. Keep under 130 words.`;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(process.env.GEMINI_MODEL || 'gemini-2.5-flash')}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: image } }] }], generationConfig: { temperature: 0.2, maxOutputTokens: 250 } })
    });
    const data = await response.json();
    if (!response.ok) return res.status(502).json({ error: data.error?.message || 'AI provider request failed.' });
    const result = data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('').trim();
    if (!result) return res.status(502).json({ error: 'The AI provider returned an empty response.' });
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(502).json({ error: error.message || 'Could not analyze this photo.' });
  }
};

module.exports.config = { api: { bodyParser: { sizeLimit: '7mb' } } };
