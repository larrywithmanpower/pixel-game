import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useGameStore from '../store/gameStore';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';
import BossAvatar from '../components/BossAvatar';

const Game = () => {
  const {
    questions,
    currentQuestionIndex,
    answerQuestion,
    gameStatus,
    loading
  } = useGameStore();

  const navigate = useNavigate();

  useEffect(() => {
    // If no questions and not loading, go back home
    if (questions.length === 0 && !loading && gameStatus === 'IDLE') {
      navigate('/');
    }
    if (gameStatus === 'FINISHED') {
      navigate('/result');
    }
  }, [questions, loading, gameStatus, navigate]);

  const currentQuestion = questions[currentQuestionIndex];

  if (loading || !currentQuestion) {
    return (
      <PixelCard title="載入中...">
        <div style={{textAlign: 'center'}}>請稍候...</div>
      </PixelCard>
    );
  }

  // Progress
  const progress = currentQuestionIndex + 1;
  const total = questions.length;

  return (
    <div style={{width: '100%', maxWidth: '600px'}}>
      <div className="game-status-bar" style={{display: 'flex', justifyContent: 'center', marginBottom: '16px'}}>
        <span>關卡 {progress}/{total}</span>
      </div>

      <BossAvatar seed={currentQuestion.id || `boss-${currentQuestionIndex}`} />

      <PixelCard className="question-card">
        <h3 className="question-text">
          {currentQuestion.question}
        </h3>

        <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '16px'}}>
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <PixelButton
              key={key}
              onClick={() => answerQuestion(currentQuestion.id, key)}
              variant="primary"
              className="option-btn"
            >
              <span className="option-key">{key}.</span>
              <span className="option-content">
                {value}
              </span>
            </PixelButton>
          ))}
        </div>
      </PixelCard>
    </div>
  );
};

export default Game;
