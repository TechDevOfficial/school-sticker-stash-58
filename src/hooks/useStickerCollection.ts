
import { useState, useEffect } from 'react';
import { UserCollection, Sticker } from '@/types/sticker';
import { STICKERS } from '@/data/stickers';

export const useStickerCollection = () => {
  const [collection, setCollection] = useState<UserCollection>({});
  const [coins, setCoins] = useState(1000); // Starting coins

  useEffect(() => {
    const savedCollection = localStorage.getItem('stickerCollection');
    const savedCoins = localStorage.getItem('coins');
    
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection));
    }
    if (savedCoins) {
      setCoins(parseInt(savedCoins));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stickerCollection', JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    localStorage.setItem('coins', coins.toString());
  }, [coins]);

  const addSticker = (stickerId: string) => {
    setCollection(prev => ({
      ...prev,
      [stickerId]: (prev[stickerId] || 0) + 1
    }));
  };

  const hasSticker = (stickerId: string) => {
    return (collection[stickerId] || 0) > 0;
  };

  const getStickerCount = (stickerId: string) => {
    return collection[stickerId] || 0;
  };

  const getRandomStickers = (count: number): Sticker[] => {
    const result: Sticker[] = [];
    
    for (let i = 0; i < count; i++) {
      const rarityRoll = Math.random();
      let availableStickers: Sticker[];
      
      if (rarityRoll < 0.05) {
        // 5% chance for legendary
        availableStickers = STICKERS.filter(s => s.rarity === 'legendary');
      } else if (rarityRoll < 0.25) {
        // 20% chance for rare
        availableStickers = STICKERS.filter(s => s.rarity === 'rare');
      } else {
        // 75% chance for common
        availableStickers = STICKERS.filter(s => s.rarity === 'common');
      }
      
      if (availableStickers.length === 0) {
        availableStickers = STICKERS;
      }
      
      const randomSticker = availableStickers[Math.floor(Math.random() * availableStickers.length)];
      result.push(randomSticker);
    }
    
    return result;
  };

  const openPack = (stickerCount: number, cost: number): Sticker[] | null => {
    if (coins < cost) {
      return null;
    }
    
    setCoins(prev => prev - cost);
    const newStickers = getRandomStickers(stickerCount);
    
    newStickers.forEach(sticker => {
      addSticker(sticker.id);
    });
    
    return newStickers;
  };

  const getCollectionStats = () => {
    const totalStickers = STICKERS.length;
    const ownedStickers = Object.keys(collection).filter(id => collection[id] > 0).length;
    const totalOwned = Object.values(collection).reduce((sum, count) => sum + count, 0);
    
    return {
      totalStickers,
      ownedStickers,
      totalOwned,
      completionPercentage: Math.round((ownedStickers / totalStickers) * 100)
    };
  };

  return {
    collection,
    coins,
    addSticker,
    hasSticker,
    getStickerCount,
    openPack,
    getCollectionStats,
    setCoins
  };
};
