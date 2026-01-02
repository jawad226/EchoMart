import '../globals.css';
import ProtectedRoute from '../components/ProtectedRoute';
import { DashboardProvider } from '../../context/DashboardContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardProvider>
        {children}
      </DashboardProvider>
    </ProtectedRoute>
  );
}

