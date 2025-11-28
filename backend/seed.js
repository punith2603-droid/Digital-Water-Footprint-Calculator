const mongoose = require("mongoose");
const Item = require("./models/Item");

mongoose
  .connect("mongodb://127.0.0.1:27017/waterfootprint")
  .then(async () => {
    console.log("Connected to DB");

    await Item.deleteMany({});
    console.log("Old items removed");

    const items = [
      // 🍎 FRUITS
      { name: "Apple", category: "Fruits", water: 822, unit: "L/kg", tips: "Buy local apples to reduce transport footprint.", calories: 52, protein: 0.3, vitamins: "A, C", image: "images/apple.png"},
      { name: "Banana", category: "Fruits", water: 790, unit: "L/kg", tips: "Use ripe bananas quickly to reduce waste.", calories: 89, protein: 1.1, vitamins: "B6, C", image: "images/banana.png"},
      { name: "Grapes", category: "Fruits", water: 610, unit: "L/kg", tips: "Choose seasonal grapes.", calories: 69, protein: 0.6, vitamins: "C, K", image: "images/grapes.png"},
      { name: "Watermelon", category: "Fruits", water: 300, unit: "L/kg", tips: "Store properly to avoid spoilage.", calories: 30, protein: 0.6, vitamins: "A, C", image: "images/watermelon.png"},

      // 🥬 GREENS
      { name: "Spinach", category: "Greens", water: 180, unit: "L/kg", tips: "Buy fresh; consume quickly.", calories: 23, protein: 2.9, vitamins: "A, C, K", image: "images/spinach.png"},
      { name: "Lettuce", category: "Greens", water: 240, unit: "L/kg", tips: "Best when grown locally.", calories: 15, protein: 1.3, vitamins: "A, K", image: "images/lettuce.png"},

      // 🥕 VEGETABLES
      { name: "Carrot", category: "Vegetables", water: 131, unit: "L/kg", tips: "Use whole carrots instead of pre-cut.", calories: 41, protein: 0.9, vitamins: "A, K", image: "images/carrot.png"},
      { name: "Tomato", category: "Vegetables", water: 214, unit: "L/kg", tips: "Grow at home to save water footprint.", calories: 18, protein: 0.9, vitamins: "C, K", image: "images/tomato.png"},
      { name: "Onion", category: "Vegetables", water: 250, unit: "L/kg", tips: "Store in cool dry place.", calories: 40, protein: 1.1, vitamins: "C, B6", image: "images/onion.png"},
      { name: "Potato", category: "Vegetables", water: 287, unit: "L/kg", tips: "Boil instead of fry to save water.", calories: 77, protein: 2, vitamins: "C, B6", image: "images/potato.png"},

      // 🥛 DAIRY
      { name: "Milk", category: "Dairy", water: 1020, unit: "L/kg", tips: "Try plant-based alternatives.", calories: 42, protein: 3.4, vitamins: "A, D", image: "images/milk.png"},
      { name: "Cheese", category: "Dairy", water: 5060, unit: "L/kg", tips: "Consume moderately.", calories: 402, protein: 25, vitamins: "A, B2", image: "images/cheese.png"},
      { name: "Yogurt", category: "Dairy", water: 900, unit: "L/kg", tips: "Choose local brands.", calories: 59, protein: 10, vitamins: "B12", image: "images/yogurt.png"},

      // 🍗 MEAT
      { name: "Chicken", category: "Meat", water: 4325, unit: "L/kg", tips: "Reduce portion size.", calories: 239, protein: 27, vitamins: "B6", image: "images/chicken.png"},
      { name: "Beef", category: "Meat", water: 15415, unit: "L/kg", tips: "Replace with legumes often.", calories: 250, protein: 26, vitamins: "B12", image: "images/beef.png"},
      { name: "Pork", category: "Meat", water: 6000, unit: "L/kg", tips: "Consume occasionally.", calories: 242, protein: 27, vitamins: "B1", image: "images/pork.png"},

      // ☕ DRINKS
      { name: "Tea", category: "Drinks", water: 30, unit: "L/cup", tips: "Choose herbal teas.", calories: 1, protein: 0.1, vitamins: "", image: "images/tea.png"},
      { name: "Coffee", category: "Drinks", water: 140, unit: "L/cup", tips: "Limit consumption.", calories: 2, protein: 0.1, vitamins: "", image: "images/coffee.png"},
      { name: "Soda", category: "Drinks", water: 170, unit: "L/can", tips: "Reduce sugary drinks.", calories: 150, protein: 0, vitamins: "", image: "images/soda.png"},

      // 🌾 GRAINS
      { name: "Rice", category: "Grains", water: 2500, unit: "L/kg", tips: "Use local grains.", calories: 130, protein: 2.7, vitamins: "B-complex", image: "images/rice.png"},
      { name: "Pasta", category: "Grains", water: 1800, unit: "L/kg", tips: "Cook al dente.", calories: 131, protein: 5, vitamins: "B1", image: "images/pasta.png"},
      { name: "Bread", category: "Grains", water: 1600, unit: "L/kg", tips: "Choose whole grain.", calories: 265, protein: 9, vitamins: "B3", image: "images/bread.png"},

      // 🔧 OTHERS
      { name: "Chocolate", category: "Others", water: 17000, unit: "L/kg", tips: "Consume sparingly.", calories: 546, protein: 4.9, vitamins: "B1", image: "images/chocolate.png"},
      { name: "Honey", category: "Others", water: 4500, unit: "L/kg", tips: "Use natural honey.", calories: 304, protein: 0.3, vitamins: "B6", image: "images/honey.png"}
    ];

    await Item.insertMany(items);
    console.log("Seeded items:", items.length);

    mongoose.connection.close();
  })
  .catch(err => console.error(err));
