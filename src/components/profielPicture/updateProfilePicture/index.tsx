import { useCallback, useRef, useState, ChangeEvent } from "react";
import Cropper, { Area } from "react-easy-crop";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import styles from "../ProfilePicture.module.css"; // Ensure CSS module usage
import { AppDispatch, RootState } from "../../../app/store";
import { dataURItoBlob, getCroppedImg } from "../../../utils/functions";
import {
  uploadFilesToCloudAPI,
  updateProfilePicture,
  createPost,
} from "../../../features/function";

interface UpdateProfilePictureProps {
  setImage: (image: string) => void;
  image: string;
  setError: (error: string) => void;
  setShow: (show: boolean) => void;
  pRef: React.RefObject<HTMLDivElement>;
}

export default function UpdateProfilePicture({
  setImage,
  image,
  setError,
  setShow,
  pRef,
}: UpdateProfilePictureProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [description, setDescription] = useState<string>("");
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const slider = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState<boolean>(false);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const zoomIn = () => {
    if (slider.current) {
      slider.current.stepUp();
      setZoom(Number(slider.current.value));
    }
  };

  const zoomOut = () => {
    if (slider.current) {
      slider.current.stepDown();
      setZoom(Number(slider.current.value));
    }
  };

  const getCroppedImage = useCallback(
    async (show?: boolean) => {
      try {
        if (!croppedAreaPixels) return;
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img ?? "");
        } else {
          return img;
        }
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    },
    [croppedAreaPixels, image, setImage]
  );

  const updateProfilePictureHandler = async () => {
    try {
      setLoading(true);
      const img = await getCroppedImage();
      if (!img) throw new Error("Cropped image not found");

      const blob = dataURItoBlob(img as string);

      const path = `${user?.username}/profile_pictures`;

      const formData = new FormData();
      formData.append("files", blob);
      formData.append("folder", path);

      const res = await uploadFilesToCloudAPI({
        formData,
        token: token as string,
      });
      if (res.status !== 200) {
        setLoading(false);
        return setError(res.message);
      }

      const profileImageUrl = res.data?.files[0].secure_url ?? "";
      const updatedPictureResponse = await dispatch(
        updateProfilePicture({
          url: profileImageUrl,
          token: token as string,
        })
      );

      if (updatedPictureResponse.payload?.status !== 200) {
        setLoading(false);
        return setError(
          updatedPictureResponse.payload?.message ?? "An error occurred"
        );
      }
      const newPostResponse = await dispatch(
        createPost({
          type: "profilePicture",
          text: description,
          images: [profileImageUrl],
          user: user?._id as string,
          token: token as string,
          comments: [],
          isProfile: false,
        })
      );

      if (newPostResponse.payload?.status !== 200) {
        setLoading(false);
        return setError(
          newPostResponse.payload?.message ?? "An error occurred"
        );
      }
      setLoading(false);
      setImage("");
      if (pRef.current) {
        pRef.current.style.backgroundImage = `url(${profileImageUrl})`;
      }
      Cookies.set(
        "user",
        JSON.stringify({ ...user, picture: profileImageUrl })
      );
      setShow(false);
    } catch (error: any) {
      setLoading(false);
      setError(
        error.message || "An error occurred while updating profile picture."
      );
    }
  };

  return (
    <div className={styles.postBox + " " + styles.updateImg}>
      <div className={styles.boxHeader}>
        <div
          className={styles.smallCircle}
          onClick={() => setImage("")}
          role="button"
          tabIndex={0}
        >
          <span className={styles.exitIcon}></span>
        </div>
        <span>Update Profile Picture</span>
      </div>
      <div className={styles.updateImageDesc}>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          className={`${styles.textareaBlue} ${styles.detailsInput}`}
        ></textarea>
      </div>

      <div className={styles.updateCenter}>
        <div className={styles.croper}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className={styles.slider}>
          <div
            className={`${styles.sliderCircle} ${styles.hover1}`}
            onClick={zoomOut}
          >
            <span className={styles.minusIcon}></span>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.2}
            ref={slider}
            value={zoom}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setZoom(Number(e.target.value))
            }
          />
          <div
            className={`${styles.sliderCircle} ${styles.hover1}`}
            onClick={zoomIn}
          >
            <span className={styles.plusIcon}></span>
          </div>
        </div>
      </div>

      <div className={styles.flexUp}>
        <div
          className={styles.grayBtn}
          onClick={() => getCroppedImage(true)}
          role="button"
          tabIndex={0}
        >
          Crop Photo
        </div>
        <div className={styles.grayBtn}>Make Temporary</div>
      </div>
      <div className={styles.flexPT}>Your profile picture is public</div>
      <div className={styles.updateSubmitWrap}>
        <div
          className={styles.blueLink}
          onClick={() => setImage("")}
          role="button"
          tabIndex={0}
        >
          Cancel
        </div>
        <button
          className={styles.blueBtn}
          disabled={loading}
          onClick={updateProfilePictureHandler}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "Save"}
        </button>
      </div>
    </div>
  );
}
