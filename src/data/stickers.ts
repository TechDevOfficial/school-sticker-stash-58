
import { Sticker, Pack } from '@/types/sticker';

export const STICKERS: Sticker[] = [
  // Matematica
  { id: 'math-1', name: 'Pitagora', category: 'Matematica', rarity: 'legendary', image: 'photo-1582562124811-c09040d0a901', description: 'Il famoso matematico greco' },
  { id: 'math-2', name: 'Equazione Quadratica', category: 'Matematica', rarity: 'rare', image: 'photo-1618160702438-9b02ab6515c9', description: 'Formula matematica fondamentale' },
  { id: 'math-3', name: 'Frazione', category: 'Matematica', rarity: 'common', image: 'photo-1535268647677-300dbf3d78d1', description: 'Parte di un intero' },
  { id: 'math-4', name: 'Pi Greco', category: 'Matematica', rarity: 'rare', image: 'photo-1441057206919-63d19fac2369', description: 'Costante matematica' },
  
  // Scienze
  { id: 'sci-1', name: 'DNA', category: 'Scienze', rarity: 'legendary', image: 'photo-1501286353178-1ec881214838', description: 'Codice genetico della vita' },
  { id: 'sci-2', name: 'Atomo', category: 'Scienze', rarity: 'rare', image: 'photo-1582562124811-c09040d0a901', description: 'Unità base della materia' },
  { id: 'sci-3', name: 'Cellula', category: 'Scienze', rarity: 'common', image: 'photo-1618160702438-9b02ab6515c9', description: 'Unità base della vita' },
  { id: 'sci-4', name: 'Sistema Solare', category: 'Scienze', rarity: 'rare', image: 'photo-1535268647677-300dbf3d78d1', description: 'Il nostro sistema planetario' },
  
  // Storia
  { id: 'hist-1', name: 'Giulio Cesare', category: 'Storia', rarity: 'legendary', image: 'photo-1441057206919-63d19fac2369', description: 'Imperatore romano' },
  { id: 'hist-2', name: 'Colosseo', category: 'Storia', rarity: 'rare', image: 'photo-1501286353178-1ec881214838', description: 'Anfiteatro romano' },
  { id: 'hist-3', name: 'Piramide', category: 'Storia', rarity: 'common', image: 'photo-1582562124811-c09040d0a901', description: 'Monumento egizio' },
  { id: 'hist-4', name: 'Leonardo da Vinci', category: 'Storia', rarity: 'legendary', image: 'photo-1618160702438-9b02ab6515c9', description: 'Genio del Rinascimento' },
  
  // Geografia
  { id: 'geo-1', name: 'Monte Everest', category: 'Geografia', rarity: 'legendary', image: 'photo-1535268647677-300dbf3d78d1', description: 'La montagna più alta del mondo' },
  { id: 'geo-2', name: 'Oceano Pacifico', category: 'Geografia', rarity: 'rare', image: 'photo-1441057206919-63d19fac2369', description: 'Il più grande oceano' },
  { id: 'geo-3', name: 'Fiume Po', category: 'Geografia', rarity: 'common', image: 'photo-1501286353178-1ec881214838', description: 'Il fiume più lungo d\'Italia' },
  { id: 'geo-4', name: 'Vulcano', category: 'Geografia', rarity: 'rare', image: 'photo-1582562124811-c09040d0a901', description: 'Apertura nella crosta terrestre' },
  
  // Sport
  { id: 'sport-1', name: 'Calcio', category: 'Sport', rarity: 'common', image: 'photo-1618160702438-9b02ab6515c9', description: 'Lo sport più popolare' },
  { id: 'sport-2', name: 'Basket', category: 'Sport', rarity: 'common', image: 'photo-1535268647677-300dbf3d78d1', description: 'Sport con il canestro' },
  { id: 'sport-3', name: 'Tennis', category: 'Sport', rarity: 'rare', image: 'photo-1441057206919-63d19fac2369', description: 'Sport con racchetta' },
  { id: 'sport-4', name: 'Nuoto', category: 'Sport', rarity: 'rare', image: 'photo-1501286353178-1ec881214838', description: 'Sport acquatico' },
];

export const PACKS: Pack[] = [
  { id: 'basic', name: 'Pacchetto Base', price: 100, stickerCount: 5 },
  { id: 'premium', name: 'Pacchetto Premium', price: 250, stickerCount: 8 },
  { id: 'mega', name: 'Mega Pacchetto', price: 500, stickerCount: 15 },
];

export const CATEGORIES = ['Matematica', 'Scienze', 'Storia', 'Geografia', 'Sport'];
