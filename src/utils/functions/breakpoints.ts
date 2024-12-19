import { useMediaQuery } from "react-responsive";

export const useMobile = () => {
  return useMediaQuery({ query: "(max-width: 767px)" });
};

export const useTablet = () => {
  return useMediaQuery({ query: "(min-width: 768px) and (max-width: 1024px)" });
};

export const useTabletLandscape = () => {
  return useMediaQuery({
    query: "(min-width: 1025px) and (max-width: 1279px)",
  });
};

export const useDesktop = () => {
  return useMediaQuery({ query: "(min-width: 1280px)" });
};

export const useIsMobileOrTablet = () => {
  return useMediaQuery({ query: "(max-width: 1024px)" });
};

export const useIsTabletOrDesktop = () => {
  return useMediaQuery({ query: "(min-width: 768px)" });
};
