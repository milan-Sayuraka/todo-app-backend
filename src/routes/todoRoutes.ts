import { Router } from 'express';
import { createTodoHandler, getTodosHandler, deleteTodoHandler, updateTodoHandler } from '../controllers/todoController';

const router = Router();

router.post('/todos', createTodoHandler);
router.get('/todos', getTodosHandler);
router.delete('/todos/:id', deleteTodoHandler);
router.put('/todos/:id', updateTodoHandler);

export default router;
