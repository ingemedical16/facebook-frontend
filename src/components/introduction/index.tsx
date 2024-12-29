import { useEffect, useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import styles from "./Introduction.module.css";
import { AppDispatch, RootState } from "../../app/store";
import { UserDetails } from "../../types/User";
import { useDispatch } from "react-redux";
import { updateDetails } from "../../features/function";
import EditDetails from "./editDetails";
import Biography from "./biography";

interface IntroductionProps {
  userDetails: UserDetails;
  visitor: boolean;
  setOtherName: (name: string) => void;
}

export default function Introduction({
  userDetails,
  visitor,
  setOtherName,
}: IntroductionProps) {
  const token = useSelector((state: RootState) => state.auth.token);

  const [details, setDetails] = useState<UserDetails>({
    biography: userDetails?.biography || "",
    otherName: userDetails?.otherName || "",
    job: userDetails?.job || "",
    workPlace: userDetails?.workPlace || "",
    highSchool: userDetails?.highSchool || "",
    college: userDetails?.college || "",
    currentCity: userDetails?.currentCity || "",
    homeTown: userDetails?.homeTown || "",
    relationShip: userDetails?.relationShip,
    instagram: userDetails?.instagram || "",
  });
  const [visible, setVisible] = useState(false);
  const [infos, setInfos] = useState<UserDetails>({
    biography: userDetails?.biography || "",
    otherName: userDetails?.otherName || "",
    job: userDetails?.job || "",
    workPlace: userDetails?.workPlace || "",
    highSchool: userDetails?.highSchool || "",
    college: userDetails?.college || "",
    currentCity: userDetails?.currentCity || "",
    homeTown: userDetails?.homeTown || "",
    relationShip: userDetails?.relationShip,
    instagram: userDetails?.instagram || "",
  });
  const [showBio, setShowBio] = useState(false);
  const [max, setMax] = useState(100 - (infos?.biography?.length || 0));
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setDetails(userDetails);
    setInfos(userDetails);
  }, [userDetails]);

  const updateUserDetails = async () => {
    try {
      const data = await dispatch(
        updateDetails({
          infos: infos,
          token: token as string,
        })
      );
      setShowBio(false);
      data.payload?.data?.details && setDetails(data.payload?.data?.details);
      setOtherName(data.payload?.data?.details.otherName || "");
    } catch (error: any) {
      console.error(error.response?.data?.message || "Error updating details");
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setInfos((prev) => ({ ...prev, [name]: value }));
    setMax(100 - value.length);
  };

  return (
    <div className={styles.profile_card}>
      <div className={styles.profile_card_header}>Introduction</div>

      {details?.biography && !showBio && (
        <div className={styles.info_col}>
          <span className={styles.info_text}>{details.biography}</span>
          {!visitor && (
            <button
              className={`btn btn-gray hover1 `}
              onClick={() => setShowBio(true)}
            >
              Edit Biography
            </button>
          )}
        </div>
      )}
      {!details?.biography && !showBio && !visitor && (
        <button
          className={`btn btn-gray hover1 ${styles.w100}`}
          onClick={() => setShowBio(true)}
        >
          Edit Biography
        </button>
      )}
      {showBio && (
        <Biography
          infos={infos}
          max={max}
          handleChange={handleChange}
          setShowBiography={setShowBio}
          updateDetails={updateUserDetails}
          placeholder="Add Bio"
          name="biography"
        />
      )}

      {/* Details rendering */}
      {details?.job && details?.workPlace && (
        <div className={styles.info_profile}>
          <img src="/icons/job.png" alt="Job" />
          works as {details.job} at <b>{details.workPlace}</b>
        </div>
      )}
      {details?.relationShip && (
        <div className={styles.info_profile}>
          <img src="/icons/relationship.png" alt="Relationship" />
          {details.relationShip }
        </div>
      )}
      {details?.college && (
        <div className={styles.info_profile}>
          <img src="/icons/studies.png" alt="College" />
          studied at {details.college}
        </div>
      )}
      {details?.currentCity && (
        <div className={styles.info_profile}>
          <img src="/icons/home.png" alt="Current City" />
          Lives in {details.currentCity}
        </div>
      )}
      {details?.instagram && (
        <div className={styles.info_profile}>
          <img src="/icons/instagram.png" alt="Instagram" />
          <a
            href={`https://www.instagram.com/${details.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {details.instagram}
          </a>
        </div>
      )}

      {!visitor && (
        <>
          <button
            className={`btn btn-gray hover1 ${styles.w100}`}
            onClick={() => setVisible(true)}
          >
            Edit Details
          </button>
          <button className={`btn btn-gray hover1 ${styles.w100}`}>
            Add Hobbies
          </button>
          <button className={`btn btn-gray hover1 ${styles.w100}`}>
            Add Featured
          </button>
        </>
      )}

      {visible && !visitor && (
        <EditDetails
          details={details as UserDetails}
          handleChange={handleChange}
          updateDetails={updateUserDetails}
          infos={infos}
          setVisible={setVisible}
        />
      )}
    </div>
  );
}
