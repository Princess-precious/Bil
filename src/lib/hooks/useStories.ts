/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 15/09/2026 - 10:37:13
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { useQuery } from "@tanstack/react-query";
import { getStories } from "../api/stories";

export const useStories = () => {
  const query = useQuery({
    queryKey: ["stories"],
    queryFn: () => getStories(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  console.log("REACT QUERY ERROR:", query);

  return query;
};
