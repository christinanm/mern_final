import mongoose from 'mongoose'

const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://mekheilc:AnubisTheGod0!@cluster0.ukjov6q.mongodb.net/");
        console.log("Connected to MongoDB!")
    } catch (error) {
        console.log("Error: Could not connect to MongoDB", error.message)
    }
};

export default connectToMongoDB