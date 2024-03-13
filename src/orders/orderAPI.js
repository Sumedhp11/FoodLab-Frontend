export const getOrdersByUserId = async ({ userId }) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_URL_API}/order/orderbyId?userId=${userId}`
    );
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
