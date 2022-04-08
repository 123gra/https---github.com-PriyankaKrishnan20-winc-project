const commonUrl = '/api/v1';
export const apiLoginURL = {
    registerWithEmail: () =>`/user-register`,
    customLogin: () =>`/user-login`,
    forgotPassword: () => `/forgot-password`,
    newPassword:()=>`/new-password`,
    verifyToken:()=>`/verify-token`,
    getUser:(userId: null)=>`/getUser/${userId}`,
    editUser:()=>`/user-edit`,
    getAllEvents: () => `${commonUrl}/events/getAll`,
    getEventById: (id: string) => `${commonUrl}/events/${id}`,
    getVenueById: (id: string) => `${commonUrl}/venue/${id}`,
    bookSlot: () => `${commonUrl}/book`,
    getBookingById: (id: string) => `${commonUrl}/book/${id}`
};