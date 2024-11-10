import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

// layouts
import BaseLayout from "./components/layout/BaseLayout";
import { GlobalStyles } from "./styles/global/GlobalStyles";
import routes from "./validate/router";
import { useEffect, useState } from "react";
import LoadingComponent from "./components/common/Loading";
import { tokenUtils } from "./utils/token";
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import queryClient from "./query/queryCache";


// function AuthWrapper({ children }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   // const location = useLocation();


//   useEffect(() => {
//     const verifyAuth = async () => {
//       const accessToken = tokenUtils.getToken();

//       if (accessToken) {
//         navigate('/account');
//         setIsLoading(false);

//         return;
//       }

//       const refreshTokenValue = tokenUtils.getRefreshToken();

//       if (!accessToken && refreshTokenValue) {
//         try {
//           await tokenUtils.refreshAccessToken();
//           // Khôi phục URL hiện tại sau khi refresh token thành công
//           // window.history.replaceState(null, '', currentUrl);
//         } catch (error) {
//           // localStorage.setItem('lastVisitedUrl', currentUrl);
//           navigate('/sign_in');
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         // Lưu URL hiện tại trước khi chuyển hướng đến trang đăng nhập
//         // localStorage.setItem('lastVisitedUrl', currentUrl);
//         navigate('/');
//         setIsLoading(false);

//       }
//     };

//     verifyAuth();

//   }, [navigate]);

//   if (isLoading) {
//     return <div><LoadingComponent /></div>;
//   }

//   return children;
// }


function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Router>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<BaseLayout />}>
              {routes.map(({ path, element: Element, children }, index) => (
                children ? (
                  <Route key={index} path={path} element={<Element element={children} />} />
                ) : (
                  <Route key={index} path={path} element={<Element />} />
                )
              ))}
            </Route>
          </Routes>
          {/* </AuthWrapper> */}
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
