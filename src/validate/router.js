
import Home from "../screens/home/HomeScreen";

import SignIn from "../screens/auth/SignInScreen";
import SignUp from "../screens/auth/SignUpScreen";
import Reset from "../screens/auth/ResetScreen";
import ChangePassword from "../screens/auth/ChangePasswordScreen";
import CheckMail from "../screens/auth/CheckMailScreen";
import Verification from "../screens/auth/VerificationScreen";
import NotFound from "../screens/error/NotFoundScreen";
import ProductList from "../screens/product/ProductListScreen";
import ProductDetails from "../screens/product/ProductDetailsScreen";
import Cart from "../screens/cart/CartScreen";
import CartEmpty from "../screens/cart/CartEmptyScreen";
import Checkout from "../screens/checkout/CheckoutScreen";
import Order from "../screens/user/OrderListScreen";
import OrderDetail from "../screens/user/OrderDetailScreen";
import WishList from "../screens/user/WishListScreen";
import WishListEmpty from "../screens/user/WishListEmptyScreen";
import Confirm from "../screens/user/ConfirmScreen";
import Account from "../screens/user/AccountScreen";
import Address from "../screens/user/AddressScreen";
import ProtectedRoute from "../provider/Protected";



const routes = [
    { path: "/", element: Home },
    { path: "/product/detail/:id", element: ProductDetails },
    { path: "/product/:type", element: ProductList },
    { path: "/cart", element: Cart },
    { path: "/empty_cart", element: CartEmpty },
    { path: "/sign_in", element: SignIn },
    { path: "/sign_up", element: SignUp },
    { path: "/verification", element: Verification },
    { path: "/reset", element: Reset },
    { path: "/check_mail", element: CheckMail },
    { path: "/change_password", element: ChangePassword },
    { path: "*", element: NotFound },
    { path: "/empty_wishlist", element: WishListEmpty },

    // element: ProtectedRoute,

    // Auth
    { path: "/checkout", element: Checkout },
    { path: "/order", element: ProtectedRoute, children: Order },
    { path: "/order_detail", element: ProtectedRoute, children: OrderDetail },
    { path: "/wishlist", element: ProtectedRoute, children: WishList },
    { path: "/confirm", element: ProtectedRoute, children: Confirm },
    { path: "/account", element: ProtectedRoute, children: Account },
    { path: "/account/add", element: ProtectedRoute, children: Address },
];

export default routes;
