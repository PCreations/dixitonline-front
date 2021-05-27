import { createAsyncThunk } from '@reduxjs/toolkit';

export const newTurnCreated = createAsyncThunk('turn/newTurnCreated', (turn) => turn);
