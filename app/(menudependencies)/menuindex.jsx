<<<<<<< HEAD
export const categories = [
  {
    id: 1,
    name: 'Drinks',
    image: require('../(menudependencies)/menuimgs/coffeecup.png'),

  },
  {
    id: 2,
    name: 'Snacks',
image: require('../(menudependencies)/menuimgs/burger.png'),
  },
  {
    id: 3,
    name: 'Desserts',
     image: require('../(menudependencies)/menuimgs/cake.png'),
    },
    {
    id: 4,
    name: 'Specials',
     image: require('../(menudependencies)/menuimgs/star.png'),
  },
];

export const items = [
  { 
    id: 1,
    name: "Latte",
    image: require('../(menudependencies)/menuimgs/latte.jpeg'),
    rating: 4.2,
      description: "A smooth and creamy coffee drink made with espresso and steamed milk.",
    ingredient: "Espresso, steamed milk, milk foam",
    price: 30,
    type: 'Drinks',
    isVeg: true,
     extras: [
      { name: 'Sugar', price: 10 }
    ],
  },
  {
    id: 2,
    name: "Capuccino",
  image: require('../(menudependencies)/menuimgs/capuccino.jpg'),
    rating: 4.6,
        description: "A balanced espresso drink with equal parts espresso, steamed milk, and milk foam.",
    ingredient: "Espresso, steamed milk, milk foam",
    price: 50,
    type: 'Drinks',
    isVeg: true,
         extras: [
      { name: 'Sugar', price: 10 }
    ],
  },
  {
    id: 3,
    name: "Black Coffee",
   image: require('../(menudependencies)/menuimgs/blackcoffee.jpg'),
    rating: 4.0,
        description: "A bold and strong coffee made with no milk or sugar.",
    ingredient: "Brewed coffee beans, water",
    price: 30,
    type: 'Drinks',
    isVeg: true,
         extras: [
      { name: 'Sugar', price: 10 }
    ],
  },
  {
    id: 4,
    name: "Iced Coffee",
  image: require('../(menudependencies)/menuimgs/icedcoffee.webp'),
    rating: 4.1,
        description: "A refreshing chilled coffee drink served with ice.",
    ingredient: "Brewed coffee, ice, sugar",
    price: 40,
    type: 'Drinks',
    isVeg: true,
         extras: [
      { name: 'Sugar', price: 10 }
    ],
  },
  {
    id: 5,
    name: "Chocolate Milkshake",
  image: require('../(menudependencies)/menuimgs/chocolatemilkshake.jpg'),
    rating: 4.1,
        description: "A rich and creamy chocolate milkshake topped with whipped cream.",
    ingredient: "Milk, chocolate syrup, ice cream",
    price: 50,
    type: 'Drinks',
    isVeg: true,
           extras: [
             { name: 'Chocolate Chips', price: 15 },
             {name: "Whipped Cream", price: 20}
    ],
  },
 

  { 
    id: 6,
    name: "Croissant",
   image: require('../(menudependencies)/menuimgs/croissant.webp'),
    rating: 4.2,
        description: "A buttery and flaky French pastry.",
    ingredient: "Butter, flour, yeast",
    price: 50,
    type: 'Snacks',
    isVeg: false,
           extras: [
             { name: "Butter", price: 10 },
             { name: "Jam   ", price: 10}
    ],
  },
  {
    id: 7,
    name: "Veg Sandwich",
  image: require('../(menudependencies)/menuimgs/vegsandwich.jpg'),
    rating: 4.6,
        description: "A fresh and healthy sandwich filled with veggies and sauces.",
    ingredient: "Bread, lettuce, tomato, cucumber",
    price: 65,
    type: 'Snacks',
    isVeg: true,
           extras: [
      { name: 'Sugar', price: 10 }
    ],
  },
  {
    id: 8,
    name: "Cheese Sandwich",
   image: require('../(menudependencies)/menuimgs/cheesesandwich.jpeg'),
    rating: 4.0,
        description: "A grilled sandwich with melted cheese and fresh veggies.",
    ingredient: "Bread, cheese, butter",
    price: 60,
    type: 'Snacks',
    isVeg: true,
           extras: [
      { name: 'Cheese', price: 15 }
    ],
  },
  {
    id: 9,
    name: "Chicken Sandwich",
  image: require('../(menudependencies)/menuimgs/chickenwrap.jpg'),
    rating: 4.3,
    description: "A savory sandwich packed with tender chicken and sauces.",
    ingredient: "Bread, grilled chicken, lettuce",
    price: 70,
    type: 'Snacks',
    isVeg: false,
           extras: [
      { name: 'Spicy Mayo', price: 10 }
    ],
  },
    {
    id: 10,
    name: " Chicken Burger",
  image: require('../(menudependencies)/menuimgs/burger1.jpg'),
      rating: 4.8,
     description: "A juicy chicken burger with cheese and lettuce.",
    ingredient: "Bun, chicken patty, cheese, lettuce",
    price: 90,
    type: 'Snacks',
      isVeg: false,
           extras: [
             { name: 'Fried Eggs', price: 20 },
             {name: "Onion Rings", price: 20}
    ],
  },
  
    {
    id: 11,
    name: " Chocolate cake",
  image: require('../(menudependencies)/menuimgs/chocolatecake.jpg'),
      rating: 4.7,
     description: "A rich and moist chocolate cake topped with chocolate frosting.",
    ingredient: "Flour, cocoa powder, sugar, eggs",
    price: 70,
      type: 'Desserts',
      isVeg: true,
  },
    {
    id: 12,
    name: " Strawberry cake",
  image: require('../(menudependencies)/menuimgs/strawberrycake.jpg'),
      rating: 4.9,
        description: "A light and fluffy cake with strawberry flavor.",
    ingredient: "Flour, strawberries, sugar, eggs",
    price: 80,
      type: 'Desserts',
    isVeg: true,
  },
     {
    id: 13,
    name: "Chocolate Brownie",
  image: require('../(menudependencies)/menuimgs/brownie.jpg'),
       rating: 4.4,
      description: "A fudgy chocolate brownie with a crispy top.",
    ingredient: "Chocolate, butter, sugar, eggs",
    price: 40,
      type: 'Desserts',
    isVeg: false,
  },
    
    
        {
    id: 14,
    name: "Fish and Chips",
  image: require('../(menudependencies)/menuimgs/fishnchips.jpg'),
          rating: 4.1,
        description: "Crispy fried fish served with golden fries.",
    ingredient: "Fish fillets, potatoes, batter",
    price: 5,
          type: 'Specials',
           extras: [
             { name: "Tartar Sauce", price: 10 },
             {name: "Lemon Wedges", price: 5}
    ],
  },
=======
export const categories = [
  {
    id: 1,
    name: 'Drinks',
    image: require('../(menudependencies)/menuimgs/coffeecup.png'),

  },
  {
    id: 2,
    name: 'Snacks',
image: require('../(menudependencies)/menuimgs/burger.png'),
  },
  {
    id: 3,
    name: 'Desserts',
     image: require('../(menudependencies)/menuimgs/cake.png'),
    },
    {
    id: 4,
    name: 'Specials',
     image: require('../(menudependencies)/menuimgs/star.png'),
  },
];

export const items = [
  { 
    id: 1,
    name: "Latte",
    image: require('../(menudependencies)/menuimgs/latte.jpeg'),
    rating: 4.2,
      description: "A smooth and creamy coffee drink made with espresso and steamed milk.",
    ingredient: "Espresso, steamed milk, milk foam",
    price: 30,
    type: 'Drinks',
    isVeg: true,
     extras: [
      { name: 'Sugar', price: 10 }
    ],
  },
  {
    id: 2,
    name: "Capuccino",
  image: require('../(menudependencies)/menuimgs/capuccino.jpg'),
    rating: 4.6,
        description: "A balanced espresso drink with equal parts espresso, steamed milk, and milk foam.",
    ingredient: "Espresso, steamed milk, milk foam",
    price: 50,
    type: 'Drinks',
    isVeg: true,
         extras: [
      { name: 'Sugar', price: 10 }
    ],
  },
  {
    id: 3,
    name: "Black Coffee",
   image: require('../(menudependencies)/menuimgs/blackcoffee.jpg'),
    rating: 4.0,
        description: "A bold and strong coffee made with no milk or sugar.",
    ingredient: "Brewed coffee beans, water",
    price: 30,
    type: 'Drinks',
    isVeg: true,
         extras: [
      { name: 'Sugar', price: 10 }
    ],
  },
  {
    id: 4,
    name: "Iced Coffee",
  image: require('../(menudependencies)/menuimgs/icedcoffee.webp'),
    rating: 4.1,
        description: "A refreshing chilled coffee drink served with ice.",
    ingredient: "Brewed coffee, ice, sugar",
    price: 40,
    type: 'Drinks',
    isVeg: true,
         extras: [
      { name: 'Sugar', price: 10 }
    ],
  },
  {
    id: 5,
    name: "Chocolate Milkshake",
  image: require('../(menudependencies)/menuimgs/chocolatemilkshake.jpg'),
    rating: 4.1,
        description: "A rich and creamy chocolate milkshake topped with whipped cream.",
    ingredient: "Milk, chocolate syrup, ice cream",
    price: 50,
    type: 'Drinks',
    isVeg: true,
           extras: [
             { name: 'Chocolate Chips', price: 15 },
             {name: "Whipped Cream", price: 20}
    ],
  },
 

  { 
    id: 6,
    name: "Croissant",
   image: require('../(menudependencies)/menuimgs/croissant.webp'),
    rating: 4.2,
        description: "A buttery and flaky French pastry.",
    ingredient: "Butter, flour, yeast",
    price: 50,
    type: 'Snacks',
    isVeg: false,
           extras: [
             { name: "Butter", price: 10 },
             { name: "Jam   ", price: 10}
    ],
  },
  {
    id: 7,
    name: "Veg Sandwich",
  image: require('../(menudependencies)/menuimgs/vegsandwich.jpg'),
    rating: 4.6,
        description: "A fresh and healthy sandwich filled with veggies and sauces.",
    ingredient: "Bread, lettuce, tomato, cucumber",
    price: 65,
    type: 'Snacks',
    isVeg: true,
           extras: [
      { name: 'Sugar', price: 10 }
    ],
  },
  {
    id: 8,
    name: "Cheese Sandwich",
   image: require('../(menudependencies)/menuimgs/cheesesandwich.jpeg'),
    rating: 4.0,
        description: "A grilled sandwich with melted cheese and fresh veggies.",
    ingredient: "Bread, cheese, butter",
    price: 60,
    type: 'Snacks',
    isVeg: true,
           extras: [
      { name: 'Cheese', price: 15 }
    ],
  },
  {
    id: 9,
    name: "Chicken Sandwich",
  image: require('../(menudependencies)/menuimgs/chickenwrap.jpg'),
    rating: 4.3,
    description: "A savory sandwich packed with tender chicken and sauces.",
    ingredient: "Bread, grilled chicken, lettuce",
    price: 70,
    type: 'Snacks',
    isVeg: false,
           extras: [
      { name: 'Spicy Mayo', price: 10 }
    ],
  },
    {
    id: 10,
    name: " Chicken Burger",
  image: require('../(menudependencies)/menuimgs/burger1.jpg'),
      rating: 4.8,
     description: "A juicy chicken burger with cheese and lettuce.",
    ingredient: "Bun, chicken patty, cheese, lettuce",
    price: 90,
    type: 'Snacks',
      isVeg: false,
           extras: [
             { name: 'Fried Eggs', price: 20 },
             {name: "Onion Rings", price: 20}
    ],
  },
  
    {
    id: 11,
    name: " Chocolate cake",
  image: require('../(menudependencies)/menuimgs/chocolatecake.jpg'),
      rating: 4.7,
     description: "A rich and moist chocolate cake topped with chocolate frosting.",
    ingredient: "Flour, cocoa powder, sugar, eggs",
    price: 70,
      type: 'Desserts',
      isVeg: true,
  },
    {
    id: 12,
    name: " Strawberry cake",
  image: require('../(menudependencies)/menuimgs/strawberrycake.jpg'),
      rating: 4.9,
        description: "A light and fluffy cake with strawberry flavor.",
    ingredient: "Flour, strawberries, sugar, eggs",
    price: 80,
      type: 'Desserts',
    isVeg: true,
  },
     {
    id: 13,
    name: "Chocolate Brownie",
  image: require('../(menudependencies)/menuimgs/brownie.jpg'),
       rating: 4.4,
      description: "A fudgy chocolate brownie with a crispy top.",
    ingredient: "Chocolate, butter, sugar, eggs",
    price: 40,
      type: 'Desserts',
    isVeg: false,
  },
    
    
        {
    id: 14,
    name: "Fish and Chips",
  image: require('../(menudependencies)/menuimgs/fishnchips.jpg'),
          rating: 4.1,
        description: "Crispy fried fish served with golden fries.",
    ingredient: "Fish fillets, potatoes, batter",
    price: 5,
          type: 'Specials',
           extras: [
             { name: "Tartar Sauce", price: 10 },
             {name: "Lemon Wedges", price: 5}
    ],
  },
>>>>>>> 1b425caee791463b3c48f72f255386d0a0db0adc
];