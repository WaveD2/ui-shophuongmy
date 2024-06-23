import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// layouts
import BaseLayout from "./components/layout/BaseLayout";
import { GlobalStyles } from "./styles/global/GlobalStyles";
import routes from "./validate/router";


function App() {
  return (
    <>
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

      </Router>
    </>
  );
}

export default App;
