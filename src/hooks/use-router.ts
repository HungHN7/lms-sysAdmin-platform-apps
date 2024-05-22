import { matchPath, useNavigate } from 'react-router-dom';

import queryString from 'query-string';
import { useMemo } from 'react';
import { generatePath, useLocation, useMatch, useParams } from 'react-router-dom';

export function useRouter<T>() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      } as T,
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match: useMatch,
      location,
      navigate,
      generatePath,
      params,
      queryString,
      matchPath,
    };
  }, [params, useMatch, location, navigate]);
}
