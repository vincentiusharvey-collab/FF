import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PetsState {
  pets: any[];
  selectedPet: any | null;
  isLoading: boolean;
}

const initialState: PetsState = {
  pets: [],
  selectedPet: null,
  isLoading: false,
};

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setPets: (state, action: PayloadAction<any[]>) => {
      state.pets = action.payload;
    },
    setSelectedPet: (state, action: PayloadAction<any>) => {
      state.selectedPet = action.payload;
    },
    addPet: (state, action: PayloadAction<any>) => {
      state.pets.push(action.payload);
    },
    updatePet: (state, action: PayloadAction<any>) => {
      const index = state.pets.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.pets[index] = action.payload;
      }
    },
    removePet: (state, action: PayloadAction<string>) => {
      state.pets = state.pets.filter(p => p.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setPets, setSelectedPet, addPet, updatePet, removePet, setLoading } = petsSlice.actions;
export default petsSlice.reducer;
