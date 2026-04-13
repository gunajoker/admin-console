import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const ADMIN_AUTH_TOKEN_KEY = "zulope.admin.token";

type DecodedAdminToken = {
  role?: string;
  number?: number;
};

type AuthState = {
  token: string | null;
  profileName: string | null;
  number: string | null;
};

function decodeJwtPayload(token: string): DecodedAdminToken | null {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = window.atob(normalizedPayload);

    return JSON.parse(decodedPayload) as DecodedAdminToken;
  } catch {
    return null;
  }
}

function getProfileFromToken(token: string | null) {
  if (!token) {
    return {
      profileName: null,
      number: null,
    };
  }

  const payload = decodeJwtPayload(token);

  return {
    profileName: payload?.role === "admin" ? "Admin" : "User",
    number: payload?.number ? String(payload.number) : null,
  };
}

const storedToken = window.localStorage.getItem(ADMIN_AUTH_TOKEN_KEY);
const storedProfile = getProfileFromToken(storedToken);

const initialState: AuthState = {
  token: storedToken,
  profileName: storedProfile.profileName,
  number: storedProfile.number,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      const profile = getProfileFromToken(action.payload);
      state.profileName = profile.profileName;
      state.number = profile.number;
      window.localStorage.setItem(ADMIN_AUTH_TOKEN_KEY, action.payload);
    },
    clearAuthToken(state) {
      state.token = null;
      state.profileName = null;
      state.number = null;
      window.localStorage.removeItem(ADMIN_AUTH_TOKEN_KEY);
    },
  },
});

export const { setAuthToken, clearAuthToken } = authSlice.actions;
export default authSlice.reducer;
