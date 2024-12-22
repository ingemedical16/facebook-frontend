import React, { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useSelector, useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import styles from "../Profile.module.css";
import useClickOutside from "../../../hooks/useClickOutside";
import { AppDispatch, RootState } from "../../../app/store";
import { Photo } from "../../../types/types";
import {
  dataURItoBlob,
  getCroppedImg,
  handleFileUpload,
} from "../../../utils/functions";
import {
  createPost,
  updateCover,
  uploadFilesToCloudAPI,
} from "../../../features/function";
import OldCovers from "../oldCovers";

interface CoverProps {
  cover: string | null;
  visitor: boolean;
  photos: Photo[];
}

const Cover: React.FC<CoverProps> = ({ cover, visitor, photos }) => {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string>("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | any>(null);
  const [width, setWidth] = useState<number>();

  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const refInput = useRef<HTMLInputElement | null>(null);
  const cRef = useRef<HTMLImageElement | null>(null);
  const coverRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useClickOutside(menuRef, () => setShowCoverMenu(false));

  useEffect(() => {
    if (coverRef.current) {
      setWidth(coverRef.current.clientWidth);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(
      e,
      (errorMessage: string) => {
        setError(errorMessage);
        setShowCoverMenu(false);
      },
      (base64Image: string) => {
        setCoverPicture(base64Image);
      },
      { maxSizeMB: 5 }
    );
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (show: boolean) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img as string);
        } else {
          return img;
        }
      } catch (error) {
        console.error(error);
      }
    },
    [coverPicture, croppedAreaPixels]
  );

  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      const img = await getCroppedImage(false);
      const blob = dataURItoBlob(img as string);
      const path = `${user?.username}/cover_pictures`;

      const formData = new FormData();
      formData.append("files", blob);
      formData.append("folder", path);

      const res = await uploadFilesToCloudAPI({
        formData,
        token: token as string,
      });
      if(res.status !== 200) return setError(res.message);
      
      const coverImageUrl = res.data?.files[0].secure_url ?? "";
      const updatedPicture = await dispatch(updateCover({
        url: coverImageUrl,
        token: token as string,
      }));
      if (updatedPicture.payload?.status !== 200) return setError(updatedPicture.payload?.message ?? "An error has occurred");
     
        const newPost = await dispatch(createPost({
          type: "coverPicture",
          images: [coverImageUrl],
          user: user?.id as string,
          token: token as string,
          comments: [],
          isProfile: false,
        }));
        if (newPost.payload?.status !== 200) return setError(newPost.payload?.message ?? "An error has occurred")
          setLoading(false);
          setCoverPicture("");
          if (cRef.current) cRef.current.src = coverImageUrl;
        
        
    
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className={styles.profile_cover} ref={coverRef}>
      {coverPicture && (
        <div className={styles.save_changes_cover}>
          <div className={styles.save_changes_left}>
            Your cover photo is public
          </div>
          <div className={styles.save_changes_right}>
            <button
              className={`${styles.blue_btn} ${styles.opacity_btn}`}
              onClick={() => setCoverPicture("")}
            >
              Cancel
            </button>
            <button className={styles.blue_btn} onClick={updateCoverPicture}>
              {loading ? <PulseLoader color="#fff" size={5} /> : "Save changes"}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={refInput}
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImage}
      />
      {error && (
        <div className={styles.postError}>
          <div>{error}</div>
          <button className={`btn btn-primary ${styles.blue_btn}`} onClick={() => setError("")}>
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className={styles.cover_cropper}>
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width ? width / 350 : 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img src={cover} className={styles.cover} alt="Cover" ref={cRef} />
      )}
      {!visitor && (
        <div className={styles.update_cover_wrapper}>
          <div
            className={styles.open_cover_update}
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            Add Cover Photo
          </div>
          {showCoverMenu && (
            <div className={styles.open_cover_menu} ref={menuRef}>
              <div
                className={styles.open_cover_menu_item}
                onClick={() => setShow(true)}
              >
                Select Photo
              </div>
              <div
                className={styles.open_cover_menu_item}
                onClick={() => refInput.current?.click()}
              >
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
      {show && (
        <OldCovers
          photos={photos}
          setCoverPicture={setCoverPicture}
          setShow={setShow}
        />
      )}
    </div>
  );
};

export default Cover;
