import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favoritesAtom, searchHistoryAtom } from '../globals/store';

import { isAuthenticated } from '../lib/authenticate';
import { getFavorites, getHistory } from '../lib/userData';

const PUBLIC_PATHS = ['/', '/register', '/login', '/_error'];

export default function RouteGuard(props) {
  const router = useRouter();
  const [favoritesList, setFavoritesList] = useAtom(favoritesAtom); // holds IDs of all artwork in the favorites list
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // holds IDs of all search queries made

  const [authorized, setAuthorized] = useState(false);

  async function updateAtoms() {
    setFavoritesList(await getFavorites());
    setSearchHistory(await getHistory());
  }

  function authCheck(url) {
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }

  useEffect(() => {
    updateAtoms();
    authCheck(router.pathname);
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  return <>{authorized && props.children}</>;
}
