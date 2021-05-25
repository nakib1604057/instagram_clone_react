import { useState, useEffect, useContext } from "react";
import userContext from "../contexts/user";
import { getUserByUserId, getPhotos } from "../services/firebase";
export default function usePhoto() {
  const [photos, setPhotos] = useState();
  const {
    user: { uid: userId = "" },
  } = useContext(userContext);
  useEffect(() => {
    async function getTimeLinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followUserPhotos = [];
      if (following.length > 0) {
        followUserPhotos = await getPhotos(userId, following);
      }
      followUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followUserPhotos);
    }

    getTimeLinePhotos();
  }, [userId]);

  return { photos };
}
