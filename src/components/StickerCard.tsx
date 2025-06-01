
import { Sticker } from '@/types/sticker';
import { Card } from '@/components/ui/card';

interface StickerCardProps {
  sticker: Sticker;
  owned: boolean;
  count?: number;
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
}

const StickerCard = ({ sticker, owned, count = 0, size = 'medium', showCount = false }: StickerCardProps) => {
  const sizeClasses = {
    small: 'w-20 h-28',
    medium: 'w-32 h-44',
    large: 'w-40 h-56'
  };

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    legendary: 'from-yellow-400 to-yellow-600'
  };

  const rarityBorders = {
    common: 'border-gray-400',
    rare: 'border-blue-400',
    legendary: 'border-yellow-400'
  };

  return (
    <Card className={`${sizeClasses[size]} relative overflow-hidden transition-all duration-300 hover:scale-105 ${rarityBorders[sticker.rarity]} border-2`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[sticker.rarity]} opacity-20`} />
      
      {!owned ? (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="text-gray-500 text-center p-2">
            <div className="text-2xl mb-1">?</div>
            <div className="text-xs">{sticker.category}</div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 bg-cover bg-center" style={{
            backgroundImage: `url(https://images.unsplash.com/${sticker.image}?w=400&h=300&fit=crop)`
          }} />
          
          <div className="p-2 bg-white bg-opacity-90">
            <h3 className="font-bold text-xs text-center truncate">{sticker.name}</h3>
            <p className="text-xs text-gray-600 text-center">{sticker.category}</p>
            
            <div className="flex justify-between items-center mt-1">
              <span className={`text-xs px-1 rounded ${
                sticker.rarity === 'common' ? 'bg-gray-200' :
                sticker.rarity === 'rare' ? 'bg-blue-200' : 'bg-yellow-200'
              }`}>
                {sticker.rarity}
              </span>
              
              {showCount && count > 1 && (
                <span className="text-xs bg-green-200 px-1 rounded">×{count}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default StickerCard;
