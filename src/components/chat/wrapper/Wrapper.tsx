import { FC, ReactNode } from "react";
import styles from "./Wrapper.module.css"

type WrapperProps = {
    className?: string;
    children: ReactNode;
};

const Wrapper:FC<WrapperProps> = ({children,className}) =>{
    return (
        <div className={`${styles.wrapper} ${className}`}>
            {children}
        </div>
    )
}

export default Wrapper;