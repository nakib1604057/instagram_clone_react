import { firebase, FieldValue } from "../libs/firebase";

export async function doesUserNameExist(userName) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", userName)
    .get();
  console.log(result);
  return result.docs.map((user) => user.data().length > 0);
}
// get user form firestore where userid === userid (userid found form authid)
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}
export async function getUserByUserUserName(userName) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", userName)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user.length > 0 ? user : false;
}

export async function getSuggestedProfile(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();
  const profiles = result.docs
    .map((profile) => ({ ...profile.data(), docId: profile.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );

  return profiles;
}

// update loggedIn user following

export async function updateLoggedInUserFollowing(
  loggedUserDocId,
  suggestedProfileId,
  isFollowing
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .doc(loggedUserDocId)
    .update({
      following: isFollowing
        ? FieldValue.arrayRemove(suggestedProfileId)
        : FieldValue.arrayUnion(suggestedProfileId),
    });

  return result;
}

export async function updateFollowedUserFollowers(
  suggestedUserDocId,
  loggedUserId,
  isFollowing
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .doc(suggestedUserDocId)
    .update({
      followers: isFollowing
        ? FieldValue.arrayRemove(loggedUserId)
        : FieldValue.arrayUnion(loggedUserId),
    });

  return result;
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  const photoWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const photoOwner = await getUserByUserId(photo.userId);

      const { username } = photoOwner[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photoWithUserDetails;
}

export async function getUserPhotoByUsername(userId) {
  const photo = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();
  return photo.docs.map((item) => ({ ...item.data(), docId: item.id }));
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername)
    .where("following", "array-contains", profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}

export async function toggleFollower(
  profileDocId,
  userId,
  isFollowiingProfile,
  userDocId,
  profileId
) {
  await updateFollowedUserFollowers(profileDocId, userId, isFollowiingProfile);
  await updateLoggedInUserFollowing(userDocId, profileId, isFollowiingProfile);
}
