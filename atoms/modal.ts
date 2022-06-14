import { atom } from "recoil";

export const commentModalState = atom({
  key: "commentModalState",
  default: { open: false, postId: "" },
});
