/* eslint-disable no-useless-catch */
export const loginAPI = async (loginData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_API}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch data");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const signupAPI = async (createUser) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_API}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUser),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
