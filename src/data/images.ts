export interface GameImage {
  id: string;
  name: string;
  category: CategoryId;
  emoji: string;
  accentColor: string;
  bgGradient: string;
  speechLabel: string;
}

export type CategoryId =
  | 'animals'
  | 'fruits'
  | 'vegetables'
  | 'food'
  | 'vehicles'
  | 'toys'
  | 'household'
  | 'school'
  | 'nature'
  | 'sports'
  | 'clothing'
  | 'birds'
  | 'sea_animals';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'animals', name: 'Animals', icon: '🐶', color: '#f59e0b' },
  { id: 'fruits', name: 'Fruits', icon: '🍎', color: '#ef4444' },
  { id: 'vegetables', name: 'Vegetables', icon: '🥕', color: '#10b981' },
  { id: 'food', name: 'Food', icon: '🍕', color: '#f97316' },
  { id: 'vehicles', name: 'Vehicles', icon: '🚗', color: '#3b82f6' },
  { id: 'toys', name: 'Toys', icon: '🧸', color: '#ec4899' },
  { id: 'household', name: 'Household Objects', icon: '🛋️', color: '#8b5cf6' },
  { id: 'school', name: 'School Objects', icon: '🎒', color: '#06b6d4' },
  { id: 'nature', name: 'Nature', icon: '🌈', color: '#14b8a6' },
  { id: 'sports', name: 'Sports', icon: '⚽', color: '#6366f1' },
  { id: 'clothing', name: 'Clothing', icon: '🧢', color: '#d946ef' },
  { id: 'birds', name: 'Birds', icon: '🦉', color: '#84cc16' },
  { id: 'sea_animals', name: 'Sea Animals', icon: '🐬', color: '#0284c7' },
];

