import { Message, Post } from './types';

export const samplePosts: Post[] = [
  {
    id: 'post-1',
    author: 'Jordan Blake',
    avatar: 'https://images.unsplash.com/photo-1542317854-0c6a9b5f3b85?auto=format&fit=crop&w=200&q=80',
    time: '18m ago',
    text: 'Squad brief complete. Moving to OP zone delta. Sharing overwatch stills.',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1526481280698-4d2b6f7a0b5a?auto=format&fit=crop&w=1200&q=80'
    },
    likes: 312,
    comments: 42
  },
  {
    id: 'post-2',
    author: 'Ava Chen',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    time: '50m ago',
    text: 'Night surveillance feed — compressed clip for the ops channel.',
    media: {
      type: 'video',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    likes: 482,
    comments: 67
  },
  {
    id: 'post-3',
    author: 'Mia Johnson',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80',
    time: '1h ago',
    text: 'New firmware patch deployed to comms stack. Confirming encrypted channels.',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    },
    likes: 158,
    comments: 21
  },
  {
    id: 'post-4',
    author: 'Delta Team',
    avatar: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=200&q=80',
    time: '2h ago',
    text: 'Recon snapshot: perimeter sensors picking anomalous traffic. Ops, check logs.',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80'
    },
    likes: 212,
    comments: 33
  },
  {
    id: 'post-5',
    author: 'CyberOps',
    avatar: 'https://images.unsplash.com/photo-1549377303-1f4f2b1aeeef?auto=format&fit=crop&w=200&q=80',
    time: '4h ago',
    text: 'Captured a threat vector during routine scanning. Sharing sanitized packet captures.',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80'
    },
    likes: 401,
    comments: 88
  }
];

export const chatMessages: Message[] = [
  { id: 'msg-1', sender: 'contact', text: 'Hey, have you seen the new group feed?', time: '9:12 AM' },
  { id: 'msg-2', sender: 'you', text: 'Yes, the launch post looks clean. Ready to share the training clip.', time: '9:14 AM' },
  { id: 'msg-3', sender: 'contact', text: 'Nice. I also uploaded a video for the patrol team.', time: '9:15 AM' }
];
