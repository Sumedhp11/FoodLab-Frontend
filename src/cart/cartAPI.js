export const addtoCart = async ({ userId, quantity, dishId }) => {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_APP_URL_API
      }/cart/addtocart?userId=${userId}&quantity=${quantity}&dishId=${dishId}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchCartById = async ({ userId }) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_URL_API}/cart/getCart?userId=${userId}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkout = async ({
  amount,
  userId,
  selectedAddress,
  cartItems,
}) => {
  try {
    const res = await fetch(`http://localhost:8080/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        userId: userId,
        selectedAddress: selectedAddress,
        cartItems: cartItems,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addNewAddress = async (addressData) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_URL_API}/address/addnewaddress`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: addressData.addressData.userId,
          flatno: addressData.addressData.flatno,
          landmark: addressData.addressData.landmark,
          streetName: addressData.addressData.streetName,
          city: addressData.addressData.city,
          state: addressData.addressData.state,
          pincode: addressData.addressData.pincode,
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
