const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://achaitanyakumar3112:xqbMQeOjje4v8P6f@food.uiteclq.mongodb.net/FoodPanda?retryWrites=true&w=majority&appName=food';

const foodItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
const FoodItem = mongoose.model('food_items', foodItemSchema);

const foodCategorySchema = new mongoose.Schema({
  category_name: String,
});
const FoodCategory = mongoose.model('food_category', foodCategorySchema);

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
    });
    console.log("Connected to MongoDB");

    const fetched_data = await FoodItem.find({});
    const fetched_categories = await FoodCategory.find({});
    
    if (fetched_data.length === 0) {
      console.log("No food items found");
    } else {
      global.food_items = fetched_data;
      console.log("Global food_items:", global.food_items);
    }

    if (fetched_categories.length === 0) {
      console.log("No food categories found");
    } else {
      global.food_categories = fetched_categories;
      console.log("Global food_categories:", global.food_categories);
    }

  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = mongoDB;
