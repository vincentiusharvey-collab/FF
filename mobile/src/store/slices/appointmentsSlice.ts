import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppointmentsState {
  appointments: any[];
  upcomingAppointments: any[];
  isLoading: boolean;
}

const initialState: AppointmentsState = {
  appointments: [],
  upcomingAppointments: [],
  isLoading: false,
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (state, action: PayloadAction<any[]>) => {
      state.appointments = action.payload;
      state.upcomingAppointments = action.payload.filter(
        a => new Date(a.scheduledDate) >= new Date() && a.status !== 'CANCELLED'
      );
    },
    addAppointment: (state, action: PayloadAction<any>) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action: PayloadAction<any>) => {
      const index = state.appointments.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAppointments, addAppointment, updateAppointment, setLoading } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
