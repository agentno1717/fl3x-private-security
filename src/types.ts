export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  seen: boolean;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  text: string;
  media?: {
    type: 'image' | 'video';
    src: string;
  };
  likes: number;
  comments: number;
}

export interface Message {
  id: string;
  sender: 'you' | 'contact';
  text: string;
  time: string;
}
