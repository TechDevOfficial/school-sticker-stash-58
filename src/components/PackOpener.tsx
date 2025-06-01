
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sticker, Pack } from '@/types/sticker';
import { PACKS } from '@/data/stickers';
import StickerCard from './StickerCard';
import { Coins, Package } from 'lucide-react';

interface PackOpenerProps {
  coins: number;
  onOpenPack: (stickerCount: number, cost: number) => Sticker[] | null;
}

const PackOpener = ({ coins, onOpenPack }: PackOpenerProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [openedStickers, setOpenedStickers] = useState<Sticker[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleOpenPack = async (pack: Pack) => {
    setIsOpening(true);
    
    // Simulate pack opening animation
    setTimeout(() => {
      const stickers = onOpenPack(pack.stickerCount, pack.price);
      if (stickers) {
        setOpenedStickers(stickers);
        setShowResults(true);
      }
      setIsOpening(false);
    }, 2000);
  };

  const closeResults = () => {
    setShowResults(false);
    setOpenedStickers([]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Negozio Pacchetti</h2>
        <div className="flex items-center justify-center gap-2 text-lg">
          <Coins className="h-6 w-6 text-yellow-500" />
          <span className="font-bold">{coins} monete</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {PACKS.map((pack) => (
          <Card key={pack.id} className="p-6 text-center hover:shadow-lg transition-shadow">
            <Package className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-bold mb-2">{pack.name}</h3>
            <p className="text-gray-600 mb-4">{pack.stickerCount} figurine</p>
            <p className="text-2xl font-bold mb-4 text-green-600">{pack.price} 🪙</p>
            
            <Button 
              onClick={() => handleOpenPack(pack)}
              disabled={coins < pack.price || isOpening}
              className="w-full"
            >
              {coins < pack.price ? 'Monete insufficienti' : 'Acquista'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Pack Opening Animation */}
      {isOpening && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin text-6xl mb-4">📦</div>
            <p className="text-white text-xl">Aprendo il pacchetto...</p>
          </div>
        </div>
      )}

      {/* Results Dialog */}
      <Dialog open={showResults} onOpenChange={closeResults}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Pacchetto aperto! 🎉</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {openedStickers.map((sticker, index) => (
              <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <StickerCard sticker={sticker} owned={true} size="medium" />
              </div>
            ))}
          </div>
          
          <div className="text-center p-4">
            <Button onClick={closeResults} size="lg">
              Aggiungi all'album
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackOpener;
