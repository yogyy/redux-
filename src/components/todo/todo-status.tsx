import { cn } from "@/lib/utils";
import { updateStatus } from "@/state/todo/todo-slice";
import { TodoState, TodoStatus } from "@/types";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const STATS: TodoStatus[] = ["Pending", "In-Progress", "Completed"];
interface StatusProps {
  todo: TodoState;
}
export function Status({ todo }: StatusProps) {
  const [selected, setSelected] = useState(todo.status);
  const dispatch = useDispatch();

  return (
    <div className="w-full">
      <Listbox
        value={selected}
        onChange={(sel) => {
          dispatch(updateStatus({ id: todo.id, status: sel }));
          setSelected(sel);
        }}
      >
        <ListboxButton
          className={cn(
            "text-text-center relative block w-32 rounded-lg bg-white/5 py-1.5 pl-3 pr-8 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
          )}
        >
          {selected}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="group pointer-events-none absolute right-2.5 top-2.5 size-4"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </ListboxButton>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            anchor="bottom"
            className="w-[var(--button-width)] rounded-xl border border-white/5 bg-[#0b1215] p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            {STATS.map((status) => (
              <ListboxOption
                key={status}
                value={status}
                className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
              >
                <div className="text-sm/6 text-white">{status}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  );
}
