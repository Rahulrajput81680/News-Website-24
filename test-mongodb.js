// Quick MongoDB connection test
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost:27017/trendhandy";

async function testConnection() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    console.log("URI:", MONGODB_URI);

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB Connected Successfully!");
    console.log("📊 Database:", mongoose.connection.db.databaseName);

    // List collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "📁 Collections:",
      collections.map((c) => c.name).join(", ") || "None"
    );

    // Count articles
    const Article = mongoose.connection.db.collection("articles");
    const count = await Article.countDocuments();
    console.log("📰 Articles in database:", count);

    await mongoose.disconnect();
    console.log("✅ Test completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);
    process.exit(1);
  }
}

testConnection();
