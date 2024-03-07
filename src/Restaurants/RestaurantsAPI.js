export const getAllRestaurants = async ({ page = 0, search, resId }) => {
  try {
    let url = `${import.meta.env.VITE_APP_URL_API}/restaurants?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }
    if (resId) {
      url += `&resId=${resId}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getResMenu = async ({ resId, search, page = 0 }) => {
  try {
    let url = `${
      import.meta.env.VITE_APP_URL_API
    }/restaurants/menu?resId=${resId}&page=${page}`;

    // Append search query to the URL if provided
    if (search) {
      url += `&search=${search}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
