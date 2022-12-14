import authRouter from './Auth'
// import insertRouter from './insert'
// import categoryRouter from './category'
// import postRouter from './post'
// import priceRouter from './price'
// import areaRouter from './area'
// import provinceRouter from './province'
 import userRouter from './User'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)
    // app.use('/api/v1/room', insertRouter)
    // app.use('/api/v1/booking', categoryRouter)
    // app.use('/api/v1/branch', postRouter)
    return app.use('/', (req, res) => {
        res.send('server on...')

    })
}

export default initRoutes