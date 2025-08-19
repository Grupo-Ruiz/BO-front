import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { usersApi } from '../../shared/api/usersApi';

// Tipos
interface User {
  id: string;
  name: string;
  email: string;
  roleName: string;
  sedeName: string;
  roleId: string;
  sedeId: string;
  status: string;
  createdAt: string;
}

interface Role {
  id: string;
  name: string;
}

interface Sede {
  id: string;
  name: string;
  address: string;
}

interface UsersState {
  users: User[];
  roles: Role[];
  sedes: Sede[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

// Estado inicial
const initialState: UsersState = {
  users: [],
  roles: [],
  sedes: [],
  selectedUser: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0
  }
};

// Thunks asíncronos
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await usersApi.getAll(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al obtener usuarios');
    }
  }
);

export const fetchUsersPaginated = createAsyncThunk(
  'users/fetchUsersPaginated',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await usersApi.getPaginated(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al obtener usuarios paginados');
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await usersApi.getById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al obtener usuario');
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await usersApi.create(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al crear usuario');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }: { id: string; userData: any }, { rejectWithValue }) => {
    try {
      const response = await usersApi.update(id, userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al actualizar usuario');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      await usersApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al eliminar usuario');
    }
  }
);

export const fetchRoles = createAsyncThunk(
  'users/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersApi.getRoles();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al obtener roles');
    }
  }
);

export const fetchSedes = createAsyncThunk(
  'users/fetchSedes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersApi.getHeadquarters();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al obtener sedes');
    }
  }
);

// Slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Fetch Users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Users Paginated
    builder
      .addCase(fetchUsersPaginated.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersPaginated.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsersPaginated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch User By ID
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create User
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update User
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete User
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
        if (state.selectedUser?.id === action.payload) {
          state.selectedUser = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Roles
    builder
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      });

    // Fetch Sedes
    builder
      .addCase(fetchSedes.fulfilled, (state, action) => {
        state.sedes = action.payload;
      });
  }
});

export const { clearError, clearSelectedUser, setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
