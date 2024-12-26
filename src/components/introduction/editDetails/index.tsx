import React, { useRef } from "react";
import styles from "../Introduction.module.css";
import useClickOutside from "../../../hooks/useClickOutside";
import Detail from "../detail";
import { UserDetails } from "../../../types/User";


interface EditDetailsProps {
  details: UserDetails;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => void;
  updateDetails: () => void;
  infos: Record<string, string>;
  setVisible: (visible: boolean) => void;
}

const EditDetails: React.FC<EditDetailsProps> = ({
  details,
  handleChange,
  updateDetails,
  infos,
  setVisible,
}) => {
  const modal = useRef<HTMLDivElement>(null);
  useClickOutside(modal, () => setVisible(false));

  return (
    <div className={styles.blur}>
      <div className={`${styles.postBox} ${styles.infosBox}`} ref={modal}>
        <div className={styles.box_header}>
          <div className={styles.small_circle} onClick={() => setVisible(false)}>
            <span className={styles.exit_icon}></span>
          </div>
          <span>Edit Details</span>
        </div>
        <div className={`${styles.details_wrapper} ${styles.scrollbar}`}>
          <div className={styles.details_col}>
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>
          <div className={styles.details_header}>Other Name</div>
          <Detail
            value={details?.otherName as string}
            img="studies"
            placeholder="Add other name"
            name="otherName"
            text="other Name"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={styles.details_header}>Work</div>
          <Detail
            value={details?.job as string}
            img="job"
            placeholder="Add job title"
            name="job"
            text="a job"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <Detail
            value={details?.workPlace as string}
            img="job"
            placeholder="Add a workplace"
            name="workplace"
            text="workplace"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={styles.details_header}>Education</div>
          <Detail
            value={details?.highSchool as string}
            img="studies"
            placeholder="Add a high school"
            name="highSchool"
            text="a high school"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <Detail
            value={details?.college as string}
            img="studies"
            placeholder="Add a college"
            name="college"
            text="college"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={styles.details_header}>Current City</div>
          <Detail
            value={details?.currentCity as string}
            img="home"
            placeholder="Add a current city"
            name="currentCity"
            text="a current city"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={styles.details_header}>Hometown</div>
          <Detail
            value={details?.homeTown as string}
            img="home"
            placeholder="Add hometown"
            name="hometown"
            text="hometown"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={styles.details_header}>Relationship</div>
          <Detail
            value={details?.relationShip as string}
            img="relationship"
            placeholder="Add instagram"
            name="relationship"
            text="relationship"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            rel
          />
          <div className={styles.details_header}>Instagram</div>
          <Detail
            value={details?.instagram as string}
            img="home"
            placeholder="Add instagram"
            name="instagram"
            text="instagram"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
