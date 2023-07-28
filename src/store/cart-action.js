import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://...firebasedatabase.app/cart.json");
      if (!response.ok) {
        throw new Error("fetching data failed")
      }
      const data = await response.json();

      return data;
    }

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity 
      }));
    } catch(error) {
      dispatch(
        uiActions.showNotification({
        status: "error",
        title: "error",
        message: "sending cart data error",
      }))
    }

  }
}


export const sendCartData = (cart) => {
  return async ( dispatch ) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending",
        message: "sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://...firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}) }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "sending cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "sending cart data error",
        })
      );
    }
  };
};