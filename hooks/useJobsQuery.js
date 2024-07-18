import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../utils/apiService';


const fetchJobs = async ( { pageParam = 1 } ) => {
  const res = await api.get( `/common/jobs?page=${ pageParam }` );
  return res.data;
};

export const useJobsQuery = () => {
  return useInfiniteQuery( {
    queryKey: ['jobs'],
    queryFn: fetchJobs,
    getNextPageParam: ( lastPage, pages ) => {
      if ( lastPage.results.length ) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  } );
};