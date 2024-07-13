import mongoose from 'mongoose'

export const connectDB = async () => {

    await mongoose.connect('mongodb+srv://food123:934515@cluster0.hn876sr.mongodb.net/food-del').then(()=>{console.log('DB connected')})
}