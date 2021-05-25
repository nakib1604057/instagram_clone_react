import { useEffect, useContext, useState } from "react";
import UserContext from "../../contexts/user";
import FireBaseContext from "../../contexts/firebase";
import firebaseContext from "../../contexts/firebase";
import PropTypes from "prop-types";
const Action = ({ docId, totalLikes, likedPhoto, handelFocus }) => {
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);
  const [toggledLiked, setToggledLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(firebaseContext);
  const handelToggelLiked = async () => {
    setToggledLiked((toggledLiked) => !toggledLiked);
    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggledLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });
    setLikes((likes) => (toggledLiked ? likes - 1 : likes + 1));
  };
  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            onClick={handelToggelLiked}
            onKeyDown={(event) => {
              if (event === "Enter") {
                handelToggelLiked();
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            className={` w-7 red-primary select-none courser-pointer ${
              toggledLiked ? "fill-red text-red-primary" : "text-black-light"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            onClick={handelFocus}
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 mx-2 select-none courser-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font=bold">
          {likes === 1
            ? `${likes}Like`
            : likes === 0
            ? `0 Like`
            : `{likes}Likes`}{" "}
        </p>
      </div>
    </>
  );
};

Action.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
  handelFocus: PropTypes.func.isRequired,
};

export default Action;
