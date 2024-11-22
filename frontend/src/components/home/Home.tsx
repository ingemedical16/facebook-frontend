import { FC, useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import Header from "../header/Header";
import LeftHome from "./left";
import Stories from "./stories";

const Home: FC = () => {
  const middle = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    if (middle.current) {
      setHeight(middle.current.clientHeight);
    }
  }, [height]);
  return (
    <div className={styles.home} style={{ height: `${height + 150}px` }}>
      <Header page="home"/>
      <LeftHome/>
      <div className={styles.home_middle} ref={middle}>
      <Stories />
      </div>
    </div>
  );
};

export default Home;
