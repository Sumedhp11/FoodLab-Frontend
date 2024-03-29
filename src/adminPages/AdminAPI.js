export const getAllUsers = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_URL_API}/admin/users`);
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
export const getAllOrders = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_URL_API}/admin/orders`);
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
export const deleteUserById = async (userId) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_URL_API}/admin/deleteuser?userId=${userId}`
  );
  const data = await res.json();
  return data;
};
export const updateDeliveryStatus = async ({ orderId, deliveryStatus }) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_APP_URL_API
    }/admin/update-delivery-status?orderId=${orderId}&deliverystatus=${deliveryStatus}`,
    { method: "PUT" }
  );
  const data = await res.json();
  return data;
};
export const editrestaurant = async ({ formData, resId }) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_URL_API}/admin/edit-res/${resId}`,
      {
        method: "POST",

        body: formData,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const deleteres = async ({ resId }) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_URL_API}/admin/delete-res?resId=${resId}`,
    {
      method: "PUT",
    }
  );
  const data = await res.json();
  return data;
};
export const addnewrestaurant = async ({ formData }) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_URL_API}/admin/add-res`,
      {
        method: "POST",

        body: formData,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
