import React from "react";
import styles from "../Introduction.module.css";
import { Relationship } from "../../../types/User";

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
   const getValueByName = (name: string) =>{
    const hasProprietary = infos && infos.hasOwnProperty(name)
    return hasProprietary? infos[name] : "";
   }
  return (
    <div className={styles.add_bio_wrap}>
      {rel ? (
        <select
          className={styles.select_rel}
          name={name}
          value={getValueByName("relationShip") }
          onChange={handleChange}
        >
          <option value={Relationship.Single}>Single</option>
          <option value={Relationship.Widowed}>Widowed</option>
          <option value={Relationship.Married}>Married</option>
          <option value={Relationship.Divorced}>Divorced</option>
          <option value={Relationship.Other}>Other</option>
        </select>
      ) : (
        <textarea
          placeholder={placeholder}
          name={name}
          value={getValueByName(name)}
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
            className="btn btn-gray"
            onClick={() => (!detail && setShowBiography ? setShowBiography(false) : setShow && setShow(false))}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
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
