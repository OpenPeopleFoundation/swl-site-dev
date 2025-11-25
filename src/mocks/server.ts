import { setupServer } from "msw/node";
import { posHandlers } from "@/mocks/handlers/pos";

export const server = setupServer(...posHandlers);

