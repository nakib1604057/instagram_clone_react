import { useContext, useState, useEffect } from "react";
import userContext from "../contexts/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(userContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      // we need a firebase service that will give us user data based on uid
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);
  return { user: activeUser };
}
