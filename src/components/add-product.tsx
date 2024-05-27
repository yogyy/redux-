import { cn } from "@/lib/utils";

import { ProductState } from "@/types";
import { Button, Field, Fieldset, Input, Label } from "@headlessui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "./modal";
import { update } from "@/state/product/product-slice";

export const AddProduct = () => {
  const [product, setProduct] = useState<ProductState>({
    title: "",
    price: "",
  });

  const dispatch = useDispatch();
  const setTitle = (title: string) => {
    setProduct((prev) => ({ ...prev, title }));
  };

  const setPrice = (price: number | string) => {
    setProduct((prev) => ({ ...prev, price }));
  };
  return (
    <Modal
      title="Add New Product"
      content={
        <form
          className="w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(update(product));
            setTitle("");
            setPrice("");
          }}
        >
          <Fieldset className="space-y-2">
            <Field>
              <Label className="text-sm/6 font-medium text-white">
                Product Name
              </Label>
              <Input
                className={cn(
                  "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                )}
                value={product.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field>
              <Label className="text-sm font-medium text-white">
                Product Price
              </Label>
              <Input
                type="number"
                className={cn(
                  "mt-3 block w-full overflow-hidden rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                )}
                value={product.price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Field>
            <Button type="submit">Submit</Button>
          </Fieldset>
        </form>
      }
    >
      Add Product
    </Modal>
  );
};
