import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getAppointmentService = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/get-appointments`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching calendar events');
    }
  };

export const deleteAppointmentService = async (appointmentId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/delete-appointment/${appointmentId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting appointment');
    }
  };

export const addAppointmentService = async (eventData) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/add-appointment`, eventData);
        return response.data;
      } catch (error) {
        throw new Error('Error adding event to calendar');
      }
  };

  export const updateAppointmentService = async (eventId, eventData) => {
      try {
        const response = await axios.put(`${API_BASE_URL}/events/${eventId}`, eventData);
        return response.data;
      } catch (error) {
        throw new Error('Error updating event in calendar');
      }
  };

  export const getUpcomingEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/upcoming`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching upcoming events');
    }
  };
