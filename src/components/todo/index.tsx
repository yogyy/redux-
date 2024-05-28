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
      <div className="flex items-center gap-10 py-10 text-4xl">
        <h1 className="w-fit text-clip bg-gradient-to-r from-red-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent">
          todo
        </h1>

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

  return (
    <div className="">
      <form
        className="w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addTodo(todo));

          setTodo("");
        }}
      >
        <Fieldset className="flex items-center gap-2">
          <Field>
            <Input
              className={cn(
                "block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              )}
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </Field>
          <Button type="submit">Add New Task</Button>
        </Fieldset>
      </form>
    </div>
  );
};
