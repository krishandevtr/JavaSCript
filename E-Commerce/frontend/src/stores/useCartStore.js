import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,
    getMyCoupon: async () => {
		try {
			const response = await axios.get("/coupons");
			set({ coupon: response.data });
		} catch (error) {
			console.error("Error fetching coupon:", error);
		}
	},
	applyCoupon: async (code) => {
		try {
			const response = await axios.post("/coupons/validate", { code });
			set({ coupon: response.data, isCouponApplied: true });
			get().calculateTotals();
			toast.success("Coupon applied successfully");
		} catch (error) {
            console.log("Error have triggered")
			toast.error(error.response?.data?.message || "Failed to apply coupon");
		}
	},
	removeCoupon: () => {
		set({ coupon: null, isCouponApplied: false });
		get().calculateTotals();
		toast.success("Coupon removed");
	},

    getCartItem: async () => {
        try {
            const res = await axios.get("/cart");
            set({ cart: res.data });
            console.log('This is the cartITems', res.data)
            get().calculateTotals();
        } catch (error) {
            set({ cart: [] });
            toast.error(error.response.data.message || "An error occurred");
        }
    },
    addToCart: async (product) => {
        try {
            await axios.post("/cart", { productId: product._id });
            toast.success("Product added to cart");

            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item._id === product._id);
                const newCart = existingItem
                    ? prevState.cart.map((item) =>
                        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                    : [...prevState.cart, { ...product, quantity: 1 }];
                return { cart: newCart };
            });
            get().calculateTotals();
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred");
        }
    },
    removeFromCart: async (productId) => {
        await axios.delete(`/cart`, { data: { productId } });
        set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
        get().calculateTotals();
    },
    calculateTotals: () => {
        const { cart, coupon } = get();
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let total = subtotal;

        if (coupon) {
            const discount = subtotal * (coupon.discountPercentage / 100);
            total = subtotal - discount;
        }

        set({ subtotal, total });
    },
    updateQuantity: async (productId, quantity) => {
        console.log("updateQuantity is called");
        try {
            if (quantity === 0) {
                get().removeFromCart(productId);
                return;
            }
            console.log("Before axios.put");
            const response = await axios.put(`/cart/${productId}`, { quantity });
            const updatedCartItems = response.data;
            console.log("Before axios.put");
            console.log("Cart before update", get().cart);
            set((prevState) => ({
                cart: prevState.cart.map((item) =>
                    item._id === productId ? { ...item, quantity } : item
                ),
                
            }));
            console.log("Cart before update", get().cart);
    
            get().calculateTotals();
        } catch (error) {
            console.error("Error updating quantity:", error.message);
        }
    },
	clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},
    
}));


export default useCartStore;