import { createTruck, getTrucks } from "@/api/trucksApi";
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Status } from "@/shared/types";
import { Truck } from "./types";

interface TrucksState {
  trucks: null | Truck[];
  status: { create: Status; getAll: Status };
  error: SerializedError | null;
  requestStatus: Record<string, Status>;
}

const initialState: TrucksState = {
  trucks: null,
  error: null,
  status: {
    create: "idle",
    getAll: "idle",
  },
  requestStatus: {},
};

const slice = createSlice({
  initialState,
  name: "truck",
  reducers: {},

  selectors: {
    selectById: (state, truckId) =>
      state.trucks!.find((truck) => truck.id === truckId),
  },

  extraReducers: (builder) => {
    builder.addCase(createTruckAction.pending, (state) => {
      state.status.create = "loading";
    });
    builder.addCase(createTruckAction.rejected, (state, action) => {
      state.status.create = "failed";
      state.error = action.error;
    });
    builder.addCase(createTruckAction.fulfilled, (state, action) => {
      state.status.create = "succeeded";
      if (state.trucks) state.trucks.push(action.payload);
      else state.trucks = [action.payload];
    });
    builder.addCase(getTrucksAction.fulfilled, (state, action) => {
      state.trucks = action.payload;
      state.requestStatus[action.meta.requestId] = "succeeded";
    });
    builder.addCase(getTrucksAction.pending, (state, action) => {
      state.requestStatus[action.meta.requestId] = "loading";
    });
    builder.addCase(getTrucksAction.rejected, (state, action) => {
      state.error = action.error;
      state.requestStatus[action.meta.requestId] = "failed";

    });
  },
});

export const createTruckAction = createAsyncThunk(
  "/trucks/create",
  createTruck
);

export const { selectors } = slice;

export const getTrucksAction = createAsyncThunk("trucks/get", getTrucks);

export default slice.reducer;
