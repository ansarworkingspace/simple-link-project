import {Routes,Route,Navigate}  from 'react-router-dom'
import Dashboard  from './Pages/Dashboard/Dashboard'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'

import PrivateRoutes from "./Components/RouteRestrictions/PrivetRoutes";
import PublicRoutes from "./Components/RouteRestrictions/PublicRoutes";



const MainRoutes=()=>{
   return (
      <Routes>
      <Route path="/" element={<PrivateRoutes />}>
      <Route path="/" element={<Navigate replace to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>

    <Route path="" element={<PublicRoutes />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
      </Routes>
    );
};


export default MainRoutes;