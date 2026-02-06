import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useGameStore from '../store/gameStore';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';
// import PixelInput from '../components/PixelInput'; // Wait, I didn't create PixelInput yet. I'll just use a styled input/PixelCard.

const Home = () => {
  const [inputVal, setInputVal] = useState('');
  const setUserId = useGameStore(state => state.setUserId);
  const resetGame = useGameStore(state => state.resetGame);
  const startGame = useGameStore(state => state.startGame);
  const navigate = useNavigate();
  const loading = useGameStore(state => state.loading);

  const handleStart = async () => {
    if (!inputVal.trim()) return;
    setUserId(inputVal.trim());
    resetGame();

    const count = parseInt(import.meta.env.VITE_QUESTION_COUNT || '5');
    // We can start game loading here or navigate then load.
    // Let's load first to ensure we have questions? Or navigate to Game which handles loading.
    // Store logic `startGame` fetches questions.
    await startGame(count);
    navigate('/game');
  };

  return (
    <div style={{padding: 20}}>
      {/* Title / Hero */}
      <h1 className="game-title">
        像素大挑戰
      </h1>

      <PixelCard title="輸入 ID">
        <p style={{marginBottom: 20}}>請輸入玩家 ID 開始遊戲</p>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="玩家 1"
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
        />
        <div style={{textAlign: 'center'}}>
          <PixelButton onClick={handleStart} disabled={!inputVal || loading}>
            {loading ? '載入中...' : '開始遊戲'}
          </PixelButton>
        </div>
      </PixelCard>
    </div>
  );
};

export default Home;
