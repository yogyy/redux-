import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Todo } from "./todo";
import { useDispatch } from "react-redux";
import { Button, Field, Fieldset, Input } from "@headlessui/react";
import { useState } from "react";
import { addTodo } from "@/state/todo/todo-slice";
import { cn } from "@/lib/utils";

export const TodoCollection = () => {
  const todos = useSelector((state: RootState) => state.todo);

  return (
    <div>
      <div className="flex items-center gap-10 py-10">
        <h1 className="w-fit text-4xl text-emerald-400">todo</h1>

        <AddTodo />
      </div>
      <ul className="flex h-auto flex-wrap gap-6">
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </ul>
      <pre>{JSON.stringify(todos, null, 4)}</pre>
    </div>
  );
};

export const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.length <= 0) {
      alert("Please enter a todo item before submitting.");
    } else {
      dispatch(addTodo(todo));
      setTodo("");
    }
  };

  return (
    <div>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <Fieldset className="flex items-center gap-2">
          <Field>
            <Input
              placeholder="making side project..."
              className={cn(
                "block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              )}
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </Field>
          <Button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
        </Fieldset>
      </form>
    </div>
  );
};
