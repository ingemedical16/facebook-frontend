import React, { useState } from "react";
import styles from "../Introduction.module.css";
import Biography from "../biography";

interface DetailProps {
  img: string;
  value: string | null;
  placeholder: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => void;
  updateDetails: () => void;
  infos: Record<string, string>;
  text: string;
  rel?: boolean;
}

const Detail: React.FC<DetailProps> = ({
  img,
  value,
  placeholder,
  name,
  handleChange,
  updateDetails,
  infos,
  text,
  rel = false,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div
        className={styles.add_details_flex}
        onClick={() => setShow(true)}
      >
        {value ? (
          <div className={styles.info_profile}>
            <img src={`/icons/${img}.png`} alt="icon" />
            {value}
          </div>
        ) : (
          <>
            <span className={styles.rounded_plus_icon}></span>
            <span className={styles.underline}>Add {text}</span>
          </>
        )}
      </div>
      {show && (
        <Biography
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          detail
          setShow={setShow}
          rel={rel}
        />
      )}
    </div>
  );
};

export default Detail;