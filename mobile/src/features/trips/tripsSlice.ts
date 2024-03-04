import { createTrip, getTrips } from "@/api/tripsApi";
import {
  ActionReducerMapBuilder,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Trip } from "./types";
import { Status } from "@/shared/types";

interface TripState {
  trips: null | Trip[];
  requestStatus: Record<string, Status>;
  error: SerializedError | null;
}

const initialState: TripState = { trips: null, requestStatus: {}, error: null };

const slice = createSlice({
  name: "trip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getTripsExtraReducers(builder);
    builder.addCase(createTripAction.pending, (state, action) => {
      state.requestStatus[action.meta.requestId] = "loading";
    });
    builder.addCase(createTripAction.fulfilled, (state, action) => {
      state.requestStatus[action.meta.requestId] = "succeeded";
      state.trips?.push(action.payload);
    });
    builder.addCase(createTripAction.rejected, (state, action) => {
      state.requestStatus[action.meta.requestId] = "failed";
      state.error = action.error;
    });
  },
});

export const createTripAction = createAsyncThunk("trips/create", createTrip);



export const getTripsAction = createAsyncThunk("trucks/getAll", getTrips);

function getTripsExtraReducers(builder: ActionReducerMapBuilder<TripState>) {
  builder.addCase(getTripsAction.pending, (state, action) => {
    state.requestStatus[action.meta.requestId] = "loading";
  });
  builder.addCase(getTripsAction.fulfilled, (state, action) => {
    state.requestStatus[action.meta.requestId] = "succeeded";
    state.trips = action.payload;
  });
  builder.addCase(getTripsAction.rejected, (state, action) => {
    state.requestStatus[action.meta.requestId] = "succeeded";
    state.error = action.error;
  });
}

export default slice.reducer;
