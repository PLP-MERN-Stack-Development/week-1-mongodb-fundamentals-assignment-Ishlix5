// Write MongoDB queries to:
//   - Find all books in a specific genre
db.books.find({ genre: "Adventure" })

//   - Find books published after a certain year
db.books.find({ published_year: { $gt: 1960 } })

//   - Find books by a specific author
db.books.find({ author: "George Orwell" })

//   - Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 12.99 } })

//   - Delete a book by its title
db.books.deleteOne({ title: "Old Book Title" })
// ### Task 3: Advanced Queries
// - Write a query to find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// - Use projection to return only the title, author, and price fields in your queries
db.books.find(
   { title: 1, author: 1, price: 1, _id: 0 }
)

// Only show title, author, and price for all books
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// - Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find(
   {},
   { title: 1, author: 1, price: 1, _id: 0 }
).skip(0).limit(5)

// ### Task 4: Aggregation Pipeline
// - Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  },
  {
    $sort: { averagePrice: -1 } // Sort by average price in descending order
  }
])
// - Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: -1 } // Sort by book count in descending order
  },
  {
    $limit: 1 // Get the author with the most books
  }
])
// - Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
  {
    $group: {
      _id: { $substr: ["$published_year", 0, 3] },
      bookCount: { $sum: 1 }
    }
  }
])

// ### Task 5: Indexing
// - Create an index on the `title` field for faster searches
db.books.createIndex({ title: 1 })
// - Create a compound index on `author` and `published_year`
db.books.createIndex({ author: 1, published_year: 1 })
// - Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({ title: "1984" }).explain("executionStats")

// ## 🧪 Expected Outcome
// - A functioning MongoDB database with properly structured data
// - A set of MongoDB queries that demonstrate your understanding of CRUD operations
// - Advanced queries showing filtering, projection, and sorting capabilities
// - Aggregation pipelines that transform and analyze the data
// - Properly implemented indexes with performance analysis