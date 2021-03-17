import mongoose from "mongoose";
import app from './app'

const start = async () => {
    console.log('starting....')

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined')
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (e) {
        console.error(e)
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000')
    })
}

start()