
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
    small: 'w-28 h-40',
    medium: 'w-40 h-56',
    large: 'w-48 h-68'
  };

  const rarityColors = {
    common: 'from-gray-400 via-gray-500 to-gray-600',
    rare: 'from-blue-400 via-blue-500 to-blue-600',
    legendary: 'from-yellow-400 via-yellow-500 to-yellow-600'
  };

  const rarityBorders = {
    common: 'border-gray-400 shadow-gray-400/30',
    rare: 'border-blue-400 shadow-blue-400/30',
    legendary: 'border-yellow-400 shadow-yellow-400/30'
  };

  const rarityGlow = {
    common: 'shadow-lg',
    rare: 'shadow-lg shadow-blue-400/20',
    legendary: 'shadow-xl shadow-yellow-400/30'
  };

  return (
    <div className={`${sizeClasses[size]} relative group`}>
      {/* Sticker Base with realistic shape */}
      <Card className={`
        w-full h-full relative overflow-hidden transition-all duration-300 
        hover:scale-105 hover:-translate-y-1 ${rarityBorders[sticker.rarity]} 
        border-3 rounded-2xl ${rarityGlow[sticker.rarity]}
        bg-white transform-gpu
      `}>
        {/* Holographic/Foil effect overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-br ${rarityColors[sticker.rarity]} 
          opacity-10 group-hover:opacity-20 transition-opacity duration-300
          rounded-2xl
        `} />
        
        {/* Corner notch for realism */}
        <div className="absolute top-0 right-0 w-3 h-3 bg-gray-100 transform rotate-45 translate-x-1.5 -translate-y-1.5 border border-gray-300" />
        
        {!owned ? (
          /* Mystery sticker */
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-2xl relative overflow-hidden">
            {/* Pattern overlay for mystery effect */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-transparent via-white to-transparent transform rotate-45 animate-pulse" />
            </div>
            
            <div className="text-gray-500 text-center p-3 z-10">
              <div className="text-4xl mb-2 animate-pulse">?</div>
              <div className="text-sm font-medium">{sticker.category}</div>
              <div className="text-xs text-gray-400 mt-1">Misteriosa</div>
            </div>
            
            {/* Subtle border pattern */}
            <div className="absolute inset-2 border border-dashed border-gray-300 rounded-xl opacity-50" />
          </div>
        ) : (
          /* Owned sticker */
          <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden">
            {/* Main image area with realistic proportions */}
            <div className="flex-1 bg-cover bg-center relative" style={{
              backgroundImage: `url(https://images.unsplash.com/${sticker.image}?w=500&h=400&fit=crop)`
            }}>
              {/* Subtle inner border for depth */}
              <div className="absolute inset-1 border border-white/20 rounded-xl pointer-events-none" />
              
              {/* Rarity indicator corner */}
              <div className={`
                absolute top-2 left-2 w-6 h-6 rounded-full 
                ${sticker.rarity === 'common' ? 'bg-gray-400' :
                  sticker.rarity === 'rare' ? 'bg-blue-400' : 'bg-yellow-400'}
                border-2 border-white shadow-sm
              `} />
            </div>
            
            {/* Info section with card-like styling */}
            <div className="p-3 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
              <h3 className="font-bold text-sm text-center truncate text-gray-800 mb-1">
                {sticker.name}
              </h3>
              <p className="text-xs text-gray-600 text-center mb-2">
                {sticker.category}
              </p>
              
              <div className="flex justify-between items-center">
                <span className={`
                  text-xs px-2 py-1 rounded-full font-medium border
                  ${sticker.rarity === 'common' ? 'bg-gray-100 text-gray-700 border-gray-300' :
                    sticker.rarity === 'rare' ? 'bg-blue-100 text-blue-700 border-blue-300' : 
                    'bg-yellow-100 text-yellow-700 border-yellow-300'}
                `}>
                  {sticker.rarity === 'common' ? '★' : 
                   sticker.rarity === 'rare' ? '★★' : '★★★'}
                </span>
                
                {showCount && count > 1 && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium border border-green-300">
                    ×{count}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -translate-x-full group-hover:translate-x-full transition-all duration-700 pointer-events-none" />
      </Card>
    </div>
  );
};

export default StickerCard;
