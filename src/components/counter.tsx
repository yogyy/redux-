import { decrement, incrementAsync } from "@/state/counter/counter-slice";
import { AppDispatch, RootState } from "@/state/store";
import { Button } from "@headlessui/react";

import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="min-h-dvh w-full">
      <h1 className="text-4xl text-white">{count}</h1>
      <div className="flex gap-2">
        <Button onClick={() => dispatch(incrementAsync(1))}>Tambah</Button>
        <Button onClick={() => dispatch(decrement())}>Kurang</Button>
      </div>
    </div>
  );
};

export default Counter;
