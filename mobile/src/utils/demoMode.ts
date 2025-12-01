// Demo mode utilities for app review
import { mockUser, mockTokens, mockPets, mockAppointments, mockCareTasks, mockVaccinations, mockMedicalRecords } from '../services/mockData';

export const DEMO_MODE = true; // Set to true for demo/review

export function getMockResponse(endpoint: string, params?: any) {
  // Mock API responses
  const responses: Record<string, any> = {
    '/auth/login': {
      success: true,
      data: {
        user: mockUser,
        tokens: mockTokens,
      },
    },
    '/auth/register': {
      success: true,
      data: {
        user: mockUser,
        tokens: mockTokens,
      },
    },
    '/pets': {
      success: true,
      data: mockPets,
    },
    '/appointments': {
      success: true,
      data: mockAppointments,
    },
    '/care/tasks': {
      success: true,
      data: mockCareTasks,
    },
  };

  // Dynamic endpoints
  if (endpoint.includes('/pets/')) {
    const petId = endpoint.split('/pets/')[1].split('/')[0];
    const pet = mockPets.find(p => p.id === petId);

    if (endpoint.includes('/vaccinations')) {
      return { success: true, data: mockVaccinations };
    }
    if (endpoint.includes('/records')) {
      return { success: true, data: mockMedicalRecords };
    }
    return { success: true, data: pet };
  }

  return responses[endpoint] || { success: false, message: 'Not found' };
}
