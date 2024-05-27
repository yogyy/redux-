import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { AddProduct } from "./add-product";

export const ShowProducts = () => {
  const { title, price } = useSelector((state: RootState) => state.product);

  return (
    <div className="space-y-5 px-4">
      <h1 className="text-xl">{title}</h1>
      <p>${price}</p>
      <AddProduct />
    </div>
  );
};
