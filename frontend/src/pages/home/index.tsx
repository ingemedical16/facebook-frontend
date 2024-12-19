import { FC } from "react";
import Home,{HomeProps} from "../../components/home/Home";

const HomePage: FC<HomeProps> = ({setCreatePostPopupVisible}) => {
  return (
    <Home setCreatePostPopupVisible={setCreatePostPopupVisible}/>
  );
};

export default HomePage;
