export const getAllFavourites = async ({ userId }) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_URL_API}/fav/getfavByUser?userId=${userId}`
    );
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const toggleFavRes = async ({ resId, userId }) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_URL_API}/fav/toggle-restaurants`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          resId: resId,
        }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const toggleFavDish = async ({ dishId, userId }) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_URL_API}/fav/toggle-dishes`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          dishId: dishId,
        }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
