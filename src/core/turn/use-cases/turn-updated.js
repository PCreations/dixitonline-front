import { createAsyncThunk } from '@reduxjs/toolkit';

export const turnUpdated = createAsyncThunk('turns/turnUpdated', (turn) => turn);
