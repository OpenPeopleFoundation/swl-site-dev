import { setupWorker } from "msw/browser";
import { posHandlers } from "@/mocks/handlers/pos";

export const worker = setupWorker(...posHandlers);

