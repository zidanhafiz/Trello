import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Todo } from '../types';

export const useTodos = () => {
  const { data, error, isLoading } = useSWR('/api/todos', fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: true,
  });
  const todos = data?.data as Todo[];

  return {
    todos,
    error,
    isLoading,
  };
};

export const useTodo = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/todos/${id}`, fetcher);
  const todo = data?.data as Todo;

  return {
    todo,
    error,
    isLoading,
  };
};
