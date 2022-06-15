import { FieldValue } from "firebase/firestore";

export type Base64 = `data:image/${string};base64${string}`;

export type Session = {
  user: {
    [index: string]: string;
  };
  expires: string;
};

export type Post = {
  id: string;
  username: string;
  userImg: string;
  tag: string;
  timestamp: FieldValue;
  text?: string;
  image?: string;
};

export type Like = {
  id: string;
  username: string;
};

export type Comment = {
  id: string;
  username: string;
  userImg: string;
  tag: string;
  timestamp: FieldValue;
  comment: string;
  image?: string;
};

export type SetSelectedImg = React.Dispatch<
  React.SetStateAction<Base64 | null>
>;

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
