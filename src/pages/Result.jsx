import React from 'react';
import {useNavigate} from 'react-router-dom';
import useGameStore from '../store/gameStore';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';
import BossAvatar from '../components/BossAvatar';

const Result = () => {
  const {result, resetGame, userId} = useGameStore();
  const navigate = useNavigate();

  const handleHome = () => {
    resetGame();
    navigate('/');
  };

  if (!result) {
    return (
      <PixelCard title="錯誤">
        <p>找不到成績</p>
        <PixelButton onClick={handleHome}>返回</PixelButton>
      </PixelCard>
    );
  }

  const {score, passed, correctCount} = result;
  const isWin = passed;

  return (
    <div style={{maxWidth: '500px', width: '100%'}}>
      <h1 className="game-title" style={{color: isWin ? 'var(--color-secondary)' : 'var(--color-danger)'}}>
        {isWin ? '闖關成功！' : '挑戰失敗'}
      </h1>

      <BossAvatar seed={isWin ? 'victory' : 'defeat'} size={100} />

      <PixelCard title="挑戰結果">
        <div style={{textAlign: 'left', marginBottom: '20px'}}>
          <p>玩家: <span style={{color: 'var(--color-primary)'}}>{userId}</span></p>
          <p>分數: <span style={{color: 'var(--color-danger)'}}>{score}</span></p>
          <p>答對題數: {correctCount}</p>
          <p>狀態: {isWin ? '通關' : '失敗'}</p>
        </div>

        <div style={{textAlign: 'center', marginTop: '30px'}}>
          <PixelButton onClick={handleHome} variant="secondary">
            再玩一次
          </PixelButton>
        </div>
      </PixelCard>
    </div>
  );
};

export default Result;
