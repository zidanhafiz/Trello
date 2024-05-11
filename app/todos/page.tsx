'use client';
import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Pencil, Trash2 } from 'lucide-react';
import { DeleteAlert } from '@/components/DeleteAlert';
import { Todo } from '@/lib/types';
import { useTodos } from '@/lib/hooks/useTodos';
import { Toaster } from '@/components/ui/toaster';

const Todos = () => {
  const { todos, isLoading } = useTodos();

  const deleteTodoHandle = (id: string) => {
    console.log('deleted');
  };

  return (
    <div>
      <Toaster />
      <Heading size='md'>My Todos</Heading>
      <div className='bg-white p-4 rounded-md shadow-sm'>
        <Button className='mt-3 mb-4'>
          <Link href='/todos/create'>Create New Todo</Link>
        </Button>
        <p className='text-slate-500'>Here&apos;s your todo list:</p>
        <Separator className='my-4' />
        <div>
          <Accordion
            type='single'
            collapsible
          >
            <AccordionItem value='item-1'>
              <AccordionTrigger>Finished</AccordionTrigger>
              <TodoItems
                todos={todos}
                isFinished={true}
                isLoading={isLoading}
                deleteTodoHandle={deleteTodoHandle}
              />
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>Unfinished</AccordionTrigger>
              <TodoItems
                todos={todos}
                isFinished={false}
                isLoading={isLoading}
                deleteTodoHandle={deleteTodoHandle}
              />
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

const TodoItems = ({
  todos,
  isFinished,
  isLoading,
  deleteTodoHandle,
}: {
  todos: Todo[];
  isFinished: boolean;
  isLoading: boolean;
  deleteTodoHandle: (id: string) => void;
}) => {
  if (isLoading) return <p>wait</p>;

  const filteredTodos = todos.filter((todo) => todo.finished === isFinished);

  return (
    <>
      {filteredTodos.map((todo, i) => (
        <AccordionContent
          key={todo.id}
          className='grid grid-cols-[auto,1fr,auto] gap-4 items-center'
        >
          <p className='text-slate-500 leading-10'>{i + 1}</p>
          <h2 className='text-base font-medium truncate'>{todo.title}</h2>
          <div className='space-x-2'>
            <Button asChild>
              <Link href={`/todos/${todo.id}`}>
                <Pencil size={16} />
              </Link>
            </Button>
            <DeleteAlert
              message='This todo would be permanent deleted'
              action={() => deleteTodoHandle(todo.id as string)}
            >
              <Trash2 size={16} />
            </DeleteAlert>
          </div>
        </AccordionContent>
      ))}
    </>
  );
};

export default Todos;
