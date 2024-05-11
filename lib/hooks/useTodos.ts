import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Todo } from '../types';

export const useTodos = () => {
  const { data, error, isLoading } = useSWR('/api/todos', fetcher);
  const todos = data?.data as Todo[];

  return {
    todos,
    error,
    isLoading,
  };
};
