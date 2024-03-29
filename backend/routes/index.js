const authRouter =  require("./Auth")
const userRouter =  require("./User")
const branchRouter =  require('./Branch')
const hotelRouter =  require("./Hotel")
const commentRouter =  require("./Comment")
const roomRouter = require("./Room")
const roomTypeRouter = require("./RoomType")
const bookingRouter =  require("./Booking")
const timeSlotRouter =  require("./TimeSlot")
const revenueRouter =  require("./Revenue")

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/branch', branchRouter)
    app.use('/api/v1/hotel', hotelRouter)
    app.use('/api/v1/comment', commentRouter)
    app.use('/api/v1/room', roomRouter)
    app.use('/api/v1/roomType', roomTypeRouter)
    app.use('/api/v1/booking', bookingRouter)
    app.use('/api/v1/timeSlot', timeSlotRouter)
    app.use('/api/v1/revenue', revenueRouter)
    return app.use('/', (req, res) => {
        res.send('server on...')
    })
}

module.exports = initRoutes