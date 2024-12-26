import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Profile.module.css";
import { Profile } from "../../../types/Profile";
import ProfilePicture from "../../profielPicture";
import { Photo } from "../../../types/types";
import Friendship from "../friendShip";

interface ProfilePictureInfosProps {
  profile: Profile;
  visitor: boolean;
  photos: Photo[];
  othername?: string;
}

export default function ProfilePictureInfos({
  profile,
  visitor,
  photos,
  othername,
}: ProfilePictureInfosProps): JSX.Element {
  const [show, setShow] = useState(false);
  const pRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={styles.profile_img_wrap}>
      {show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} />}
      <div className={styles.profile_w_left}>
        <div className={styles.profile_w_img}>
          <div
            className={styles.profile_w_bg}
            ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!visitor && (
            <div
              className={`${styles.profile_circle} hover1`}
              onClick={() => setShow(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className={styles.profile_w_col}>
          <div className={styles.profile_name}>
            {profile.first_name} {profile.last_name}
            <div className={styles.othername}>
              {othername && `(${othername})`}
            </div>
          </div>
          <div className={styles.profile_friend_count}>
            {profile?.friends && (
              <div className={styles.profile_card_count}>
                {profile?.friends.length === 0
                  ? ""
                  : profile?.friends.length === 1
                  ? "1 Friend"
                  : `${profile?.friends.length} Friends`}
              </div>
            )}
          </div>
          <div className={styles.profile_friend_imgs}>
            {profile?.friends &&
              profile.friends.slice(0, 6).map((friend, i) => (
                <Link to={`/profile/${friend.username}`} key={i}>
                  <img
                    src={friend.picture}
                    alt=""
                    style={{
                      transform: `translateX(${-i * 7}px)`,
                      zIndex: `${i}`,
                    }}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
      {visitor ? (
        <Friendship friendships={profile?.friendship} profileId={profile._id} />
      ) : (
        <div className={styles.profile_w_right}>
          <div className="btn btn-primary">
            <img src="/icons/plus.png" alt="" className={styles.invert} />
            <span>Add to story</span>
          </div>
          <div className="btn btn-gray">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
      )}
    </div>
  );
}
