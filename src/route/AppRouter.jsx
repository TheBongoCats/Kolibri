import { Route, Routes, Navigate } from 'react-router-dom';
import AllOvens from '../pages/AllOvens';
import Error404 from '../pages/Error404/Error404';
import Home from '../pages/Home';
import Docs from '../pages/Docs';
import Intro from '../pages/Docs/content/general/Intro';
import Funds from '../pages/Docs/content/general/Founds';
import Risks from '../pages/Docs/content/security/Risks';
import SecurityAudit from '../pages/Docs/content/security/SecurityAudit';

const ROUTE_CONFIG = [
  { path: '/', component: <Home /> },
  { path: '/all-ovens', component: <AllOvens /> },
  {
    path: '/docs/intro',
    component: (
      <Docs>
        <Intro />
      </Docs>
    ),
  },
  {
    path: '/docs/funds',
    component: (
      <Docs>
        <Funds />
      </Docs>
    ),
  },
  {
    path: '/docs/risks',
    component: (
      <Docs>
        <Risks />
      </Docs>
    ),
  },
  {
    path: '/docs/security-audit',
    component: (
      <Docs>
        <SecurityAudit />
      </Docs>
    ),
  },
  { path: '/404', component: <Error404 /> },
  { path: '/docs', component: <Navigate replace to="/docs/intro" /> },
  { path: '*', component: <Navigate to="/404" /> },
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
