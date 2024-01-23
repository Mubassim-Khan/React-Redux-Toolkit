import { useDispatch, useSelector } from "react-redux";
import { CartContainer } from "./components/CartContainer";
import { Navbar } from "./components/Navbar";
import { totalPayable } from "./features/cart/cartSlice";
import { useEffect } from "react";
import { Modal } from "./components/Modal";

function App() {
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalPayable());
  }, [cartItems]);

  return (
    <>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </>
  );
}
export default App;
