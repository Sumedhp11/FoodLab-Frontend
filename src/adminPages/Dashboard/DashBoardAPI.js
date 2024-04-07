export const getUserChartData = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_URL_API}/admin/user-monthly`
  );
  const data = await res.json();
  return data;
};
export const getOrderChartData = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_URL_API}/admin/order-monthly`
  );
  const data = await res.json();
  return data;
};

export const getPieChartData = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_URL_API}/admin/delivery-status-no`
  );
  const data = await res.json();
  return data;
};
