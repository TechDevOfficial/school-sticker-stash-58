
import { useMemo } from 'react';
import { STICKERS, CATEGORIES } from '@/data/stickers';
import { UserCollection } from '@/types/sticker';
import StickerCard from './StickerCard';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface StickerCollectionProps {
  collection: UserCollection;
  hasSticker: (id: string) => boolean;
  getStickerCount: (id: string) => number;
}

const StickerCollection = ({ collection, hasSticker, getStickerCount }: StickerCollectionProps) => {
  const stats = useMemo(() => {
    const totalStickers = STICKERS.length;
    const ownedStickers = Object.keys(collection).filter(id => collection[id] > 0).length;
    const totalOwned = Object.values(collection).reduce((sum, count) => sum + count, 0);
    
    return {
      totalStickers,
      ownedStickers,
      totalOwned,
      completionPercentage: Math.round((ownedStickers / totalStickers) * 100)
    };
  }, [collection]);

  const getStickersByCategory = (category: string) => {
    return STICKERS.filter(sticker => sticker.category === category);
  };

  const getCategoryStats = (category: string) => {
    const categoryStickers = getStickersByCategory(category);
    const ownedInCategory = categoryStickers.filter(sticker => hasSticker(sticker.id)).length;
    return {
      owned: ownedInCategory,
      total: categoryStickers.length,
      percentage: Math.round((ownedInCategory / categoryStickers.length) * 100)
    };
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Album delle Figurine</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.ownedStickers}</div>
            <div className="text-sm text-gray-600">Figurine uniche</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.totalOwned}</div>
            <div className="text-sm text-gray-600">Figurine totali</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.totalStickers}</div>
            <div className="text-sm text-gray-600">Da collezionare</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.completionPercentage}%</div>
            <div className="text-sm text-gray-600">Completamento</div>
          </div>
        </div>
        
        <Progress value={stats.completionPercentage} className="w-full" />
      </Card>

      {/* Collection by Categories */}
      <Tabs defaultValue={CATEGORIES[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {CATEGORIES.map((category) => {
            const categoryStats = getCategoryStats(category);
            return (
              <TabsTrigger key={category} value={category} className="text-xs">
                <div>
                  <div>{category}</div>
                  <div className="text-xs text-gray-500">
                    {categoryStats.owned}/{categoryStats.total}
                  </div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {CATEGORIES.map((category) => {
          const categoryStickers = getStickersByCategory(category);
          const categoryStats = getCategoryStats(category);
          
          return (
            <TabsContent key={category} value={category} className="space-y-4">
              <Card className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">{category}</h3>
                  <span className="text-sm text-gray-600">
                    {categoryStats.owned}/{categoryStats.total} ({categoryStats.percentage}%)
                  </span>
                </div>
                <Progress value={categoryStats.percentage} className="w-full" />
              </Card>

              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categoryStickers.map((sticker) => (
                  <StickerCard
                    key={sticker.id}
                    sticker={sticker}
                    owned={hasSticker(sticker.id)}
                    count={getStickerCount(sticker.id)}
                    size="small"
                    showCount={true}
                  />
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default StickerCollection;
