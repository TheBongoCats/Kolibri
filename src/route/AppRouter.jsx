import { Route, Routes, Navigate } from 'react-router-dom';
import AllOvens from '../pages/AllOvens';
import Error404 from '../pages/Error404/Error404';
import Home from '../pages/Home';

const ROUTE_CONFIG = [
  { path: '/', component: <Home /> },
  { path: '/all-ovens', component: <AllOvens /> },
  { path: '/404', component: <Error404 /> },
  { path: '*', component: <Navigate to="/404" /> },
];

const AppRouter = () => (
  <main>
    <Routes>
      {ROUTE_CONFIG.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  </main>
);

export default AppRouter;
