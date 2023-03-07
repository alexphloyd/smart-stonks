import { AccessDenied } from '@/components/screens/accessDenied/AccessDenied';
import { UserApiKeys } from '@/components/screens/apiKeys/UserApiKeys';
import { useAppSelector } from '@/store/hooks/hooks';

export default function ApiKeys() {
  const user = useAppSelector((store) => store.auth.user);

  if (!user) {
    return <AccessDenied />;
  }

  return <UserApiKeys />;
}
