import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

const AppLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
