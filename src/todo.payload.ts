export type CreateTodoPayload = {
  title: string;
  note: string;
};

export type UpdateTodoPayload = {
  id: string;
  title: string;
  note: string;
};
