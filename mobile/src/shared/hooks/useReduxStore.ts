import { AppDispatch, RootState } from "@/store";
import {
  useDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default function useReduxStore() {
  const dispatch = useDispatch<AppDispatch>();

  return { dispatch, useSelector };
}
