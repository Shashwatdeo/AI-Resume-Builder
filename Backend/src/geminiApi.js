import axios from 'axios';

const client = axios.create({
  timeout: parseInt(process.env.GEMINI_TIMEOUT_MS || '12000', 10),
  headers: { 'Content-Type': 'application/json' }
});

async function withRetry(fn, { retries = 1, baseDelayMs = 500 } = {}) {
  let attempt = 0;
  let lastErr;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (attempt === retries) break;
      const delay = baseDelayMs * Math.pow(2, attempt);
      await new Promise(r => setTimeout(r, delay));
      attempt += 1;
    }
  }
  throw lastErr;
}

export async function getGeminiCompletion(prompt) {
  try {
    const exec = () => client.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );
    const response = await withRetry(exec, { retries: 1, baseDelayMs: 700 });
    const data = response.data;
    console.log('Gemini API response:', data);
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (error) {
    if (error.response && error.response.status === 503) {
      throw new Error('Gemini API is temporarily unavailable. Please try again later.');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Gemini API timeout. Please try again.');
    }
    console.error('Error fetching Gemini completion:', error);
    throw new Error('Failed to fetch completion from Gemini API');
  }
}
