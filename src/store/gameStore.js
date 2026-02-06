import { create } from 'zustand';
import { fetchQuestions, submitScore } from '../services/api';

const useGameStore = create((set, get) => ({
  userId: '',
  gameStatus: 'IDLE', // IDLE, PLAYING, SUBMITTING, FINISHED
  questions: [],
  currentQuestionIndex: 0,
  answers: [], // Array of { id, answer }
  result: null, // { score, passed, etc. }
  loading: false,
  error: null,
  
  setUserId: (id) => set({ userId: id }),
  
  startGame: async (count) => {
    set({ loading: true, error: null, gameStatus: 'LOADING' });
    try {
      const questions = await fetchQuestions(count);
      set({ 
        questions, 
        currentQuestionIndex: 0, 
        answers: [], 
        gameStatus: 'PLAYING', 
        loading: false 
      });
    } catch (e) {
      set({ error: 'Failed to load questions', loading: false, gameStatus: 'IDLE' });
    }
  },
  
  answerQuestion: (questionId, optionKey) => {
    const { answers, currentQuestionIndex, questions } = get();
    const newAnswers = [...answers, { id: questionId, answer: optionKey }];
    
    // Move to next question or finish
    if (currentQuestionIndex + 1 < questions.length) {
      set({ 
        answers: newAnswers, 
        currentQuestionIndex: currentQuestionIndex + 1 
      });
    } else {
        // Last question answered
        set({ answers: newAnswers, gameStatus: 'SUBMITTING' });
        // Trigger submission immediately
        get().submitGame();
    }
  },
  
  submitGame: async () => {
    const { userId, answers } = get();
    const threshold = parseInt(import.meta.env.VITE_PASS_THRESHOLD || '3', 10);
    
    set({ loading: true });
    try {
      const result = await submitScore(userId, answers, threshold);
      set({ result, gameStatus: 'FINISHED', loading: false });
    } catch (e) {
      set({ error: 'Failed to submit score', loading: false, gameStatus: 'FINISHED' }); // Show result even if error (maybe offline mode?)
    }
  },
  
  resetGame: () => {
    set({ 
      gameStatus: 'IDLE', 
      questions: [], 
      currentQuestionIndex: 0, 
      answers: [], 
      result: null,
      error: null 
    });
  }
}));

export default useGameStore;
