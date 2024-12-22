import { hasMessageProperty } from "./hasMessageProperty";
import dataURItoBlob from "./dataURItoBlob";
import {
  useMobile,
  useDesktop,
  useIsMobileOrTablet,
  useIsTabletOrDesktop,
  useTablet,
  useTabletLandscape,
} from "./breakpoints";
import {isValidImageType, isValidImageSize , fileToBase64} from "./imageHelpersFunction"
import { handleFileUpload } from './handleFileUpload';

export {
  hasMessageProperty,
  dataURItoBlob,
  useMobile,
  useDesktop,
  useIsMobileOrTablet,
  useIsTabletOrDesktop,
  useTablet,
  useTabletLandscape,
  isValidImageType,
  isValidImageSize,
  fileToBase64,
  handleFileUpload,
};
