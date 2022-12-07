import { cartActions } from "./cart-clice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        "https://redux-http-bc782-default-rtdb.firebaseio.com/cartItems.json"
      );
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchHandler();
      console.log(cartData);
      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request Failed",
          type: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending Request To Database!",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      // Send state as Sending request

      const res = await fetch(
        "https://redux-http-bc782-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      await res.json();
      // Send state as Request is successful
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Request Sent Successfully!!",
          type: "success",
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request Failed",
          type: "error",
        })
      );
    }
  };
};

// export const sendCartData = (cart) => {
//   return async (dispatch) => {
//     dispatch(
//       uiActions.showNotification({
//         open: true,
//         message: "sending Request",
//         type: "warning",
//       })
//     );
//     const sendRequest = async () => {
//       // send state as sending rewuest

//       const res = await fetch(
//         "https://redux-http-bb20d-default-rtdb.firebaseio.com/cartItems.json",
//         { method: "PUT", body: JSON.stringify(cart) }
//       );
//       const data = await res.json();
//       //send state as request is successfull
//       dispatch(
//         uiActions.showNotification({
//           open: true,
//           message: "sent Request to database succefully",
//           type: "success",
//         })
//       );
//     };
//     try {
//       await sendRequest();
//     } catch (err) {
//       dispatch(
//         uiActions.showNotification({
//           open: true,
//           message: "sending Request failed",
//           type: "error",
//         })
//       );
//     }
