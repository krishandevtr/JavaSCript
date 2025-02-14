import { create } from "zustand"
import axios from "../lib/axios"
import { toast } from "react-hot-toast"

export  const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,
    signup: async (name,email,password,confirmPassword) => {
        console.log("Hit the signup function ")
        console.log(name,email,password,confirmPassword)
        set({loading:true});
        if(password !== confirmPassword){
            console.log("Password is not correct")
            set({loading:false})
            return toast.error("Password do not match ")
        }
        console.log("password matched")
        try {
            console.log("Gonna sent the post request to the ")
            const res = await axios.post("/auth/signup", { name, email, password });
            set({user:res.data.user,loading:false})
            console.log(get().user)
        } catch (error) {
            set({loading:false});
            toast.error(error.response.data.message ||"An Error occurred,Try later "); 
        }

    },
    login:async (email,password)=>{
        set({loading:true});
        try {
            const res = await axios.post("/auth/login",{email,password});
            if(!res) return toast.error("Error occurred in the backend");
            set({loading:false})
            set({user:res.data.user})
            console.log(get().user,"User logged in successfully")
            
        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.message );
            
        }

    },
    checkAuth:async ()=>{
        set({checkingAuth:true});
        try {
            const res = await axios.get("/auth/profile");
            set({user:res.data.user,checkingAuth:false})
        } catch (error) {
            set({user:null,checkingAuth:false});            
        }
    },
    logout:async()=>{
        try {
            set({user:null});
            const res = await axios.post("/auth/logout");
            set({user:null});
        } catch (error) {
            toast.error(error.response?.data?.message || "An Error occurred during logout")
        }
    },
    refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));

//Axios interceptor for the token refresh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);



