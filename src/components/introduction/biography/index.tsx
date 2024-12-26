import React from "react";
import styles from "../Introduction.module.css";

interface BiographyProps {
  infos: Record<string, string>;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => void;
  max?: number;
  setShowBiography?: (value: boolean) => void;
  updateDetails: () => void;
  placeholder?: string;
  name: string;
  detail?: boolean;
  setShow?: (value: boolean) => void;
  rel?: boolean;
}

const Biography: React.FC<BiographyProps> = ({
  infos,
  handleChange,
  max,
  setShowBiography,
  updateDetails,
  placeholder = "",
  name,
  detail = false,
  setShow,
  rel = false,
}) => {
    
  return (
    <div className={styles.add_bio_wrap}>
      {rel ? (
        <select
          className={styles.select_rel}
          name={name}
          value={infos.relationship || ""}
          onChange={handleChange}
        >
          <option value="Single">Single</option>
          <option value="In a relationship">In a relationship</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
      ) : (
        <textarea
          placeholder={placeholder}
          name={name}
          value={infos[name] || ""}
          maxLength={detail ? 25 : 100}
          className={`${styles.textarea_blue} ${styles.details_input}`}
          onChange={handleChange}
        ></textarea>
      )}
      {!detail && <div className={styles.remaining}>{max} characters remaining</div>}
      <div className={styles.flex}>
        <div className={styles.flex_left}>Public</div>
        <div className={styles.flex_right}>
          <button
            className={styles.gray_btn}
            onClick={() => (!detail && setShowBiography ? setShowBiography(false) : setShow && setShow(false))}
          >
            Cancel
          </button>
          <button
            className={styles.blue_btn}
            onClick={() => {
              updateDetails();
              setShow && setShow(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Biography;
