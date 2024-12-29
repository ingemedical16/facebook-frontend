import { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";
import { HashLoader } from "react-spinners";
import styles from "./Profile.module.css";
import { AppDispatch, RootState } from "../../app/store";
import { DefaultUser } from "../../types/Post";
import { Photo, SearchApiResponse } from "../../types/types";
import { Profile as ProfileType } from "../../types/Profile";
import { UserDetails } from "../../types/User";
import {
  getProfileByUsername,
  searchImagesInCloud,
} from "../../features/function";
import Header from "../header/Header";
import CreatePostPopup from "../post/createPostPopup";
import Cover from "./cover";
import ProfilePictureInfos from "./profilePictureInfos";
import ProfileMenu from "./profileMenu";
import DiscoverPeople from "./discoverPeople";
import Introduction from "../introduction";
import Photos from "./photos";
import CreatePost from "../post/createPost";
import Friends from "./friends";
import GridPosts from "./gridPosts";
import Post from "../post";

const Profile: FC = () => {
  const [visible, setVisible] = useState(false);
  const [otherName, setOtherName] = useState<string>("");
  const { username } = useParams<{ username?: string }>();
  const navigate = useNavigate();
  const { loading, profile: userProfile } = useSelector(
    (state: RootState) => state.profile
  );
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const [photos, setPhotos] = useState<SearchApiResponse | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(userProfile || null);
  const userName = username ?? user?.username;


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await dispatch(
          getProfileByUsername({
            token: token as string,
            username: userName as string,
          })
        );

        if (res.payload?.status === 200) {
          setProfile({ ...res.payload?.data } as ProfileType);
        } else {
          console.error("Failed to fetch profile:", res.payload?.status);
          navigate("/profile");
        }

        const imagesRes = await dispatch(
          searchImagesInCloud({
            path: `${userName}/*`,
            max: 30,
            sort: "desc",
            token: token as string,
          })
        );

        if (imagesRes.payload?.status === 200) {
          setPhotos(imagesRes.payload?.data);
        } else {
          console.error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/profile");
      }
    };

    if (userName && token) {
      fetchProfile();
    }
  }, [dispatch, navigate, token, userName]);

  useEffect(() => {
    setProfile(userProfile ?? null);
  }, [userProfile]);

  useEffect(() => {
    setOtherName(profile?.details?.otherName ?? "");
  }, [profile]);

  const visitor = userName !== user?.username;

  const profileTop = useRef<HTMLDivElement>(null);
  const leftSide = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const [leftHeight, setLeftHeight] = useState<number>(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const handleScroll = () => {
    setScrollHeight(window.scrollY);
  };

  useEffect(() => {
    if (profileTop.current) {
      setHeight(profileTop.current.clientHeight + 300);
    }
    if (leftSide.current) {
      setLeftHeight(leftSide.current.clientHeight);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const isWideScreen = useMediaQuery({ query: "(min-width:901px)" });
  return (
    <div className={styles.profile}>
      {visible && (
        <CreatePostPopup
          setCreatePostPopupVisible={setVisible}
          isProfile={true}
        />
      )}
      <Header page="profile" />
      <div className={styles.profile_top} ref={profileTop}>
        <div className={styles.profile_container}>
          {loading ? (
            <Skeleton height="347px" className={styles.skeleton} />
          ) : (
            <>
              <Cover
                cover={profile?.cover as string}
                visitor={visitor}
                photos={photos?.resources as Photo[]}
              />
              {profile && (
                <ProfilePictureInfos
                  profile={profile as ProfileType}
                  visitor={visitor}
                  photos={photos?.resources as Photo[]}
                  othername={otherName}
                />
              )}
            </>
          )}
          <ProfileMenu />
        </div>
      </div>
      <div className={styles.profile_bottom}>
        <div className={styles.profile_container}>
          <div className={styles.bottom_container}>
            <DiscoverPeople />
            <div
              className={`${styles.profile_grid} ${
                isWideScreen && scrollHeight >= height && leftHeight > 1000
                  ? styles.scroll_fixed
                  : ""
              }`}
            >
              <div className={styles.profile_left} ref={leftSide}>
                {loading ? (
                  <HashLoader color="#1876f2" />
                ) : (
                  <>
                    <Introduction
                      userDetails={profile?.details as UserDetails}
                      visitor={visitor}
                      setOtherName={setOtherName}
                    />
                    {photos && <Photos photos={photos as SearchApiResponse} />}
                    <Friends friends={profile?.friends as DefaultUser[]} />
                  </>
                )}
              </div>
              <div className={styles.profile_right}>
                {!visitor && (
                  <CreatePost
                    profile={true}
                    setCreatePostPopupVisible={setVisible}
                  />
                )}
                <GridPosts />
                {loading ? (
                  <HashLoader color="#1876f2" />
                ) : (
                  <div className={styles.posts}>
                    {profile?.posts?.length ? (
                      profile.posts.map((post) => (
                        <Post post={post} key={post._id} isProfile={true} />
                      ))
                    ) : (
                      <div className={styles.no_posts}>No posts available</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
