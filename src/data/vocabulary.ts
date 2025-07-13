export interface FlashCard {
  czech: string;
  english: string;
  image: string;
  pronunciation?: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: 'rodina', name: 'Rodina', englishName: 'Family', icon: '👨‍👩‍👧‍👦', color: '#FF6B6B' },
  { id: 'jidlo', name: 'Jídlo', englishName: 'Food', icon: '🍎', color: '#4ECDC4' },
  { id: 'zvirata', name: 'Zvířata', englishName: 'Animals', icon: '🐕', color: '#45B7D1' },
  { id: 'barvy', name: 'Barvy', englishName: 'Colors', icon: '🌈', color: '#96CEB4' },
  { id: 'cisla', name: 'Čísla', englishName: 'Numbers', icon: '🔢', color: '#FFEAA7' },
  { id: 'telo', name: 'Tělo', englishName: 'Body', icon: '👤', color: '#DDA0DD' },
  { id: 'obleceni', name: 'Oblečení', englishName: 'Clothing', icon: '👕', color: '#98D8C8' },
  { id: 'dum', name: 'Dům', englishName: 'House', icon: '🏠', color: '#F7DC6F' },
  { id: 'doprava', name: 'Doprava', englishName: 'Transport', icon: '🚗', color: '#BB8FCE' },
  { id: 'pocasi', name: 'Počasí', englishName: 'Weather', icon: '☀️', color: '#85C1E9' },
  { id: 'prace', name: 'Práce', englishName: 'Work', icon: '💼', color: '#F8C471' },
  { id: 'cas', name: 'Čas', englishName: 'Time', icon: '⏰', color: '#82E0AA' }
];

export const vocabulary: FlashCard[] = [
  // Rodina (Family)
  { czech: 'matka', english: 'mother', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400', category: 'rodina' },
  { czech: 'otec', english: 'father', image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=400', category: 'rodina' },
  { czech: 'syn', english: 'son', image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400', category: 'rodina' },
  { czech: 'dcera', english: 'daughter', image: 'https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?w=400', category: 'rodina' },
  { czech: 'babička', english: 'grandmother', image: 'https://images.unsplash.com/photo-1521038199265-bc482db0f923?w=400', category: 'rodina' },
  { czech: 'dědeček', english: 'grandfather', image: 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=400', category: 'rodina' },
  { czech: 'bratr', english: 'brother', image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=400', category: 'rodina' },
  { czech: 'sestra', english: 'sister', image: 'https://images.unsplash.com/photo-1517677129300-07b130802f46?w=400', category: 'rodina' },
  { czech: 'manžel', english: 'husband', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', category: 'rodina' },
  { czech: 'manželka', english: 'wife', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', category: 'rodina' },

  // Jídlo (Food)
  { czech: 'chléb', english: 'bread', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', category: 'jidlo' },
  { czech: 'mléko', english: 'milk', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', category: 'jidlo' },
  { czech: 'vajíčko', english: 'egg', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400', category: 'jidlo' },
  { czech: 'maso', english: 'meat', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400', category: 'jidlo' },
  { czech: 'ryba', english: 'fish', image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400', category: 'jidlo' },
  { czech: 'jablko', english: 'apple', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', category: 'jidlo' },
  { czech: 'banán', english: 'banana', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400', category: 'jidlo' },
  { czech: 'brambor', english: 'potato', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400', category: 'jidlo' },
  { czech: 'mrkev', english: 'carrot', image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400', category: 'jidlo' },
  { czech: 'salát', english: 'lettuce', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400', category: 'jidlo' },

  // Zvířata (Animals)
  { czech: 'pes', english: 'dog', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400', category: 'zvirata' },
  { czech: 'kočka', english: 'cat', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', category: 'zvirata' },
  { czech: 'kůň', english: 'horse', image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400', category: 'zvirata' },
  { czech: 'kráva', english: 'cow', image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400', category: 'zvirata' },
  { czech: 'prase', english: 'pig', image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400', category: 'zvirata' },
  { czech: 'ovce', english: 'sheep', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', category: 'zvirata' },
  { czech: 'kuře', english: 'chicken', image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400', category: 'zvirata' },
  { czech: 'ryba', english: 'fish', image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400', category: 'zvirata' },
  { czech: 'pták', english: 'bird', image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400', category: 'zvirata' },
  { czech: 'myš', english: 'mouse', image: 'https://images.unsplash.com/photo-1605460375648-278bcbd579a6?w=400', category: 'zvirata' },

  // Barvy (Colors)
  { czech: 'červená', english: 'red', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', category: 'barvy' },
  { czech: 'modrá', english: 'blue', image: 'https://images.unsplash.com/photo-1464822759844-d150baec843a?w=400', category: 'barvy' },
  { czech: 'zelená', english: 'green', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', category: 'barvy' },
  { czech: 'žlutá', english: 'yellow', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', category: 'barvy' },
  { czech: 'černá', english: 'black', image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400', category: 'barvy' },
  { czech: 'bílá', english: 'white', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', category: 'barvy' },
  { czech: 'oranžová', english: 'orange', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400', category: 'barvy' },
  { czech: 'fialová', english: 'purple', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', category: 'barvy' },
  { czech: 'růžová', english: 'pink', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'barvy' },
  { czech: 'hnědá', english: 'brown', image: 'https://images.unsplash.com/photo-1440439297472-e32c2ea2b2af?w=400', category: 'barvy' },

  // Čísla (Numbers)
  { czech: 'jeden', english: 'one', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', category: 'cisla' },
  { czech: 'dva', english: 'two', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400', category: 'cisla' },
  { czech: 'tři', english: 'three', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'cisla' },
  { czech: 'čtyři', english: 'four', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', category: 'cisla' },
  { czech: 'pět', english: 'five', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400', category: 'cisla' },
  { czech: 'šest', english: 'six', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'cisla' },
  { czech: 'sedm', english: 'seven', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', category: 'cisla' },
  { czech: 'osm', english: 'eight', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400', category: 'cisla' },
  { czech: 'devět', english: 'nine', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'cisla' },
  { czech: 'deset', english: 'ten', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', category: 'cisla' }
];

export const getCardsByCategory = (categoryId: string): FlashCard[] => {
  return vocabulary.filter(card => card.category === categoryId);
};

export const getAllCards = (): FlashCard[] => {
  return vocabulary;
};

export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find(cat => cat.id === categoryId);
};
