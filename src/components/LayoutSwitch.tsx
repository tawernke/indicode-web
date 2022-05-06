import { useRouter } from 'next/router';
import { AdminLayout } from '../components/AdminLayout';
import { GuestLayout } from '../components/GuestLayout';

const LayoutSwitch: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  
  return (
    <>
      {pathname.startsWith('/admin') ? (
        <AdminLayout>
          {children}
        </AdminLayout>
      ) : (
        <GuestLayout>
          {children}
        </GuestLayout>
      )}
    </>
  );
};

export default LayoutSwitch;
