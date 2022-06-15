import { useState } from "react";
import { useSession } from "next-auth/react";

import TweetEditor from "../../components/TweetEditor";

const FeedEditor = () => {
  const { user } = useSession().data!;

  // fetch 로드 상태
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`p-3 overflow-y-auto border-b border-gray-700 flex space-x-3 ${
        loading && "opacity-60"
      }`}
    >
      {/*  */}
      {/* GUIDE 프로필 사진 ============================================================================================================================================================== */}

      <img
        src={user?.image || undefined}
        className="circle-11 cursor-pointer"
      />

      <TweetEditor loading={loading} setLoading={setLoading} />
    </div>
  );
};

export default FeedEditor;
