import { ReactionEnum } from "../../../types/Reaction";
import styles from "./ReactionsPopup.module.css";

type ReactType = {
  name: ReactionEnum;
  image: string;
};
const reactsArray: ReactType[] = [
  {
    name: ReactionEnum.like,
    image: "reacts/like.gif",
  },
  {
    name: ReactionEnum.love,
    image: "reacts/love.gif",
  },
  {
    name: ReactionEnum.haha,
    image: "reacts/haha.gif",
  },
  {
    name: ReactionEnum.wow,
    image: "reacts/wow.gif",
  },
  {
    name: ReactionEnum.sad,
    image: "reacts/sad.gif",
  },
  {
    name: ReactionEnum.angry,
    image: "reacts/angry.gif",
  },
];
type ReactsPopupProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  reactHandler: (reaction: ReactionEnum) => void;
};

const ReactionsPopup = ({
  visible,
  setVisible,
  reactHandler,
}: ReactsPopupProps): JSX.Element | null => {
  if (!visible) return null;

  return (
    <div
      className={styles.reacts_popup}
      onMouseOver={() => {
        setTimeout(() => {
          setVisible(true);
        }, 500);
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setVisible(false);
        }, 500);
      }}
    >
      {reactsArray.map((react, index) => (
        <div
          className={styles.react}
          key={index}
          onClick={() => reactHandler(react.name)}
        >
          <img src={react.image} alt={react.name} />
        </div>
      ))}
    </div>
  );
};

export default ReactionsPopup;
