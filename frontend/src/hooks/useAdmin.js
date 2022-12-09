import { useEffect, useState } from 'react';
import { useAuthContext} from '../hooks/useAuthContext';

export function useIsAdmin() {
    const { user } = useAuthContext();
    const [isAdmin, setIsAdmin] = useState(null);
  
    useEffect(() => {
      if (user) {
        setIsAdmin(user.isAdmin && user);
      }
    }, [user]);
  
    useEffect(() => {
      if (!user || user === null) {
        setIsAdmin(null);
      }
    }, [user]);
  
    return isAdmin;
  }