import { configureStore } from "@reduxjs/toolkit";
import driversReducer from "./features/drivers/driversSlice";
import trucksReducer from "./features/trucks/truckSlice";
import tripsReducer from "./features/trips/tripsSlice";
import bottomTabsBarReducer from "./navigation/bottomTabsBarSlice";

export const store = configureStore({
  reducer: {
    bottomTabsBar: bottomTabsBarReducer,
    driver: driversReducer,
    truck: trucksReducer,
    trip: tripsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
