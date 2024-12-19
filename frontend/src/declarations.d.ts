declare module "react-moment" {
  import { FC } from "react";

  export interface MomentProps {
    date?: string | Date | number;
    format?: string;
    fromNow?: boolean;
    ago?: boolean;
    calendar?: boolean;
    unix?: boolean;
    durationFromNow?: boolean;
    duration?: string | number;
    children?: Date;
    interval?: number; // Add the interval property
  }

  const Moment: FC<MomentProps>;
  export default Moment;
}
