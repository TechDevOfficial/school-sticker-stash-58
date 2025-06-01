
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sticker, Pack } from '@/types/sticker';
import { PACKS } from '@/data/stickers';
import StickerCard from './StickerCard';
import { Coins, Package, ChevronLeft, ChevronRight } from 'lucide-react';

interface PackOpenerProps {
  coins: number;
  onOpenPack: (stickerCount: number, cost: number) => Sticker[] | null;
  hasSticker: (id: string) => boolean;
  getStickerCount: (id: string) => number;
}

const PackOpener = ({ coins, onOpenPack, hasSticker, getStickerCount }: PackOpenerProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isTearing, setIsTearing] = useState(false);
  const [openedStickers, setOpenedStickers] = useState<Sticker[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [currentStickerIndex, setCurrentStickerIndex] = useState(0);

  const handleOpenPack = async (pack: Pack) => {
    setSelectedPack(pack);
    setIsOpening(true);
    setCurrentStickerIndex(0);
    
    // Prima fase: animazione di selezione del pacchetto
    setTimeout(() => {
      setIsTearing(true);
    }, 1000);
    
    // Seconda fase: animazione di strappo
    setTimeout(() => {
      const stickers = onOpenPack(pack.stickerCount, pack.price);
      if (stickers) {
        setOpenedStickers(stickers);
        setShowResults(true);
      }
      setIsOpening(false);
      setIsTearing(false);
      setSelectedPack(null);
    }, 3500);
  };

  const closeResults = () => {
    setShowResults(false);
    setOpenedStickers([]);
    setCurrentStickerIndex(0);
  };

  const nextSticker = () => {
    if (currentStickerIndex < openedStickers.length - 1) {
      setCurrentStickerIndex(currentStickerIndex + 1);
    }
  };

  const prevSticker = () => {
    if (currentStickerIndex > 0) {
      setCurrentStickerIndex(currentStickerIndex - 1);
    }
  };

  const currentSticker = openedStickers[currentStickerIndex];
  const isDuplicate = currentSticker && getStickerCount(currentSticker.id) > 1;

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

      {/* Enhanced Pack Opening Animation */}
      {isOpening && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-center">
            {/* 3D Package */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              {/* Package Shadow */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black opacity-20 rounded-full blur-sm animate-pulse"></div>
              
              {/* Main Package */}
              <div className={`relative w-40 h-32 mx-auto transition-all duration-1000 ${
                isTearing ? 'animate-bounce' : 'animate-pulse'
              }`}>
                {/* Package Top */}
                <div className={`absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-amber-600 to-amber-700 transform-gpu transition-all duration-1000 ${
                  isTearing ? 'animate-[shake_0.5s_ease-in-out_infinite]' : ''
                }`} 
                style={{
                  clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                  transformStyle: 'preserve-3d'
                }}></div>
                
                {/* Package Front */}
                <div className={`absolute top-4 left-0 w-full h-28 bg-gradient-to-br from-amber-500 to-amber-600 border-2 border-amber-700 rounded-sm transition-all duration-1000 ${
                  isTearing ? 'animate-[tear_2s_ease-in-out]' : ''
                }`}>
                  {/* Package Label */}
                  <div className="absolute top-2 left-2 right-2 bg-white bg-opacity-90 rounded p-2">
                    <div className="text-xs font-bold text-amber-800">{selectedPack?.name}</div>
                    <div className="text-xs text-amber-600">{selectedPack?.stickerCount} figurine</div>
                  </div>
                  
                  {/* Tape Lines */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-amber-800 opacity-50"></div>
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-1 bg-amber-800 opacity-50"></div>
                </div>
                
                {/* Package Side */}
                <div className="absolute top-4 -right-2 w-6 h-28 bg-gradient-to-r from-amber-700 to-amber-800 transform skew-y-12 origin-bottom"></div>
                
                {/* Tearing Effect */}
                {isTearing && (
                  <>
                    {/* Torn pieces */}
                    <div className="absolute top-6 left-2 w-8 h-6 bg-amber-400 opacity-70 animate-[fly_1s_ease-out] transform rotate-45"></div>
                    <div className="absolute top-8 right-2 w-6 h-8 bg-amber-500 opacity-70 animate-[fly_1.2s_ease-out] transform -rotate-30"></div>
                    <div className="absolute top-12 left-4 w-4 h-10 bg-amber-600 opacity-70 animate-[fly_1.4s_ease-out] transform rotate-12"></div>
                    
                    {/* Sparkle effects */}
                    <div className="absolute top-6 left-6 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                    <div className="absolute top-10 right-8 w-1 h-1 bg-yellow-400 rounded-full animate-ping animation-delay-300"></div>
                    <div className="absolute top-14 left-8 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping animation-delay-500"></div>
                  </>
                )}
              </div>
            </div>
            
            <div className="text-white">
              {!isTearing ? (
                <p className="text-xl animate-pulse">Preparando il pacchetto...</p>
              ) : (
                <p className="text-xl animate-bounce">Strappando il pacchetto! 🎉</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results Dialog with Carousel */}
      <Dialog open={showResults} onOpenChange={closeResults}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Pacchetto aperto! 🎉
            </DialogTitle>
          </DialogHeader>
          
          {currentSticker && (
            <div className="space-y-6">
              {/* Sticker Navigation Info */}
              <div className="text-center">
                <p className="text-lg font-semibold">
                  Figurina {currentStickerIndex + 1} di {openedStickers.length}
                </p>
                {isDuplicate && (
                  <div className="mt-2 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                    <p className="text-yellow-800 font-bold">🔄 DOPPIONE!</p>
                    <p className="text-yellow-700 text-sm">
                      Hai già questa figurina (×{getStickerCount(currentSticker.id)})
                    </p>
                  </div>
                )}
              </div>

              {/* Sticker Display */}
              <div className="flex justify-center">
                <div className="animate-scale-in">
                  <StickerCard 
                    sticker={currentSticker} 
                    owned={true} 
                    size="large"
                    count={getStickerCount(currentSticker.id)}
                    showCount={true}
                  />
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center">
                <Button
                  onClick={prevSticker}
                  disabled={currentStickerIndex === 0}
                  variant="outline"
                  size="lg"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Precedente
                </Button>

                <div className="flex gap-2">
                  {openedStickers.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentStickerIndex 
                          ? 'bg-blue-500' 
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextSticker}
                  disabled={currentStickerIndex === openedStickers.length - 1}
                  variant="outline"
                  size="lg"
                >
                  Successiva
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
          
          <div className="text-center p-6 border-t">
            <Button onClick={closeResults} size="lg" className="px-8 py-3 text-lg">
              Aggiungi all'album ✨
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackOpener;
