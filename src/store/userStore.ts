import { proxy, subscribe } from "valtio";

export const userState = proxy({
  name: "",
  email: "",
});

if (typeof window !== "undefined") {
  userState.name = localStorage.getItem("userName") || "";
  userState.email = localStorage.getItem("userEmail") || "";
}

subscribe(userState, () => {
  localStorage.setItem("userName", userState.name);
  localStorage.setItem("userEmail", userState.email);
});
