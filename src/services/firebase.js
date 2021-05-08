import { firebase, Fieldvalue } from "../libs/firebase";

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