export const GAME_IMAGES: GameImage[] = [
  // Animals (24)
  { id: 'dog', name: 'Dog', category: 'animals', emoji: '🐶', accentColor: '#ea580c', bgGradient: 'from-amber-100 to-orange-100', speechLabel: 'Dog' },
  { id: 'cat', name: 'Cat', category: 'animals', emoji: '🐱', accentColor: '#f97316', bgGradient: 'from-orange-100 to-amber-100', speechLabel: 'Cat' },
  { id: 'elephant', name: 'Elephant', category: 'animals', emoji: '🐘', accentColor: '#64748b', bgGradient: 'from-slate-100 to-gray-200', speechLabel: 'Elephant' },
  { id: 'lion', name: 'Lion', category: 'animals', emoji: '🦁', accentColor: '#eab308', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'Lion' },
  { id: 'tiger', name: 'Tiger', category: 'animals', emoji: '🐯', accentColor: '#f97316', bgGradient: 'from-orange-100 to-yellow-100', speechLabel: 'Tiger' },
  { id: 'monkey', name: 'Monkey', category: 'animals', emoji: '🐵', accentColor: '#92400e', bgGradient: 'from-amber-100 to-stone-200', speechLabel: 'Monkey' },
  { id: 'rabbit', name: 'Rabbit', category: 'animals', emoji: '🐰', accentColor: '#ec4899', bgGradient: 'from-pink-100 to-rose-100', speechLabel: 'Rabbit' },
  { id: 'horse', name: 'Horse', category: 'animals', emoji: '🐴', accentColor: '#78350f', bgGradient: 'from-amber-100 to-yellow-100', speechLabel: 'Horse' },
  { id: 'cow', name: 'Cow', category: 'animals', emoji: '🐮', accentColor: '#0f172a', bgGradient: 'from-stone-100 to-gray-200', speechLabel: 'Cow' },
  { id: 'giraffe', name: 'Giraffe', category: 'animals', emoji: '🦒', accentColor: '#d97706', bgGradient: 'from-amber-100 to-yellow-200', speechLabel: 'Giraffe' },
  { id: 'panda', name: 'Panda', category: 'animals', emoji: '🐼', accentColor: '#1e293b', bgGradient: 'from-emerald-50 to-slate-200', speechLabel: 'Panda' },
  { id: 'bear', name: 'Bear', category: 'animals', emoji: '🐻', accentColor: '#713f12', bgGradient: 'from-amber-100 to-stone-200', speechLabel: 'Bear' },
  { id: 'sheep', name: 'Sheep', category: 'animals', emoji: '🐑', accentColor: '#0f172a', bgGradient: 'from-slate-50 to-amber-100', speechLabel: 'Sheep' },
  { id: 'pig', name: 'Pig', category: 'animals', emoji: '🐷', accentColor: '#ec4899', bgGradient: 'from-pink-100 to-rose-200', speechLabel: 'Pig' },
  { id: 'koala', name: 'Koala', category: 'animals', emoji: '🐨', accentColor: '#64748b', bgGradient: 'from-slate-100 to-teal-100', speechLabel: 'Koala' },
  { id: 'fox', name: 'Fox', category: 'animals', emoji: '🦊', accentColor: '#ea580c', bgGradient: 'from-orange-100 to-amber-200', speechLabel: 'Fox' },
  { id: 'zebra', name: 'Zebra', category: 'animals', emoji: '🦓', accentColor: '#0f172a', bgGradient: 'from-gray-100 to-slate-200', speechLabel: 'Zebra' },
  { id: 'deer', name: 'Deer', category: 'animals', emoji: '🦌', accentColor: '#854d0e', bgGradient: 'from-amber-100 to-stone-200', speechLabel: 'Deer' },
  { id: 'kangaroo', name: 'Kangaroo', category: 'animals', emoji: '🦘', accentColor: '#b45309', bgGradient: 'from-amber-100 to-yellow-200', speechLabel: 'Kangaroo' },
  { id: 'hippo', name: 'Hippo', category: 'animals', emoji: '🦛', accentColor: '#475569', bgGradient: 'from-slate-100 to-indigo-100', speechLabel: 'Hippo' },
  { id: 'rhino', name: 'Rhino', category: 'animals', emoji: '🦏', accentColor: '#52525b', bgGradient: 'from-zinc-100 to-slate-200', speechLabel: 'Rhino' },
  { id: 'camel', name: 'Camel', category: 'animals', emoji: '🐫', accentColor: '#ca8a04', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'Camel' },
  { id: 'goat', name: 'Goat', category: 'animals', emoji: '🐐', accentColor: '#78350f', bgGradient: 'from-stone-100 to-amber-100', speechLabel: 'Goat' },
  { id: 'hedgehog', name: 'Hedgehog', category: 'animals', emoji: '🦔', accentColor: '#92400e', bgGradient: 'from-amber-100 to-orange-100', speechLabel: 'Hedgehog' },

  // Fruits (18)
  { id: 'apple', name: 'Apple', category: 'fruits', emoji: '🍎', accentColor: '#dc2626', bgGradient: 'from-red-100 to-rose-200', speechLabel: 'Apple' },
  { id: 'banana', name: 'Banana', category: 'fruits', emoji: '🍌', accentColor: '#eab308', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'Banana' },
  { id: 'orange', name: 'Orange', category: 'fruits', emoji: '🍊', accentColor: '#ea580c', bgGradient: 'from-orange-100 to-amber-200', speechLabel: 'Orange' },
  { id: 'mango', name: 'Mango', category: 'fruits', emoji: '🥭', accentColor: '#f59e0b', bgGradient: 'from-amber-100 to-yellow-200', speechLabel: 'Mango' },
  { id: 'watermelon', name: 'Watermelon', category: 'fruits', emoji: '🍉', accentColor: '#16a34a', bgGradient: 'from-emerald-100 to-rose-200', speechLabel: 'Watermelon' },
  { id: 'grapes', name: 'Grapes', category: 'fruits', emoji: '🍇', accentColor: '#9333ea', bgGradient: 'from-purple-100 to-fuchsia-200', speechLabel: 'Grapes' },
  { id: 'strawberry', name: 'Strawberry', category: 'fruits', emoji: '🍓', accentColor: '#e11d48', bgGradient: 'from-rose-100 to-red-200', speechLabel: 'Strawberry' },
  { id: 'pineapple', name: 'Pineapple', category: 'fruits', emoji: '🍍', accentColor: '#d97706', bgGradient: 'from-yellow-100 to-lime-100', speechLabel: 'Pineapple' },
  { id: 'cherry', name: 'Cherry', category: 'fruits', emoji: '🍒', accentColor: '#be123c', bgGradient: 'from-rose-100 to-pink-200', speechLabel: 'Cherry' },
  { id: 'peach', name: 'Peach', category: 'fruits', emoji: '🍑', accentColor: '#f97316', bgGradient: 'from-orange-100 to-pink-100', speechLabel: 'Peach' },
  { id: 'lemon', name: 'Lemon', category: 'fruits', emoji: '🍋', accentColor: '#eab308', bgGradient: 'from-yellow-100 to-lime-100', speechLabel: 'Lemon' },
  { id: 'pear', name: 'Pear', category: 'fruits', emoji: '🍐', accentColor: '#84cc16', bgGradient: 'from-lime-100 to-emerald-100', speechLabel: 'Pear' },
  { id: 'kiwi', name: 'Kiwi', category: 'fruits', emoji: '🥝', accentColor: '#65a30d', bgGradient: 'from-green-100 to-amber-100', speechLabel: 'Kiwi' },
  { id: 'coconut', name: 'Coconut', category: 'fruits', emoji: '🥥', accentColor: '#78350f', bgGradient: 'from-amber-100 to-stone-200', speechLabel: 'Coconut' },
  { id: 'blueberries', name: 'Blueberries', category: 'fruits', emoji: '🫐', accentColor: '#3b82f6', bgGradient: 'from-blue-100 to-indigo-200', speechLabel: 'Blueberries' },
  { id: 'avocado', name: 'Avocado', category: 'fruits', emoji: '🥑', accentColor: '#15803d', bgGradient: 'from-emerald-100 to-yellow-100', speechLabel: 'Avocado' },
  { id: 'melon', name: 'Melon', category: 'fruits', emoji: '🍈', accentColor: '#22c55e', bgGradient: 'from-lime-100 to-green-200', speechLabel: 'Melon' },
  { id: 'olive', name: 'Olive', category: 'fruits', emoji: '🫒', accentColor: '#4d7c0f', bgGradient: 'from-lime-100 to-teal-100', speechLabel: 'Olive' },

  // Vegetables (14)
  { id: 'carrot', name: 'Carrot', category: 'vegetables', emoji: '🥕', accentColor: '#ea580c', bgGradient: 'from-orange-100 to-amber-200', speechLabel: 'Carrot' },
  { id: 'broccoli', name: 'Broccoli', category: 'vegetables', emoji: '🥦', accentColor: '#15803d', bgGradient: 'from-emerald-100 to-green-200', speechLabel: 'Broccoli' },
  { id: 'corn', name: 'Corn', category: 'vegetables', emoji: '🌽', accentColor: '#ca8a04', bgGradient: 'from-yellow-100 to-lime-100', speechLabel: 'Corn' },
  { id: 'tomato', name: 'Tomato', category: 'vegetables', emoji: '🍅', accentColor: '#dc2626', bgGradient: 'from-red-100 to-rose-200', speechLabel: 'Tomato' },
  { id: 'potato', name: 'Potato', category: 'vegetables', emoji: '🥔', accentColor: '#854d0e', bgGradient: 'from-stone-100 to-amber-100', speechLabel: 'Potato' },
  { id: 'eggplant', name: 'Eggplant', category: 'vegetables', emoji: '🍆', accentColor: '#7e22ce', bgGradient: 'from-purple-100 to-fuchsia-200', speechLabel: 'Eggplant' },
  { id: 'onion', name: 'Onion', category: 'vegetables', emoji: '🧅', accentColor: '#9a3412', bgGradient: 'from-amber-100 to-stone-200', speechLabel: 'Onion' },
  { id: 'garlic', name: 'Garlic', category: 'vegetables', emoji: '🧄', accentColor: '#713f12', bgGradient: 'from-slate-100 to-amber-50', speechLabel: 'Garlic' },
  { id: 'cucumber', name: 'Cucumber', category: 'vegetables', emoji: '🥒', accentColor: '#16a34a', bgGradient: 'from-emerald-100 to-teal-100', speechLabel: 'Cucumber' },
  { id: 'bell_pepper', name: 'Bell Pepper', category: 'vegetables', emoji: '🫑', accentColor: '#15803d', bgGradient: 'from-green-100 to-emerald-200', speechLabel: 'Bell Pepper' },
  { id: 'mushroom', name: 'Mushroom', category: 'vegetables', emoji: '🍄', accentColor: '#dc2626', bgGradient: 'from-rose-100 to-red-100', speechLabel: 'Mushroom' },
  { id: 'pea_pod', name: 'Peas', category: 'vegetables', emoji: '🫛', accentColor: '#65a30d', bgGradient: 'from-lime-100 to-emerald-100', speechLabel: 'Peas' },
  { id: 'hot_pepper', name: 'Chili Pepper', category: 'vegetables', emoji: '🌶️', accentColor: '#b91c1c', bgGradient: 'from-red-100 to-orange-200', speechLabel: 'Chili Pepper' },
  { id: 'sweet_potato', name: 'Sweet Potato', category: 'vegetables', emoji: '🍠', accentColor: '#c2410c', bgGradient: 'from-amber-100 to-rose-100', speechLabel: 'Sweet Potato' },

  // Food (17)
  { id: 'pizza', name: 'Pizza', category: 'food', emoji: '🍕', accentColor: '#d97706', bgGradient: 'from-amber-100 to-orange-200', speechLabel: 'Pizza' },
  { id: 'burger', name: 'Burger', category: 'food', emoji: '🍔', accentColor: '#b45309', bgGradient: 'from-yellow-100 to-stone-200', speechLabel: 'Burger' },
  { id: 'ice_cream', name: 'Ice Cream', category: 'food', emoji: '🍦', accentColor: '#ec4899', bgGradient: 'from-pink-100 to-cyan-100', speechLabel: 'Ice Cream' },
  { id: 'cookie', name: 'Cookie', category: 'food', emoji: '🍪', accentColor: '#92400e', bgGradient: 'from-amber-100 to-stone-200', speechLabel: 'Cookie' },
  { id: 'donut', name: 'Donut', category: 'food', emoji: '🍩', accentColor: '#db2777', bgGradient: 'from-pink-100 to-purple-100', speechLabel: 'Donut' },
  { id: 'popcorn', name: 'Popcorn', category: 'food', emoji: '🍿', accentColor: '#eab308', bgGradient: 'from-red-50 to-yellow-100', speechLabel: 'Popcorn' },
  { id: 'cupcake', name: 'Cupcake', category: 'food', emoji: '🧁', accentColor: '#a855f7', bgGradient: 'from-purple-100 to-pink-100', speechLabel: 'Cupcake' },
  { id: 'pancake', name: 'Pancakes', category: 'food', emoji: '🥞', accentColor: '#d97706', bgGradient: 'from-amber-100 to-yellow-200', speechLabel: 'Pancakes' },
  { id: 'waffle', name: 'Waffle', category: 'food', emoji: '🧇', accentColor: '#b45309', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'Waffle' },
  { id: 'taco', name: 'Taco', category: 'food', emoji: '🌮', accentColor: '#ea580c', bgGradient: 'from-yellow-100 to-orange-200', speechLabel: 'Taco' },
  { id: 'sandwich', name: 'Sandwich', category: 'food', emoji: '🥪', accentColor: '#15803d', bgGradient: 'from-amber-100 to-emerald-100', speechLabel: 'Sandwich' },
  { id: 'french_fries', name: 'French Fries', category: 'food', emoji: '🍟', accentColor: '#dc2626', bgGradient: 'from-red-100 to-yellow-100', speechLabel: 'French Fries' },
  { id: 'hot_dog', name: 'Hot Dog', category: 'food', emoji: '🌭', accentColor: '#c2410c', bgGradient: 'from-amber-100 to-rose-100', speechLabel: 'Hot Dog' },
  { id: 'pretzel', name: 'Pretzel', category: 'food', emoji: '🥨', accentColor: '#78350f', bgGradient: 'from-amber-100 to-stone-200', speechLabel: 'Pretzel' },
  { id: 'croissant', name: 'Croissant', category: 'food', emoji: '🥐', accentColor: '#d97706', bgGradient: 'from-amber-100 to-yellow-100', speechLabel: 'Croissant' },
  { id: 'sushi', name: 'Sushi', category: 'food', emoji: '🍣', accentColor: '#e11d48', bgGradient: 'from-rose-100 to-emerald-100', speechLabel: 'Sushi' },
  { id: 'lollipop', name: 'Lollipop', category: 'food', emoji: '🍭', accentColor: '#db2777', bgGradient: 'from-pink-100 to-cyan-100', speechLabel: 'Lollipop' },

  // Vehicles (18)
  { id: 'car', name: 'Car', category: 'vehicles', emoji: '🚗', accentColor: '#dc2626', bgGradient: 'from-red-100 to-rose-200', speechLabel: 'Car' },
  { id: 'bus', name: 'Bus', category: 'vehicles', emoji: '🚌', accentColor: '#eab308', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'Bus' },
  { id: 'train', name: 'Train', category: 'vehicles', emoji: '🚂', accentColor: '#475569', bgGradient: 'from-slate-100 to-zinc-200', speechLabel: 'Train' },
  { id: 'bicycle', name: 'Bicycle', category: 'vehicles', emoji: '🚲', accentColor: '#0284c7', bgGradient: 'from-sky-100 to-blue-200', speechLabel: 'Bicycle' },
  { id: 'airplane', name: 'Airplane', category: 'vehicles', emoji: '✈️', accentColor: '#2563eb', bgGradient: 'from-blue-100 to-sky-200', speechLabel: 'Airplane' },
  { id: 'boat', name: 'Boat', category: 'vehicles', emoji: '⛵', accentColor: '#0ea5e9', bgGradient: 'from-cyan-100 to-blue-200', speechLabel: 'Boat' },
  { id: 'rocket', name: 'Rocket', category: 'vehicles', emoji: '🚀', accentColor: '#ef4444', bgGradient: 'from-violet-100 to-rose-200', speechLabel: 'Rocket' },
  { id: 'fire_truck', name: 'Fire Truck', category: 'vehicles', emoji: '🚒', accentColor: '#b91c1c', bgGradient: 'from-red-100 to-orange-200', speechLabel: 'Fire Truck' },
  { id: 'helicopter', name: 'Helicopter', category: 'vehicles', emoji: '🚁', accentColor: '#059669', bgGradient: 'from-emerald-100 to-teal-200', speechLabel: 'Helicopter' },
  { id: 'police_car', name: 'Police Car', category: 'vehicles', emoji: '🚓', accentColor: '#1d4ed8', bgGradient: 'from-blue-100 to-indigo-200', speechLabel: 'Police Car' },
  { id: 'tractor', name: 'Tractor', category: 'vehicles', emoji: '🚜', accentColor: '#16a34a', bgGradient: 'from-green-100 to-lime-200', speechLabel: 'Tractor' },
  { id: 'scooter', name: 'Scooter', category: 'vehicles', emoji: '🛴', accentColor: '#0284c7', bgGradient: 'from-sky-100 to-cyan-100', speechLabel: 'Scooter' },
  { id: 'submarine', name: 'Submarine', category: 'vehicles', emoji: '🚢', accentColor: '#0369a1', bgGradient: 'from-blue-100 to-teal-200', speechLabel: 'Submarine' },
  { id: 'ambulance', name: 'Ambulance', category: 'vehicles', emoji: '🚑', accentColor: '#dc2626', bgGradient: 'from-red-100 to-slate-100', speechLabel: 'Ambulance' },
  { id: 'taxi', name: 'Taxi', category: 'vehicles', emoji: '🚕', accentColor: '#ca8a04', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'Taxi' },
  { id: 'speedboat', name: 'Speedboat', category: 'vehicles', emoji: '🚤', accentColor: '#0ea5e9', bgGradient: 'from-sky-100 to-blue-200', speechLabel: 'Speedboat' },
  { id: 'motorcycle', name: 'Motorcycle', category: 'vehicles', emoji: '🏍️', accentColor: '#ea580c', bgGradient: 'from-orange-100 to-red-200', speechLabel: 'Motorcycle' },
  { id: 'cable_car', name: 'Cable Car', category: 'vehicles', emoji: '🚡', accentColor: '#7c3aed', bgGradient: 'from-purple-100 to-indigo-100', speechLabel: 'Cable Car' },

  // Toys (15)
  { id: 'teddy_bear', name: 'Teddy Bear', category: 'toys', emoji: '🧸', accentColor: '#9a3412', bgGradient: 'from-amber-100 to-rose-100', speechLabel: 'Teddy Bear' },
  { id: 'yo_yo', name: 'Yo-Yo', category: 'toys', emoji: '🪀', accentColor: '#059669', bgGradient: 'from-emerald-100 to-teal-100', speechLabel: 'Yo-Yo' },
  { id: 'robot', name: 'Robot', category: 'toys', emoji: '🤖', accentColor: '#0284c7', bgGradient: 'from-sky-100 to-slate-200', speechLabel: 'Robot' },
  { id: 'kite', name: 'Kite', category: 'toys', emoji: '🪁', accentColor: '#7c3aed', bgGradient: 'from-purple-100 to-pink-100', speechLabel: 'Kite' },
  { id: 'puzzle', name: 'Puzzle', category: 'toys', emoji: '🧩', accentColor: '#0891b2', bgGradient: 'from-cyan-100 to-teal-100', speechLabel: 'Puzzle' },
  { id: 'balloon', name: 'Balloon', category: 'toys', emoji: '🎈', accentColor: '#ef4444', bgGradient: 'from-rose-100 to-red-200', speechLabel: 'Balloon' },
  { id: 'toy_drum', name: 'Drum', category: 'toys', emoji: '🥁', accentColor: '#d97706', bgGradient: 'from-amber-100 to-yellow-200', speechLabel: 'Drum' },
  { id: 'magic_wand', name: 'Magic Wand', category: 'toys', emoji: '🪄', accentColor: '#a855f7', bgGradient: 'from-purple-100 to-pink-200', speechLabel: 'Magic Wand' },
  { id: 'pinwheel', name: 'Pinwheel', category: 'toys', emoji: '🎏', accentColor: '#06b6d4', bgGradient: 'from-cyan-100 to-sky-200', speechLabel: 'Pinwheel' },
  { id: 'water_pistol', name: 'Water Squirt', category: 'toys', emoji: '🔫', accentColor: '#22c55e', bgGradient: 'from-emerald-100 to-teal-100', speechLabel: 'Water Squirt' },
  { id: 'video_game', name: 'Game Controller', category: 'toys', emoji: '🎮', accentColor: '#4f46e5', bgGradient: 'from-indigo-100 to-purple-200', speechLabel: 'Game Controller' },
  { id: 'dice', name: 'Dice', category: 'toys', emoji: '🎲', accentColor: '#dc2626', bgGradient: 'from-red-50 to-slate-200', speechLabel: 'Dice' },
  { id: 'toy_clown', name: 'Clown Toy', category: 'toys', emoji: '🤡', accentColor: '#f97316', bgGradient: 'from-yellow-100 to-pink-100', speechLabel: 'Clown Toy' },
  { id: 'race_car', name: 'Racing Car', category: 'toys', emoji: '🏎️', accentColor: '#dc2626', bgGradient: 'from-red-100 to-amber-100', speechLabel: 'Racing Car' },
  { id: 'toy_castle', name: 'Toy Castle', category: 'toys', emoji: '🏰', accentColor: '#7e22ce', bgGradient: 'from-purple-100 to-indigo-100', speechLabel: 'Toy Castle' },

  // Household Objects (16)
  { id: 'chair', name: 'Chair', category: 'household', emoji: '🪑', accentColor: '#92400e', bgGradient: 'from-amber-100 to-stone-200', speechLabel: 'Chair' },
  { id: 'clock', name: 'Clock', category: 'household', emoji: '⏰', accentColor: '#dc2626', bgGradient: 'from-red-100 to-rose-100', speechLabel: 'Clock' },
  { id: 'lamp', name: 'Lamp', category: 'household', emoji: '🛋️', accentColor: '#ca8a04', bgGradient: 'from-yellow-100 to-amber-100', speechLabel: 'Lamp' },
  { id: 'cup', name: 'Cup', category: 'household', emoji: '☕', accentColor: '#4f46e5', bgGradient: 'from-indigo-100 to-sky-100', speechLabel: 'Cup' },
  { id: 'umbrella', name: 'Umbrella', category: 'household', emoji: '☂️', accentColor: '#7c3aed', bgGradient: 'from-purple-100 to-indigo-100', speechLabel: 'Umbrella' },
  { id: 'key', name: 'Key', category: 'household', emoji: '🔑', accentColor: '#eab308', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'Key' },
  { id: 'bed', name: 'Bed', category: 'household', emoji: '🛏️', accentColor: '#0891b2', bgGradient: 'from-sky-100 to-cyan-200', speechLabel: 'Bed' },
  { id: 'telephone', name: 'Telephone', category: 'household', emoji: '☎️', accentColor: '#b91c1c', bgGradient: 'from-red-100 to-amber-100', speechLabel: 'Telephone' },
  { id: 'mirror', name: 'Mirror', category: 'household', emoji: '🪞', accentColor: '#0ea5e9', bgGradient: 'from-sky-100 to-slate-100', speechLabel: 'Mirror' },
  { id: 'flashlight', name: 'Flashlight', category: 'household', emoji: '🔦', accentColor: '#ca8a04', bgGradient: 'from-yellow-100 to-zinc-200', speechLabel: 'Flashlight' },
  { id: 'bucket', name: 'Bucket', category: 'household', emoji: '🪣', accentColor: '#2563eb', bgGradient: 'from-blue-100 to-cyan-100', speechLabel: 'Bucket' },
  { id: 'candle', name: 'Candle', category: 'household', emoji: '🕯️', accentColor: '#ea580c', bgGradient: 'from-amber-100 to-yellow-100', speechLabel: 'Candle' },
  { id: 'spoon', name: 'Spoon', category: 'household', emoji: '🥄', accentColor: '#64748b', bgGradient: 'from-slate-100 to-zinc-200', speechLabel: 'Spoon' },
  { id: 'fork', name: 'Fork', category: 'household', emoji: '🍴', accentColor: '#475569', bgGradient: 'from-slate-100 to-gray-200', speechLabel: 'Fork' },
  { id: 'teapot', name: 'Teapot', category: 'household', emoji: '🫖', accentColor: '#059669', bgGradient: 'from-emerald-100 to-teal-100', speechLabel: 'Teapot' },
  { id: 'television', name: 'Television', category: 'household', emoji: '📺', accentColor: '#1e293b', bgGradient: 'from-slate-100 to-indigo-100', speechLabel: 'Television' },

  // School Objects (13)
  { id: 'backpack', name: 'Backpack', category: 'school', emoji: '🎒', accentColor: '#2563eb', bgGradient: 'from-blue-100 to-indigo-200', speechLabel: 'Backpack' },
  { id: 'pencil', name: 'Pencil', category: 'school', emoji: '✏️', accentColor: '#eab308', bgGradient: 'from-yellow-100 to-amber-100', speechLabel: 'Pencil' },
  { id: 'book', name: 'Book', category: 'school', emoji: '📚', accentColor: '#059669', bgGradient: 'from-emerald-100 to-teal-100', speechLabel: 'Book' },
  { id: 'scissors', name: 'Scissors', category: 'school', emoji: '✂️', accentColor: '#dc2626', bgGradient: 'from-red-100 to-slate-200', speechLabel: 'Scissors' },
  { id: 'ruler', name: 'Ruler', category: 'school', emoji: '📏', accentColor: '#ca8a04', bgGradient: 'from-yellow-100 to-amber-100', speechLabel: 'Ruler' },
  { id: 'paint_palette', name: 'Paint Palette', category: 'school', emoji: '🎨', accentColor: '#d946ef', bgGradient: 'from-fuchsia-100 to-rose-100', speechLabel: 'Paint Palette' },
  { id: 'globe', name: 'Globe', category: 'school', emoji: '🌐', accentColor: '#0284c7', bgGradient: 'from-sky-100 to-emerald-100', speechLabel: 'Globe' },
  { id: 'magnifying_glass', name: 'Magnifier', category: 'school', emoji: '🔍', accentColor: '#475569', bgGradient: 'from-slate-100 to-sky-100', speechLabel: 'Magnifier' },
  { id: 'crayon', name: 'Crayon', category: 'school', emoji: '🖍️', accentColor: '#e11d48', bgGradient: 'from-rose-100 to-amber-100', speechLabel: 'Crayon' },
  { id: 'paperclip', name: 'Paperclip', category: 'school', emoji: '📎', accentColor: '#64748b', bgGradient: 'from-slate-100 to-zinc-200', speechLabel: 'Paperclip' },
  { id: 'calculator', name: 'Calculator', category: 'school', emoji: '🧮', accentColor: '#b45309', bgGradient: 'from-amber-100 to-stone-200', speechLabel: 'Calculator' },
  { id: 'graduation_cap', name: 'Graduation Cap', category: 'school', emoji: '🎓', accentColor: '#1e293b', bgGradient: 'from-slate-100 to-indigo-100', speechLabel: 'Graduation Cap' },
  { id: 'school_bell', name: 'School Bell', category: 'school', emoji: '🔔', accentColor: '#eab308', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'School Bell' },

  // Nature (15)
  { id: 'sun', name: 'Sun', category: 'nature', emoji: '☀️', accentColor: '#f59e0b', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'Sun' },
  { id: 'rainbow', name: 'Rainbow', category: 'nature', emoji: '🌈', accentColor: '#ec4899', bgGradient: 'from-rose-100 to-sky-200', speechLabel: 'Rainbow' },
  { id: 'flower', name: 'Flower', category: 'nature', emoji: '🌸', accentColor: '#db2777', bgGradient: 'from-pink-100 to-rose-200', speechLabel: 'Flower' },
  { id: 'tree', name: 'Tree', category: 'nature', emoji: '🌳', accentColor: '#16a34a', bgGradient: 'from-emerald-100 to-green-200', speechLabel: 'Tree' },
  { id: 'star', name: 'Star', category: 'nature', emoji: '⭐', accentColor: '#eab308', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'Star' },
  { id: 'cloud', name: 'Cloud', category: 'nature', emoji: '☁️', accentColor: '#0284c7', bgGradient: 'from-sky-100 to-slate-100', speechLabel: 'Cloud' },
  { id: 'moon', name: 'Moon', category: 'nature', emoji: '🌙', accentColor: '#d97706', bgGradient: 'from-indigo-100 to-amber-100', speechLabel: 'Moon' },
  { id: 'snowflake', name: 'Snowflake', category: 'nature', emoji: '❄️', accentColor: '#0284c7', bgGradient: 'from-sky-100 to-cyan-100', speechLabel: 'Snowflake' },
  { id: 'campfire', name: 'Campfire', category: 'nature', emoji: '🔥', accentColor: '#ea580c', bgGradient: 'from-orange-100 to-red-200', speechLabel: 'Campfire' },
  { id: 'mountain', name: 'Mountain', category: 'nature', emoji: '🏔️', accentColor: '#475569', bgGradient: 'from-slate-100 to-blue-100', speechLabel: 'Mountain' },
  { id: 'leaf', name: 'Autumn Leaf', category: 'nature', emoji: '🍃', accentColor: '#16a34a', bgGradient: 'from-green-100 to-lime-100', speechLabel: 'Autumn Leaf' },
  { id: 'volcano', name: 'Volcano', category: 'nature', emoji: '🌋', accentColor: '#dc2626', bgGradient: 'from-red-100 to-orange-200', speechLabel: 'Volcano' },
  { id: 'ocean_wave', name: 'Ocean Wave', category: 'nature', emoji: '🌊', accentColor: '#0284c7', bgGradient: 'from-cyan-100 to-blue-200', speechLabel: 'Ocean Wave' },
  { id: 'cactus', name: 'Cactus', category: 'nature', emoji: '🌵', accentColor: '#15803d', bgGradient: 'from-emerald-100 to-yellow-100', speechLabel: 'Cactus' },
  { id: 'sunflower', name: 'Sunflower', category: 'nature', emoji: '🌻', accentColor: '#ca8a04', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'Sunflower' },

  // Sports (13)
  { id: 'soccer_ball', name: 'Soccer Ball', category: 'sports', emoji: '⚽', accentColor: '#0f172a', bgGradient: 'from-slate-100 to-gray-200', speechLabel: 'Soccer Ball' },
  { id: 'basketball', name: 'Basketball', category: 'sports', emoji: '🏀', accentColor: '#ea580c', bgGradient: 'from-orange-100 to-amber-200', speechLabel: 'Basketball' },
  { id: 'tennis_ball', name: 'Tennis Ball', category: 'sports', emoji: '🎾', accentColor: '#65a30d', bgGradient: 'from-lime-100 to-emerald-100', speechLabel: 'Tennis Ball' },
  { id: 'baseball', name: 'Baseball', category: 'sports', emoji: '⚾', accentColor: '#dc2626', bgGradient: 'from-red-50 to-stone-200', speechLabel: 'Baseball' },
  { id: 'skateboard', name: 'Skateboard', category: 'sports', emoji: '🛹', accentColor: '#0284c7', bgGradient: 'from-sky-100 to-indigo-100', speechLabel: 'Skateboard' },
  { id: 'bowling', name: 'Bowling', category: 'sports', emoji: '🎳', accentColor: '#b91c1c', bgGradient: 'from-red-100 to-stone-200', speechLabel: 'Bowling' },
  { id: 'trophy', name: 'Trophy', category: 'sports', emoji: '🏆', accentColor: '#eab308', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'Trophy' },
  { id: 'gold_medal', name: 'Medal', category: 'sports', emoji: '🥇', accentColor: '#ca8a04', bgGradient: 'from-yellow-100 to-amber-100', speechLabel: 'Medal' },
  { id: 'volleyball', name: 'Volleyball', category: 'sports', emoji: '🏐', accentColor: '#f97316', bgGradient: 'from-yellow-100 to-orange-100', speechLabel: 'Volleyball' },
  { id: 'boxing_glove', name: 'Boxing Glove', category: 'sports', emoji: '🥊', accentColor: '#dc2626', bgGradient: 'from-red-100 to-rose-200', speechLabel: 'Boxing Glove' },
  { id: 'roller_skate', name: 'Roller Skate', category: 'sports', emoji: '🛼', accentColor: '#06b6d4', bgGradient: 'from-pink-100 to-cyan-100', speechLabel: 'Roller Skate' },
  { id: 'badminton', name: 'Shuttlecock', category: 'sports', emoji: '🏸', accentColor: '#2563eb', bgGradient: 'from-sky-100 to-blue-100', speechLabel: 'Shuttlecock' },
  { id: 'ice_skate', name: 'Ice Skate', category: 'sports', emoji: '⛸️', accentColor: '#0284c7', bgGradient: 'from-sky-100 to-slate-200', speechLabel: 'Ice Skate' },

  // Clothing (13)
  { id: 'hat', name: 'Hat', category: 'clothing', emoji: '🧢', accentColor: '#2563eb', bgGradient: 'from-blue-100 to-sky-200', speechLabel: 'Hat' },
  { id: 'shoe', name: 'Shoe', category: 'clothing', emoji: '👟', accentColor: '#059669', bgGradient: 'from-emerald-100 to-teal-100', speechLabel: 'Shoe' },
  { id: 'shirt', name: 'Shirt', category: 'clothing', emoji: '👕', accentColor: '#0284c7', bgGradient: 'from-sky-100 to-indigo-100', speechLabel: 'Shirt' },
  { id: 'socks', name: 'Socks', category: 'clothing', emoji: '🧦', accentColor: '#d946ef', bgGradient: 'from-purple-100 to-pink-100', speechLabel: 'Socks' },
  { id: 'mittens', name: 'Mittens', category: 'clothing', emoji: '🧤', accentColor: '#e11d48', bgGradient: 'from-rose-100 to-amber-100', speechLabel: 'Mittens' },
  { id: 'sunglasses', name: 'Sunglasses', category: 'clothing', emoji: '🕶️', accentColor: '#0f172a', bgGradient: 'from-amber-100 to-slate-200', speechLabel: 'Sunglasses' },
  { id: 'dress', name: 'Dress', category: 'clothing', emoji: '👗', accentColor: '#0891b2', bgGradient: 'from-cyan-100 to-teal-100', speechLabel: 'Dress' },
  { id: 'crown', name: 'Crown', category: 'clothing', emoji: '👑', accentColor: '#eab308', bgGradient: 'from-yellow-100 to-amber-200', speechLabel: 'Crown' },
  { id: 'scarf', name: 'Scarf', category: 'clothing', emoji: '🧣', accentColor: '#dc2626', bgGradient: 'from-red-100 to-rose-100', speechLabel: 'Scarf' },
  { id: 'boots', name: 'Boots', category: 'clothing', emoji: '🥾', accentColor: '#854d0e', bgGradient: 'from-amber-100 to-stone-200', speechLabel: 'Boots' },
  { id: 'diamond_ring', name: 'Ring', category: 'clothing', emoji: '💍', accentColor: '#0284c7', bgGradient: 'from-sky-100 to-purple-100', speechLabel: 'Ring' },
  { id: 'martial_belt', name: 'Belt', category: 'clothing', emoji: '🥋', accentColor: '#0f172a', bgGradient: 'from-slate-100 to-stone-200', speechLabel: 'Belt' },
  { id: 'necktie', name: 'Necktie', category: 'clothing', emoji: '👔', accentColor: '#3b82f6', bgGradient: 'from-blue-100 to-slate-100', speechLabel: 'Necktie' },

  // Birds (12)
  { id: 'owl', name: 'Owl', category: 'birds', emoji: '🦉', accentColor: '#78350f', bgGradient: 'from-amber-100 to-stone-200', speechLabel: 'Owl' },
  { id: 'penguin', name: 'Penguin', category: 'birds', emoji: '🐧', accentColor: '#0f172a', bgGradient: 'from-slate-100 to-sky-100', speechLabel: 'Penguin' },
  { id: 'parrot', name: 'Parrot', category: 'birds', emoji: '🦜', accentColor: '#16a34a', bgGradient: 'from-emerald-100 to-rose-100', speechLabel: 'Parrot' },
  { id: 'duck', name: 'Duck', category: 'birds', emoji: '🦆', accentColor: '#059669', bgGradient: 'from-green-100 to-yellow-100', speechLabel: 'Duck' },
  { id: 'flamingo', name: 'Flamingo', category: 'birds', emoji: '🦩', accentColor: '#ec4899', bgGradient: 'from-pink-100 to-rose-200', speechLabel: 'Flamingo' },
  { id: 'eagle', name: 'Eagle', category: 'birds', emoji: '🦅', accentColor: '#713f12', bgGradient: 'from-amber-100 to-stone-200', speechLabel: 'Eagle' },
  { id: 'peacock', name: 'Peacock', category: 'birds', emoji: '🦚', accentColor: '#0284c7', bgGradient: 'from-teal-100 to-blue-200', speechLabel: 'Peacock' },
  { id: 'swan', name: 'Swan', category: 'birds', emoji: '🦢', accentColor: '#0f172a', bgGradient: 'from-slate-50 to-sky-100', speechLabel: 'Swan' },
  { id: 'rooster', name: 'Rooster', category: 'birds', emoji: '🐓', accentColor: '#dc2626', bgGradient: 'from-rose-100 to-amber-100', speechLabel: 'Rooster' },
  { id: 'baby_chick', name: 'Baby Chick', category: 'birds', emoji: '🐥', accentColor: '#eab308', bgGradient: 'from-yellow-100 to-amber-100', speechLabel: 'Baby Chick' },
  { id: 'dove', name: 'Dove', category: 'birds', emoji: '🕊️', accentColor: '#64748b', bgGradient: 'from-slate-50 to-indigo-50', speechLabel: 'Dove' },
  { id: 'turkey', name: 'Turkey', category: 'birds', emoji: '🦃', accentColor: '#9a3412', bgGradient: 'from-amber-100 to-orange-100', speechLabel: 'Turkey' },

  // Sea Animals (12)
  { id: 'dolphin', name: 'Dolphin', category: 'sea_animals', emoji: '🐬', accentColor: '#0284c7', bgGradient: 'from-sky-100 to-blue-200', speechLabel: 'Dolphin' },
  { id: 'whale', name: 'Whale', category: 'sea_animals', emoji: '🐳', accentColor: '#0369a1', bgGradient: 'from-blue-100 to-cyan-200', speechLabel: 'Whale' },
  { id: 'octopus', name: 'Octopus', category: 'sea_animals', emoji: '🐙', accentColor: '#db2777', bgGradient: 'from-pink-100 to-purple-200', speechLabel: 'Octopus' },
  { id: 'crab', name: 'Crab', category: 'sea_animals', emoji: '🦀', accentColor: '#dc2626', bgGradient: 'from-red-100 to-orange-200', speechLabel: 'Crab' },
  { id: 'sea_turtle', name: 'Sea Turtle', category: 'sea_animals', emoji: '🐢', accentColor: '#15803d', bgGradient: 'from-emerald-100 to-teal-200', speechLabel: 'Sea Turtle' },
  { id: 'fish', name: 'Fish', category: 'sea_animals', emoji: '🐠', accentColor: '#ea580c', bgGradient: 'from-amber-100 to-cyan-200', speechLabel: 'Tropical Fish' },
  { id: 'shark', name: 'Shark', category: 'sea_animals', emoji: '🦈', accentColor: '#0284c7', bgGradient: 'from-slate-100 to-blue-200', speechLabel: 'Shark' },
  { id: 'pufferfish', name: 'Pufferfish', category: 'sea_animals', emoji: '🐡', accentColor: '#eab308', bgGradient: 'from-yellow-100 to-amber-100', speechLabel: 'Pufferfish' },
  { id: 'lobster', name: 'Lobster', category: 'sea_animals', emoji: '🦞', accentColor: '#b91c1c', bgGradient: 'from-red-100 to-rose-200', speechLabel: 'Lobster' },
  { id: 'shrimp', name: 'Shrimp', category: 'sea_animals', emoji: '🦐', accentColor: '#ea580c', bgGradient: 'from-rose-100 to-orange-100', speechLabel: 'Shrimp' },
  { id: 'squid', name: 'Squid', category: 'sea_animals', emoji: '🦑', accentColor: '#c026d3', bgGradient: 'from-purple-100 to-fuchsia-200', speechLabel: 'Squid' },
  { id: 'sea_shell', name: 'Sea Shell', category: 'sea_animals', emoji: '🐚', accentColor: '#d97706', bgGradient: 'from-amber-100 to-pink-100', speechLabel: 'Sea Shell' },
];
