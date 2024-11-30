// store/useBookingStore.js
import { create } from "zustand";
const useBookingStore = create((set) => ({
  bookings: [],
  addBooking: (newBooking) => set((state) => ({ bookings: [...state.bookings, newBooking] })),
  removeBooking: (bookingId) => set((state) => ({
    bookings: state.bookings.filter((booking) => booking.id !== bookingId),
  })),
  resetBookings: () => set({ bookings: [] }),
}));

export default useBookingStore;
