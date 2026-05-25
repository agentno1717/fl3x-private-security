import { Message, Post } from './types';

export const samplePosts: Post[] = [
  {
    id: 'post-1',
    author: 'Jordan Blake',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    time: '18m ago',
    text: 'Launching the new Fl3xPrivateSecurity community group. Share your stories, videos, and secure experiences.',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80'
    },
    likes: 96,
    comments: 14
  },
  {
    id: 'post-2',
    author: 'Ava Chen',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    time: '50m ago',
    text: 'Night patrol footage compressed for faster sharing. Safety first, community always.',
    media: {
      type: 'video',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    likes: 182,
    comments: 31
  },
  {
    id: 'post-3',
    author: 'Mia Johnson',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80',
    time: '1h ago',
    text: 'Fitted new team avatars and launched our secure chat feature. Drop a message below!',
    likes: 58,
    comments: 10
  }
];

export const chatMessages: Message[] = [
  { id: 'msg-1', sender: 'contact', text: 'Hey, have you seen the new group feed?', time: '9:12 AM' },
  { id: 'msg-2', sender: 'you', text: 'Yes, the launch post looks clean. Ready to share the training clip.', time: '9:14 AM' },
  { id: 'msg-3', sender: 'contact', text: 'Nice. I also uploaded a video for the patrol team.', time: '9:15 AM' }
];
