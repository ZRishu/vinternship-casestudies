// Add a New Vegan Dish
db.menu.insertOne({
  name: "Tofu Buddha Bowl",
  cuisine: "Asian",
  price: { value: 9.5, currency: "USD" },
  tags: ["vegan", "gluten-free"],
  available: true,
  createdAt: new Date(),
});


// Find All Available Vegan Dishes Under $12
db.menu.find(
  {
    available: true,
    tags: "vegan",
    "price.value": { $lt: 12 },
  },
  {
    _id: 0,
    name: 1,
    "price.value": 1,
  },
);


// Update Price and Add popular Tag
db.menu.updateOne(
  { name: "Tofu Buddha Bowl" },
  {
    $set: { "price.value": 10.00 },
    $addToSet: { tags: "popular" }
  }
);


// Delete Old Special Soup
db.menu.deleteOne({
  name: "Old Special Soup"
});
