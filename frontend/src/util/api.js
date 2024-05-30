import { json } from "react-router";
import { redirect } from "react-router";
import { addHours } from "date-fns";
import { getToken } from "./auth";
import toast from "react-hot-toast";

export async function authenticate(mode, data) {
  try {
    let url = "";
    let successMessage = "";

    if (mode === "signup") {
      url = "https://christmas-app-xi.vercel.app/auth/signup";
      successMessage = "Sign Up successfully! \n Please now logged in!";
    } else if (mode === "login") {
      url = "https://christmas-app-xi.vercel.app/auth/login";
      successMessage = "Successfully logged in!";
    } else {
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 401 || response.status === 422) {
        return toast.error(errorData.message);
      } else {
        throw json({ message: "Internal Server Error" });
      }
    } else {
      if (mode === "signup") {
        toast.success(successMessage);
        return redirect("/auth?mode=login");
      } else {
        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        let expiration = new Date();
        const expirationToken = addHours(expiration, 1);
        localStorage.setItem("expiration", expirationToken.toISOString());
        localStorage.setItem("idUser", responseData.userId);
        return redirect("/home");
      }
    }
  } catch (error) {
    throw json({ message: "Internal Server Error" });
  }
}
export async function updateUserProfile(data) {
  try {
    const token = getToken();
    const response = await fetch(
      "https://christmas-app-xi.vercel.app/profile",
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw json({ message: "Could not upload data" });
    } else {
      return redirect("/profile");
    }
  } catch (error) {
    throw json({ message: "Internal Server Error" });
  }
}
export async function fetchUserProfile() {
  try {
    const token = getToken();
    if (!token) {
      return redirect("/auth");
    }
    const response = await fetch(
      "https://christmas-app-xi.vercel.app/profile",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (!response.ok) {
      throw json({ message: "Could not fetch user data" });
    } else {
      return response.json();
    }
  } catch (error) {
    throw json({ message: "Internal Server Error" });
  }
}

export async function fetchLevelInfo() {
  try {
    const token = getToken();
    if (!token) {
      return redirect("/auth");
    }
    const response = await fetch(
      "https://christmas-app-xi.vercel.app/game/level/info",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw json({ message: "Could not fetch level data" });
    } else {
      return await response.json();
    }
  } catch (error) {
    throw json({ message: "Could not fetch level data" });
  }
}

export async function updateUserLevel(level) {
  try {
    const token = getToken();
    level++;
    const response = await fetch(
      "https://christmas-app-xi.vercel.app/game/level",
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level }),
      }
    );
    if (!response.ok) {
      throw json({ message: "Could not update level data" });
    } else {
      return response.json();
    }
  } catch (error) {
    throw json({ message: "Could not update level data" });
  }
}

export async function checkUserProgress() {
  try {
    const token = getToken();
    const response = await fetch(
      "https://christmas-app-xi.vercel.app/game/level",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw json({ message: "Could not fetch user progress data" });
    } else {
      return response.json();
    }
  } catch (error) {
    throw json({ message: "Could not fetch user progress data" });
  }
}

export async function fetchLevelData(level) {
  try {
    const token = getToken();
    const response = await fetch(
      `https://christmas-app-xi.vercel.app/game/level/${level}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw json({ message: "Could not fetch user level data" });
    } else {
      return response.json();
    }
  } catch (error) {
    throw json({ message: "Could not fetch user level data" });
  }
}

export async function checkResultGameLevel(level, data) {
  try {
    const token = getToken();
    const response = await fetch(
      `https://christmas-app-xi.vercel.app/game/level/${level}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw json({ message: "Could not check result game data" });
    } else {
      return response.json();
    }
  } catch (error) {
    throw json({ message: "Could not check result game data" });
  }
}
