import React from "react";
import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";
const Timeline = () => {
  const { photos } = usePhotos();
  console.log("photos", photos);
  // we need to get logged in user photo's
  // on loading photo we need to use react-skeleton
  // if  we have photos render them (create a post components)
  // if user dont have photots tell him to create some photos
  return (
    <div className="col-span-2">
      {!photos ? (
        <Skeleton count={4} height={500} width={640} className="mb-2" />
      ) : photos.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p>Follow people to see photo</p>
      )}
    </div>
  );
};

export default Timeline;
