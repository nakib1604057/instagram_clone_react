import { useState, useContext } from "react";
import PropTypes from "prop-types";
import firebaseContext from "../../contexts/firebase";
import UserContext from "../../contexts/user";
const AddComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(firebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);
  const handelCommentSubmit = (event) => {
    event.preventDefault();
    console.log(displayName, comment);
    setComments([{ comment, displayName }, ...comments]);
    setComment("");
    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };
  return (
    <div className="border rounded border-gray-primary mt-4">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handelCommentSubmit(event)
            : event.preventDefault()
        }
      >
        <input
          type="text"
          aria-level="Write your commnet"
          autoComplete="off"
          name="add-comment"
          placeholder="Write your comment"
          onChange={({ target }) => setComment(target.value)}
          value={comment}
          ref={commentInput}
          className="text-sm  text-gray-base w-full mr-3 py-5 px-4"
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          disabled={comment.length < 1}
          onClick={handelCommentSubmit}
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
};
export default AddComment;
