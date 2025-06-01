
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useStickerCollection } from '@/hooks/useStickerCollection';
import StickerCollection from './StickerCollection';
import PackOpener from './PackOpener';
import { Book, Package, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Album = () => {
  const [activeTab, setActiveTab] = useState('collection');
  const {
    collection,
    coins,
    hasSticker,
    getStickerCount,
    openPack,
    getCollectionStats,
    setCoins
  } = useStickerCollection();

  const handleOpenPack = (stickerCount: number, cost: number) => {
    const result = openPack(stickerCount, cost);
    if (result === null) {
      toast({
        title: "Monete insufficienti",
        description: "Non hai abbastanza monete per acquistare questo pacchetto!",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Pacchetto aperto!",
        description: `Hai ottenuto ${result.length} nuove figurine!`,
      });
    }
    return result;
  };

  const resetCollection = () => {
    localStorage.removeItem('stickerCollection');
    localStorage.removeItem('coins');
    window.location.reload();
  };

  const stats = getCollectionStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Album Figurine Scolastiche 📚
          </h1>
          <p className="text-gray-600">Colleziona tutte le figurine delle materie scolastiche!</p>
          
          {/* Quick Stats */}
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="bg-white rounded-lg px-3 py-2 shadow">
              <span className="text-gray-600">Progresso: </span>
              <span className="font-bold text-blue-600">{stats.completionPercentage}%</span>
            </div>
            <div className="bg-white rounded-lg px-3 py-2 shadow">
              <span className="text-gray-600">Figurine: </span>
              <span className="font-bold text-green-600">{stats.ownedStickers}/{stats.totalStickers}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
              <TabsTrigger value="collection" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Album
              </TabsTrigger>
              <TabsTrigger value="shop" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Negozio
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Collection Tab */}
          <TabsContent value="collection">
            <StickerCollection
              collection={collection}
              hasSticker={hasSticker}
              getStickerCount={getStickerCount}
            />
          </TabsContent>

          {/* Shop Tab */}
          <TabsContent value="shop">
            <PackOpener coins={coins} onOpenPack={handleOpenPack} />
          </TabsContent>
        </Tabs>

        {/* Debug/Reset Button */}
        <div className="fixed bottom-4 right-4">
          <Button
            onClick={resetCollection}
            variant="outline"
            size="sm"
            className="bg-white shadow-lg"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Album;
