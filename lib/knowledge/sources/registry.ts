import { createStore } from "../shared/store";
import type { Source } from "./types";

const store = createStore<Source>();

export const registerSource = store.register;
export const registerSources = store.registerMany;
export const getSource = store.get;
export const getAllSources = store.getAll;
export const getSourceOverwrittenIds = store.getOverwrittenIds;
