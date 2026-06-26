import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../contexts/auth/UserContext';
import { AppRoutes } from './routes';
import type { PropsWithChildren } from 'react';

export default function ProtectedRoute({ children }: PropsWithChildren) {
    const { state } = useUserContext();
    const location = useLocation();

    if (state.user === null) {
        return (
            <Navigate
                to={AppRoutes.LOGIN}
                state={{ from: location }}
                replace
            />
        );
    }

    return <>{children}</>;
}