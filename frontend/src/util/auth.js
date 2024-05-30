import { redirect } from "react-router";

export function getTokenDuration() {
  const storedExpirationToken = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationToken);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
}
export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}
export function checkAuthLoader() {
  const token = getToken();
  if (!token) {
    return redirect("/auth");
  }

  return null;
}
export function getUserId() {
  const userId = localStorage.getItem("idUser");
  return userId;
}
