import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.API_URL || 'http://localhost:3000/api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Pet', 'MedicalRecord', 'Appointment', 'CareTask', 'Notification'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // Pet endpoints
    getPets: builder.query({
      query: () => '/pets',
      providesTags: ['Pet'],
    }),
    getPetById: builder.query({
      query: (id) => `/pets/${id}`,
      providesTags: ['Pet'],
    }),
    createPet: builder.mutation({
      query: (petData) => ({
        url: '/pets',
        method: 'POST',
        body: petData,
      }),
      invalidatesTags: ['Pet'],
    }),
    updatePet: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/pets/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Pet'],
    }),

    // Medical Record endpoints
    getMedicalRecords: builder.query({
      query: (petId) => `/medical/pets/${petId}/records`,
      providesTags: ['MedicalRecord'],
    }),
    getVaccinations: builder.query({
      query: (petId) => `/medical/pets/${petId}/vaccinations`,
      providesTags: ['MedicalRecord'],
    }),
    getPrescriptions: builder.query({
      query: (petId) => `/medical/pets/${petId}/prescriptions`,
      providesTags: ['MedicalRecord'],
    }),

    // Appointment endpoints
    getAppointments: builder.query({
      query: () => '/appointments',
      providesTags: ['Appointment'],
    }),
    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: '/appointments',
        method: 'POST',
        body: appointmentData,
      }),
      invalidatesTags: ['Appointment'],
    }),

    // Care Task endpoints
    getCareTasks: builder.query({
      query: () => '/care/tasks',
      providesTags: ['CareTask'],
    }),
    createCareTask: builder.mutation({
      query: (taskData) => ({
        url: '/care/tasks',
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: ['CareTask'],
    }),
    completeCareTask: builder.mutation({
      query: (taskId) => ({
        url: `/care/tasks/${taskId}/complete`,
        method: 'POST',
      }),
      invalidatesTags: ['CareTask'],
    }),

    // Notification endpoints
    getNotifications: builder.query({
      query: () => '/communications/notifications',
      providesTags: ['Notification'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetPetsQuery,
  useGetPetByIdQuery,
  useCreatePetMutation,
  useUpdatePetMutation,
  useGetMedicalRecordsQuery,
  useGetVaccinationsQuery,
  useGetPrescriptionsQuery,
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useGetCareTasksQuery,
  useCreateCareTaskMutation,
  useCompleteCareTaskMutation,
  useGetNotificationsQuery,
} = api;
