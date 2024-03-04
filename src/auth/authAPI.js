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
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const signupAPI = async (createUser) => {
  console.log(createUser);
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
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
