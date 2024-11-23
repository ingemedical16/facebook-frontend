import { useMediaQuery } from "react-responsive";
/**
 * 
 * @param length - the stories length
 * @returns {number} - the  max stories */
export const useMaxStories = (length: number): number =>{
    const query1175px = useMediaQuery({
        query: "(max-width: 1175px)",
      });
      const query1030px = useMediaQuery({
        query: "(max-width: 1030px)",
      });
      const query960px = useMediaQuery({
        query: "(max-width: 960px)",
      });
      const query885px = useMediaQuery({
        query: "(max-width: 885px)",
      });

      return query885px
      ? 5
      : query960px
      ? 4
      : query1030px
      ? 5
      : query1175px
      ? 4
      : length;

}

