import { AccessDenied } from '@/components/screens/accessDenied/AccessDenied';
import { UserAPIKeys } from '@/components/screens/apiKeys/UserAPIKeys';
import { useAppSelector } from '@/store/hooks/hooks';

export default function ApiKeys() {
  const { user, authStatus } = useAppSelector((store) => store.auth);

  if (authStatus === 'pending') return null;

  if (!user) {
    return <AccessDenied />;
  }

  return <UserAPIKeys />;
}
