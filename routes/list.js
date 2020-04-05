import {
    Router
} from 'express';
import List from './../controllers/List'

const router = Router()

router.get('/get', List.GetList);

router.post('/api/edit', List.EditList);

router.post('/api/move', List.MoveList);

router.get('/api/history', List.HistoryList);

router.post('/api/start', List.StartList);

export default router;