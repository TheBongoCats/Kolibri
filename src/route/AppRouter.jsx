import { Route, Routes } from 'react-router-dom';
import Test from '../components';
import AllOvens from '../components/AllOvens';

const ROUTE_CONFIG = [
  { path: '/', component: <Test /> },
  { path: '/all-ovens', component: <AllOvens /> },
];

const AppRouter = () => (
  <main>
    <Routes>
      {ROUTE_CONFIG.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  </main>
);

export default AppRouter;
