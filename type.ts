import { FieldValue } from "firebase/firestore";

export type Base64 = `data:image/${string};base64${string}`;

export type Post = {
  id: string;
  username: `${number}`;
  userImg: URL;
  tag: string;
  timestamp: FieldValue;
  text?: string;
  image: URL;
};
