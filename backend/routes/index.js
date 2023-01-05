import authRouter from './Auth'
import userRouter from './User'
import branchRouter from './Branch'
import hotelRouter from './Hotel'
import roomRouter from './Room'
import bookingRouter from './Booking'



const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/branch', branchRouter)
    app.use('/api/v1/hotel', hotelRouter)
    app.use('/api/v1/room', roomRouter)
    app.use('/api/v1/booking', bookingRouter)
    return app.use('/', (req, res) => {
        res.send('server on...')

    })
}

export default initRoutes