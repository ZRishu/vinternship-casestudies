/**
 * Sample Document Structure
 * {
 *   "_id": ObjectId("..."),
 *   "movie": "Edge of Tomorrow",
 *   "genre": "Sci-Fi",
 *   "country": "USA",
 *   "views": 15000,
 *   "rating": 8.2,
 *   "year": 2024
 * }
 */
 
 
// DB Query
db.watchHistory.aggregate([
  // Filter only 2024 records
  { 
    $match: { year: 2024 } 
  },

  // Group by genre and calculate totals
  {
    $group: {
      _id: "$genre",
      totalViews: { $sum: "$views" },
      avgRating: { $avg: "$rating" }
    }
  },

  // Filter genres with more than 10,000 total views
  {
    $match: {
      totalViews: { $gt: 10000 }
    }
  },

  // Format output
  {
    $project: {
      _id: 0,
      genre: "$_id",
      totalViews: 1,
      avgRating: { $round: ["$avgRating", 1] }
    }
  }
])