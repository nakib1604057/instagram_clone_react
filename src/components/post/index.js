import { useRef, useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Image from "./image";
import Action from "./Action";
import Footer from "./footer";
import Comments from "./comments";
const Index = ({ content }) => {
  // comments
  // -> header, image, actions(likes,commnets icons) ,footer, comments
  const commentInput = useRef(null);

  const handelFocus = () => commentInput.current.focus();
  return (
    <div className="rounded bg-white border-gray-primary mb-16 col-span-4">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Action
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handelFocus={handelFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments  docId={content.docId} comments={content.comments} posted={content.dateCreated} commentInput={commentInput}/>  
    </div>
  );
};

Index.propTypes = {
  content: PropTypes.shape({
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    dateCreated: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
  }),
};
export default Index;
