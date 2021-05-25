import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { getUserPhotoByUsername } from "../../services/firebase";
import Photos from "./photos";
import Header from "./header";

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialSate = {
    profile: {},
    photoCollection: [],
    followerCount: 0,
  };
  const [{ profile, photoCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialSate
  );
  useEffect(() => {
    async function getProfileInfoAndPhoto() {
      const photo = await getUserPhotoByUsername(user.userId);

      dispatch({
        profile: user,
        photoCollection: photo,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndPhoto();
  }, [user.username]);
  return (
    <>
      <Header
        photoCount={photoCollection ? photoCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />

      <Photos photos={photoCollection} />
      
    </>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    docId: PropTypes.string.isRequired,
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};
export default UserProfile;
