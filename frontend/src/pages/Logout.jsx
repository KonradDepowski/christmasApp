import { redirect } from "react-router";

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("idUser");
  localStorage.removeItem("expiration");
  localStorage.removeItem("levelFirstData");
  localStorage.removeItem("levelSecondData");
  localStorage.removeItem("levelThirdData");
  localStorage.removeItem("levelFourthData");
  return redirect("/home");
}
