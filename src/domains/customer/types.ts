export type ReserveFormState =
  | { status: "idle" }
  | { status: "success"; message?: string }
  | { status: "error"; message?: string };
