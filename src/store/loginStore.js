import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";



/**
 * Creates a Zustand store to handle user actions and state updates.
 */
const loginStore = create((set, get) => ({
    
  loginLoader: false,
  payload: null,
  token: null,
  user: null,
  error: null,

  /**
   * Authenticates user with API.
   * @param {Object} formData - User login credentials.
   * @return {Promise<Object>} API response.
   */
  async authenticateUser(formData) {
    set({ loginLoader: true });

    console.log("in login auth");
    
    try {
      const response = await axios.post(
        `${process.env.API}/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      set({
        loginLoader: false,
        token: response.data.data.token,
        payload: response.data.data,
      });
      return response;
    } catch (error) {
      set({
        loginLoader: false,
      });

      toast.error("Login failed!");
    }
  },

}));

export default loginStore;
