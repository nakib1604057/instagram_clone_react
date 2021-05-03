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
