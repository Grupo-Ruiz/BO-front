import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Tipos
interface UIState {
  loading: boolean;
  globalError: string | null;
  notifications: Notification[];
  modals: {
    userForm: boolean;
    confirmDelete: boolean;
  };
  sidebar: {
    isOpen: boolean;
    activeModule: string;
  };
  theme: 'light' | 'dark';
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

// Estado inicial
const initialState: UIState = {
  loading: false,
  globalError: null,
  notifications: [],
  modals: {
    userForm: false,
    confirmDelete: false
  },
  sidebar: {
    isOpen: true,
    activeModule: 'dashboard'
  },
  theme: 'light'
};

// Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setGlobalError: (state, action: PayloadAction<string | null>) => {
      state.globalError = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString()
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    toggleModal: (state, action: PayloadAction<keyof UIState['modals']>) => {
      const modal = action.payload;
      state.modals[modal] = !state.modals[modal];
    },
    setModal: (state, action: PayloadAction<{ modal: keyof UIState['modals']; isOpen: boolean }>) => {
      const { modal, isOpen } = action.payload;
      state.modals[modal] = isOpen;
    },
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebar.isOpen = action.payload;
    },
    setActiveModule: (state, action: PayloadAction<string>) => {
      state.sidebar.activeModule = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    }
  }
});

export const {
  setLoading,
  setGlobalError,
  addNotification,
  removeNotification,
  clearNotifications,
  toggleModal,
  setModal,
  toggleSidebar,
  setSidebarOpen,
  setActiveModule,
  setTheme
} = uiSlice.actions;

export default uiSlice.reducer;
