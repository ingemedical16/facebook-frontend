import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../../app/store";
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
} from "../../../features/functions";
import styles from "../Friends.module.css";
import { DefaultUser } from "../../../types/Post";

interface CardProps {
  user: DefaultUser;
  type: "sent" | "request" | "friends";
  getData: () => void;
}

const Card: React.FC<CardProps> = ({ user, type, getData }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();

  const cancelRequestHandler = async (userId: string) => {
    try {
      const res = await dispatch(
        cancelRequest({ id: userId, token: token ?? "" })
      );
      if (res.payload?.status === 200) {
        getData();
      }
    } catch (error) {
      console.error(`Error cancelling request for user ID ${userId}:`, error);
    }
  };

  const confirmHandler = async (userId: string) => {
    try {
      const res = await dispatch(
        acceptRequest({ id: userId, token: token ?? "" })
      );
      if (res.payload?.status === 200) {
        getData();
      }
    } catch (error) {
      console.error(`Error accepting request for user ID ${userId}:`, error);
    }
  };

  const deleteHandler = async (userId: string) => {
    try {
      const res = await dispatch(
        deleteRequest({ id: userId, token: token ?? "" })
      );
      if (res.payload?.status === 200) {
        getData();
      }
    } catch (error) {
      console.error(`Error deleting request for user ID ${userId}:`, error);
    }
  };

  return (
    <div className={styles.req_card}>
      <Link to={`/profile/${user.username}`}>
        <img src={user.picture} alt={`${user.first_name}'s profile`} />
      </Link>
      <div className={styles.req_name}>
        {user.first_name} {user.last_name}
      </div>
      {type === "sent" ? (
        <button
          className="btn btn-primary"
          onClick={() => cancelRequestHandler(user._id as string)}
        >
          Cancel Request
        </button>
      ) : type === "request" ? (
        <>
          <button
            className="btn btn-primary"
            onClick={() => confirmHandler(user._id as string)}
          >
            Confirm
          </button>
          <button
            className="btn btn-gray"
            onClick={() => deleteHandler(user._id as string)}
          >
            Delete
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Card;
