import { Route, Routes, useLocation } from "react-router-dom";

import Home from "../../pages/Home";
import Groups from "../../pages/Groups";
import NotFound from "../../pages/NotFound";
import SignInPage from "../../pages/SignInPage";

import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {  
    const location = useLocation();
  return (
    <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/groups" exact={true} element={<Groups />} />

          <Route path="/login" exact={true} element={<SignInPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;