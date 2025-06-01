
export interface Sticker {
  id: string;
  name: string;
  category: string;
  rarity: 'common' | 'rare' | 'legendary';
  image: string;
  description: string;
}

export interface UserCollection {
  [stickerId: string]: number; // sticker id -> quantity owned
}

export interface Pack {
  id: string;
  name: string;
  price: number;
  stickerCount: number;
}
