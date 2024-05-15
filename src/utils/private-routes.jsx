import { Outlet, Navigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth';
import { Shell } from 'lucide-react'

const PrivateRoutes = () => {
  const { user, loading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("loc")
  if (loading) {
    return (
      <div className="min-h-[85vh] w-full flex justify-center items-center">
        <Shell className="text-emerald-400 animate-spin" size={70} />
      </div>
    );
  }
  return (
    user ? <Outlet /> : <Navigate to={`/login?loc=${search}`} />
  );
};

export default PrivateRoutes;