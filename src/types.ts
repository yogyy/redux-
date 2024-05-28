export interface ProductState {
  title: string;
  price: string | number;
}

export type TodoStatus = "In-Progress" | "Completed" | "Pending";

export interface TodoState {
  id: string;
  task: string;
  status: TodoStatus;
}
