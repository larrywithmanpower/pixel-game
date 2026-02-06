import React, {useMemo} from 'react';

const BossAvatar = ({seed, size = 150}) => {
  // Use 'pixel-art' style from DiceBear
  // Seed ensures the same avatar for the same level/boss if needed, or random.
  // We can also cycle through a list if we pre-generated them, but query params is easier.

  const avatarUrl = useMemo(() => {
    return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;
  }, [seed]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
      filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.5))'
    }}>
      <img
        src={avatarUrl}
        alt="Boss Avatar"
        width={size}
        height={size}
        style={{imageRendering: 'pixelated'}}
        loading="eager"
      />
    </div>
  );
};

export default BossAvatar;
