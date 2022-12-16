import authRouter from './Auth'
import userRouter from './User'
import branchRouter from './Branch'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/branch', branchRouter)
    return app.use('/', (req, res) => {
        res.send('server on...')

    })
}

export default initRoutes