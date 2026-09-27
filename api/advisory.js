const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'AI is not configured. Add GEMINI_API_KEY in your deployment settings.' });
  const { mode, location = {}, crop, stage, soilScore } = req.body || {};
  const prompt = mode === 'rotation'
    ? `Give one concise, practical regenerative crop rotation idea after ${crop || 'the current crop'} for ${location.region || location.country || 'a smallholder farm'}. Mention locally dependent suitability; don't invent precise yields, fertilizer doses, or guarantees. Respond as plain text under 130 words.`
    : `You are KhetSetu, a careful smallholder agricultural information assistant. Create exactly 3 short field notes for a ${crop || 'unspecified'} farm at ${location.city || 'unknown location'}, ${location.region || ''}, ${location.country || ''}. Crop stage: ${stage || 'unknown'}. Soil score entered by farmer: ${soilScore ?? 'unknown'}/100. Ground advice in regenerative practices and farmer affordability. Never fabricate satellite observations, weather data, soil measurements, diagnoses, or local regulations. Weather is fetched separately; don't claim to know today's forecast. Avoid chemical product or dosage instructions. If knowledge is uncertain, say to ask a local extension worker. Return ONLY valid JSON: {"advice":[{"title":"...","description":"...","benefit":"..."}]} with plain, concrete sentences.`;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.4, maxOutputTokens: 700, ...(mode === 'rotation' ? {} : { responseMimeType: 'application/json' }) } })
    });
    const data = await response.json();
    if (!response.ok) return res.status(502).json({ error: data.error?.message || 'AI provider request failed.' });
    const text = data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('').trim();
    if (!text) return res.status(502).json({ error: 'The AI provider returned an empty response.' });
    if (mode === 'rotation') return res.status(200).json({ result: text });
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed.advice)) throw new Error('Unexpected response format.');
    return res.status(200).json({ advice: parsed.advice.slice(0, 3) });
  } catch (error) {
    return res.status(502).json({ error: error.message || 'Could not generate advice.' });
  }
};
