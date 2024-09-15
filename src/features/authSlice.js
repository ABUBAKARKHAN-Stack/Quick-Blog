// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state with status and userData
const initialState = {
  status: false,
  userData: null,
};

// Function to generate a random color
function generateRandomColor() {
  return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;
}

// Function to get or assign a profile color for a user
function getProfileColor(userID) {
  try {
    // Retrieve the stored colors from localStorage
    const storedColors = JSON.parse(localStorage.getItem('userColors')) || {};

    // Check if the user already has a color
    if (!storedColors[userID]) {
      // Assign a new color if the user is new
      storedColors[userID] = generateRandomColor();
      // Save the updated colors back to localStorage
      localStorage.setItem('userColors', JSON.stringify(storedColors));
    }

    // Return the existing or newly assigned color
    return storedColors[userID];
  } catch (error) {
    console.error("Error accessing user colors:", error);
    // Return a default color in case of an error
    return "#000000";
  }
}

// Create the auth slice with initial state and reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login reducer to handle user login and profile color assignment
    login: (state, action) => {
      // Extract user data from the action payload
      const user = action.payload;

      // Generate or get the profile color for the user
      const profileColor = getProfileColor(user.$id);

      // Update the state with login status and user data including profile color
      state.status = true;
      state.userData = { ...user, profileColor };
    },
    // Logout reducer to handle user logout
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
