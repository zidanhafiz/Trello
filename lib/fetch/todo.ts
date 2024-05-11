import { TodoSchema } from '../schema';
import { Todo } from '../types';

export const createNewTodo = async (values: TodoSchema) => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(values),
  });

  if (!res.ok) throw new Error('Error create todo');

  return await res.json();
};

export const updateTodo = async (values: Todo) => {
  const res = await fetch(`/api/todos/${values.id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });

  if (!res.ok) throw new Error('Error updated todo');

  return await res.json();
};

export const deleteTodo = async (id: string) => {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Error delete todo');

  return await res.json();
};
