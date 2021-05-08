import useUser from "../../hooks/use-user";
import User from "./User";
import Suggestions from "./Suggestions";
const Index = () => {
  const {
    user: { fullName, username, userId, following },
  } = useUser();

  console.log("fullname username uid", fullName, username, userId);

  return (
    <div className="p-4">
      <User fullName={fullName} userName={username} />
      <Suggestions userId={userId} following={following} />
    </div>
  );
};
Index.whyDidYouRender = true;

export default Index;
