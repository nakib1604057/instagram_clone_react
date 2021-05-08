import { useState, useEffect, useContext } from "react";
import userContext from "../contexts/user";

export default function useUserSuggestions() {
  const user = useContext(userContext);
  const [userSuggestions, serUserSeggestion] = useState({});
  useEffect(() => {
    async function getSuggestUserByUserId() {
      const [response] = await getUserSuggestions(user.uid);
    }
    if (user?.uid) {
      getSuggestUserByUserId();
    }
  }, [user]);
  return userSuggestions;
}
