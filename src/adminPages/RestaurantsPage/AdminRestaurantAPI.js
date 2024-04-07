export const adminRestaurantsList = async (page) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_URL_API}/admin/allrestaurants?page=${page}`
  );
  const data = await res.json();
  return data?.data;
};
