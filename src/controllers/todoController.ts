import { Request, Response } from 'express';
import { createTodo, getTodos, deleteTodo, updateTodo } from '../services/todoService';
import { Todo } from '../models/todo';
import { Status } from '../models/status';
import { Priority } from '../models/priority';

export const createTodoHandler = (req: Request, res: Response) => {
  const todo: Todo = req.body;
  const newTodo = createTodo(todo);
  res.status(201).json(newTodo);
};

export const getTodosHandler = (req: Request, res: Response) => {
  const { status, priority, title } = req.query;

  // Validate and cast `status` and `priority` to enums
  const parsedStatus = Object.values(Status).includes(status as Status) ? (status as Status) : undefined;
  const parsedPriority = Object.values(Priority).includes(priority as Priority) ? (priority as Priority) : undefined;

  const todos = getTodos(parsedStatus, parsedPriority, title as string);
  res.status(200).json(todos);
};

export const deleteTodoHandler = (req: Request, res: Response) => {
  const { id } = req.params;
  deleteTodo(id);
  res.status(204).send();
};

export const updateTodoHandler = (req: Request, res: Response) => {
  const { id, title } = req.params;
  const updatedFields = req.body;

  // Update by ID if no title is provided, otherwise update by title
  const updatedTodo = title 
    ? updateTodo(title, updatedFields, true)
    : updateTodo(id, updatedFields);

  if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
  res.status(200).json(updatedTodo);
};
