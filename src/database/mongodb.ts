import mongoose from 'mongoose'

const connectDB = function (url: any): void{
    mongoose.connect(url)

    mongoose.connection.on('connected', () => {
        console.log("successfully connected to database")
    })

    mongoose.connection.on('error', (error) => {
        console.log("There was an error connecting to mongodb")
        console.log(error)
    })
}

export default connectDB