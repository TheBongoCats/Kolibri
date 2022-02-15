import { Route, Routes, Navigate } from 'react-router-dom';
import Test from '../components';
import AllOvens from '../pages/AllOvens';
import Home from '../pages/Home';

const ROUTE_CONFIG = [
  { path: '/', component: <Home /> },
  { path: '/test', component: <Test /> },
  { path: '/all-ovens', component: <AllOvens /> },
];

const AppRouter = () => (
  <main>
    <Routes>
      {ROUTE_CONFIG.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
      <Route path="*" element={<Navigate to="/Home" />} />
    </Routes>
  </main>
);

export default AppRouter;
