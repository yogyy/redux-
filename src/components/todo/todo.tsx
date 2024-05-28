import { cn } from "@/lib/utils";
import { TodoState } from "@/types";
import { Button, Textarea } from "@headlessui/react";
import { Status } from "./todo-status";
import { deleteTodo, updateTask } from "@/state/todo/todo-slice";
import { useDispatch } from "react-redux";
import { Fragment, useState } from "react";
import { useTextarea } from "@/hooks/use-adjust-textarea";

export const Todo = ({ todo }: { todo: TodoState }) => {
  const dispatch = useDispatch();
  const { textareaRef } = useTextarea();
  const [onEdit, setOnEdit] = useState(false);

  return (
    <li
      key={todo.id}
      className={cn(
        "flex h-fit w-full max-w-md gap-2 rounded-md border px-4 py-3",
        todo.status === "Pending" && "border-red-400 bg-red-400/[.02]",
        todo.status === "In-Progress" &&
          "border-emerald-400 bg-emerald-400/[.02]",
        todo.status === "Completed" && "border-sky-400 bg-sky-400/[.02]",
      )}
    >
      <Textarea as={Fragment}>
        {() => (
          <textarea
            ref={textareaRef}
            name="todo"
            className={cn(
              "hide-scrollbar block h-fit w-full resize-none overflow-y-hidden text-pretty rounded-lg border-none bg-transparent px-3 py-1.5 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2",
              onEdit && "bg-white/5",
              !onEdit && "cursor-default",
            )}
            defaultValue={todo.task}
            maxLength={255}
            readOnly={!onEdit}
          />
        )}
      </Textarea>
      <div className="flex flex-shrink flex-col gap-2">
        <Status todo={todo} />
        <div className="flex items-center gap-2 self-end [&>button]:px-2">
          {onEdit === false ? (
            <Button disabled={onEdit} onClick={() => setOnEdit((p) => !p)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </Button>
          ) : (
            <Button
              disabled={!onEdit}
              onClick={() => {
                setOnEdit((p) => !p);
                dispatch(
                  updateTask({
                    id: todo.id,
                    task: textareaRef.current?.value as string,
                  }),
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </Button>
          )}

          <Button
            className="h-fit self-end"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-5 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </Button>
        </div>
      </div>
    </li>
  );
};
