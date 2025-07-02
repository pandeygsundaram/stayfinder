"use client"

// Helper to get token if you store it in localStorage (customize if using cookies)
export const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});