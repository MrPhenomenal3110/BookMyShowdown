import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())


//routes import
import userRoute from './routes/user.routes.js'
import movieRoute from './routes/movie.routes.js'
import theatreRoute from './routes/theatre.routes.js'
import showRoute from './routes/show.routes.js'
import bookingRoute from './routes/booking.routes.js'

//routes declaration
app.use('/api/users' , userRoute)
app.use('/api/movies' , movieRoute)
app.use('/api/theatres' , theatreRoute)
app.use('/api/shows' , showRoute)
app.use('/api/bookings' , bookingRoute)

export { app }