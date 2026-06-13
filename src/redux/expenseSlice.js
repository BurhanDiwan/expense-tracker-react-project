import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  } catch (error) {
    console.error('Failed to load expenses from localStorage:', error);
    return [];
  }
};

const saveToLocalStorage = (expenses) => {
  try {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  } catch (error) {
    console.error('Failed to save expenses to localStorage:', error);
  }
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: loadFromLocalStorage(),
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      saveToLocalStorage(state.expenses);
    },

    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      saveToLocalStorage(state.expenses);
    },

    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
        saveToLocalStorage(state.expenses);
      }
    },
  },
});

export const { addExpense, deleteExpense, updateExpense } = expenseSlice.actions;
export default expenseSlice.reducer;