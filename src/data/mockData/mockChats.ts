/**
 * KCT Mock Chats
 */

import type { ConversationGroup } from '../../types';

export const chatHistoryGroups: ConversationGroup[] = [
  {
    label: 'Today',
    conversations: [
      {
        id: 'c1',
        title: 'KCT B.Tech Programmes',
        preview: 'What B.Tech programmes are offered at KCT?',
        updatedAt: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: 'c2',
        title: 'Hostel Facilities',
        preview: 'Does KCT provide hostel facilities for students?',
        updatedAt: new Date(Date.now() - 1000 * 60 * 120),
      },
    ],
  },
  {
    label: 'Yesterday',
    conversations: [
      {
        id: 'c3',
        title: 'Placement Statistics',
        preview: 'Tell me about KCT placement activities.',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 60 * 2),
      },
    ],
  },
  {
    label: 'Previous 7 Days',
    conversations: [
      {
        id: 'c4',
        title: 'Central Library Timings',
        preview: 'Tell me about the KCT Central Library.',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      },
      {
        id: 'c5',
        title: 'Campus Location',
        preview: 'Where is KCT located?',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      },
    ],
  },
];
