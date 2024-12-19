import { FC, useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import Header from "../header/Header";
import LeftHome from "./left";
import Stories from "./stories";
import SendVerification from "./sendVerification";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import CreatePost from "../post/createPost";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../features/function";
import Post from "../post";
import { HashLoader } from "react-spinners";
import RightHome from "./right";

export type HomeProps = {
  setCreatePostPopupVisible: (isVisible: boolean) => void;
};
const Home: FC<HomeProps> = ({ setCreatePostPopupVisible }) => {
  const middle = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const { user } = useSelector((state: RootState) => state.user);
  const { token } = useSelector((state: RootState) => state.auth);
  const { posts,loading } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllPosts({ token:token as string }));
    if (middle.current) {
      setHeight(middle.current.clientHeight);
    }
  }, [dispatch, token]);
  return (
    <div className={styles.home} style={{ height: `${height + 150}px` }}>
      <Header page="home" />
      <LeftHome />
      <div className={styles.home_middle} ref={middle}>
        <Stories />
        {user?.verified === false && <SendVerification />}
        <CreatePost setCreatePostPopupVisible={setCreatePostPopupVisible}  />
        {loading ? (
          <div className="sekelton_loader">
            <HashLoader color="#1876f2" />
          </div>
        ) : (
          <div className="posts">
            {posts !== null && posts.map((post, i) => (
              <Post key={i} post={post}  />
            ))}
          </div>
        )}
      </div>
      <RightHome />
    </div>
  );
};

export default Home;
