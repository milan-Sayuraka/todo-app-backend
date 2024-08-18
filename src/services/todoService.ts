import { Todo } from '../models/todo';
import { Status } from '../models/status';
import { Priority } from '../models/priority';
import logger from '../utils/logger';  // Importing the logger
import { v4 as uuidv4 } from 'uuid';

let todos: Todo[] = [];

export const createTodo = (todo: Omit<Todo, 'id' | 'auditLogs'>): Todo => {
  const newTodo: Todo = {
      ...todo,
      id: uuidv4(),  // Auto-generate a unique ID using uuid
      auditLogs: [{ 
          timestamp: new Date().toISOString(), 
          action: 'Created Todo' 
      }]
  };
  
  todos.push(newTodo);
  
  logger.info(`Todo created with ID: ${newTodo.id}`, { todo: newTodo });
  
  return newTodo;
};


  export const getTodos = (status?: Status, priority?: Priority, title?: string): Todo[] => {
    const filteredTodos = todos.filter(todo => {
      let matches = true;
  
      if (status) {
        matches = matches && todo.status === status;
      }
  
      if (priority) {
        matches = matches && todo.priority === priority;
      }
  
      if (title) {
        matches = matches && todo.title.toLowerCase().includes(title.toLowerCase());
      }
  
      return matches;
    });
    
    logger.info(`Fetched ${filteredTodos.length} todos with filters`, { status, priority, title });
    
    return filteredTodos;
  };
  
export const deleteTodo = (id: string): void => {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex !== -1) {
    const removedTodo = todos.splice(todoIndex, 1)[0];
    logger.info(`Todo deleted with ID: ${removedTodo.id}`, { removedTodo });
  } else {
    logger.warn(`Attempted to delete non-existent todo with ID: ${id}`);
  }
};

export const updateTodo = (identifier: string, updatedFields: Partial<Todo>, searchByTitle = false): Todo | null => {
  const todo = searchByTitle 
      ? todos.find(todo => todo.title.toLowerCase() === identifier.toLowerCase())
      : todos.find(todo => todo.id === identifier);

  if (!todo) {
      logger.warn(`Todo with ${searchByTitle ? 'title' : 'ID'}: ${identifier} not found for update.`);
      return null;
  }

  Object.assign(todo, updatedFields);
  todo.auditLogs.push({ 
      timestamp: new Date().toISOString(), 
      action: 'Updated Todo' 
  });
  
  logger.info(`Todo updated with ${searchByTitle ? 'title' : 'ID'}: ${identifier}`, { updatedTodo: todo });

  return todo;
};
