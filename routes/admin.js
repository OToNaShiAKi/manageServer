import {
    Router
} from 'express';
import Admin from './../controllers/Admin'

const router = Router()

router.post('/register', Admin.Register)

router.post('/login', Admin.Login)

router.get('/api/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) next(err);
        else res.json({
            status: 200,
            message: '退出登录成功'
        })
    })
})

router.post('/api/info', Admin.EditInfo)

export default router;