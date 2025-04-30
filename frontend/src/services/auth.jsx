// src/utils/tokenUtil.js
import { jwtDecode } from 'jwt-decode';

export function getToken() {
  return localStorage.getItem("token");
}

export function decodeToken(token) {
  try {
    return jwtDecode(token); // Correct usage
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}
