import { Router }  from 'express'
import urlRouter from './urlRouter'
import userRouter  from './userRouter'
const router = Router()

router.use("/url", urlRouter)
router.use("/user", userRouter)


export default router