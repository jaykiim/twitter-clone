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

type GoogleProvider = {
  [key: string]: any;
  id: string;
  name: string;
  type: string;
  callbackUrl: URL;
  signinUrl: URL;
};

export type Providers = {
  google: GoogleProvider;
};
