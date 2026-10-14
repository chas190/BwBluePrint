
import { useAuth } from '@/contexts/AuthContext';

export const useUserVisit = () => {
  const { userVisit, trackVisit } = useAuth();

  return {
    userVisit,
    trackVisit,
    isReturningUser: userVisit ? userVisit.visit_count > 1 : false,
    visitCount: userVisit?.visit_count || 0,
    firstVisit: userVisit?.first_visit || null,
    lastVisit: userVisit?.last_visit || null,
  };
};

