import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { Driver } from "./types";
import { Status } from "@/shared/types";
import { createDriver, getDrivers } from "@/api/driversApi";

interface DriverState {
  drivers: Driver[] | null;
  error: SerializedError | null;
  status: {
    create: Status;
    getAll: Status;
  };
  requestStatus: Record<string, Status>;
}

const initialState: DriverState = {
  drivers: null,
  error: null,
  status: { create: "idle", getAll: "idle" },
  requestStatus: {},
};

const slice = createSlice({
  name: "drivers",
  initialState,
  reducers: {},
  selectors: {
    selectById: (state, id) =>
      state.drivers!.find((driver) => driver.id === id),
  },
  extraReducers: (builder) => {
    builder.addCase(createDriverAction.pending, (state) => {
      state.status.create = "loading";
    });
    builder.addCase(createDriverAction.fulfilled, (state, action) => {
      if (state.drivers == null) state.drivers = [];
      state.drivers.push(action.payload);
      state.status.create = "succeeded";
    });
    builder.addCase(createDriverAction.rejected, (state, action) => {
      state.status.create = "failed";
      console.error(action.error);
    });

    builder.addCase(getDriversAction.pending, (state, action) => {
      state.status.getAll = "loading";
      state.requestStatus[action.meta.requestId] = "loading";
    });
    builder.addCase(getDriversAction.fulfilled, (state, action) => {
      state.status.getAll = "succeeded";
      state.drivers = action.payload;
      state.requestStatus[action.meta.requestId] = "succeeded"
    });
    builder.addCase(getDriversAction.rejected, (state, action) => {
      state.status.getAll = "failed";
      state.error = action.error;
    });
  },
});

export default slice.reducer;
export const { selectById } = slice.selectors;

export const createDriverAction = createAsyncThunk(
  "drivers/create",
  createDriver
);

export const getDriversAction = createAsyncThunk("/drivers/getAll", getDrivers);
