import axios from 'axios';

const GAS_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPT_URL;

// Mock data for development when GAS_URL is not set or fails
const MOCK_QUESTIONS = [
  {
    id: 'q1',
    question: '1+1 等於多少？\nWhat is 1+1?',
    options: { A: '1', B: '2', C: '3', D: '4' }
  },
  {
    id: 'q2',
    question: '什麼是像素藝術？\nWhat is Pixel Art?',
    options: { A: '數位藝術\nDigital Art', B: '油畫\nOil Painting', C: '雕塑\nSculpture', D: '音樂\nMusic' }
  },
  {
    id: 'q3',
    question: 'React 是一個...\nReact is a...',
    options: { A: '資料庫\nDatabase', B: '函式庫\nLibrary', C: '作業系統\nOS', D: '遊戲\nGame' }
  }
];

export const textToPixel = (text) => {
    // Helper to maybe process text if needed
    return text; 
}

export const fetchQuestions = async (count = 5) => {
  if (!GAS_URL || GAS_URL.includes('YOUR_GOOGLE_SCRIPT')) {
    console.warn('GAS URL not set, using mock data');
    // Return random slice of mock
    return MOCK_QUESTIONS.slice(0, count);
  }

  try {
    const response = await axios.get(GAS_URL, {
      params: { action: 'getQuestions', count }
    });
    
    if (response.data.error) {
       throw new Error(response.data.error);
    }
    
    return response.data.questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    // Fallback to mock if network fails? Or rethrow?
    // For smoother UX in dev, fallback.
    return MOCK_QUESTIONS.slice(0, count);
  }
};

export const submitScore = async (id, answers, passThreshold) => {
  if (!GAS_URL || GAS_URL.includes('YOUR_GOOGLE_SCRIPT')) {
    console.warn('GAS URL not set, mocking submission');
    // Mock score calculation
    const correct = answers.length; // Assume all correct for mock
    return {
       success: true,
       score: 100,
       correctCount: correct,
       passed: true
    };
  }

  try {
    // We send as POST. 
    // Note: GAS Web App POST requests often require 'application/x-www-form-urlencoded' or specific handling for CORS.
    // However, the ContentService.MimeType.JSON in simple requests might trigger CORS preflight which GAS doesn't handle well.
    // Standard workaround for GAS POST is using 'no-cors' mode with fetch, but then we can't read response.
    // Or simpler: use 'text/plain' content type to avoid preflight if possible, but axios with JSON usually triggers it.
    // Let's try standard JSON. If CORS fails, we might need to use `fetch(url, { method: 'POST', body: JSON.stringify(...) })` with specific headers.
    // Actually, `application/json` triggers preflight. GAS doesn't support OPTIONS.
    // Solution: Send as text/plain or using navigator.sendBeacon (no response). 
    // BUT we need response.
    // best practice for GAS: use `application/x-www-form-urlencoded` or pure text payload treated as such.
    // Let's force axios to send as text/plain to skip preflight if simple request logic applies (but JSON body usually isn't simple).
    // Actually, widespread fix is: `axios.post(url, JSON.stringify(data), { headers: { 'Content-Type': 'text/plain' } })` then parse in GAS.
    
    const payload = {
        action: 'submitScore',
        id,
        answers,
        passThreshold
    };

    const response = await axios.post(GAS_URL, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'text/plain;charset=utf-8' 
        }
    });

    return response.data;
  } catch (error) {
    console.error('Error submitting score:', error);
    throw error;
  }
};
