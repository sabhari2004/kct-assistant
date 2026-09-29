/**
 * KCT Mock Notices
 * Source: KCT AI Assistant Knowledge Base
 * 
 * IMPORTANT: These are mock entries clearly marked as "Demo Notice".
 * Do not present fictional notices as real KCT announcements.
 */

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  status: 'Published' | 'Draft';
  publishedAt: Date;
}

export const mockNotices: Notice[] = [
  {
    id: 'notice-kct-1',
    title: 'Demo Notice: Semester Examination Schedule',
    content: 'This is a demo notice. Please refer to the official KCT examination portal for the actual semester examination schedule.',
    category: 'Examination',
    status: 'Published',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: 'notice-kct-2',
    title: 'Demo Notice: Campus Placement Drive',
    content: 'This is a demo notice. Details regarding upcoming campus placement drives will be communicated officially by the KCT Placement Cell.',
    category: 'Placement',
    status: 'Published',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
  {
    id: 'notice-kct-3',
    title: 'Demo Notice: Academic Calendar Update',
    content: 'This is a demo notice. The official academic calendar for the current semester is available on the KCT website.',
    category: 'Academic',
    status: 'Published',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
  {
    id: 'notice-kct-4',
    title: 'Demo Notice: Admission Guidelines',
    content: 'This is a demo notice. For accurate admission guidelines and deadlines, always verify with the official KCT admissions portal.',
    category: 'Admission',
    status: 'Published',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
  },
  {
    id: 'notice-kct-5',
    title: 'Demo Notice: Yugam TechFest',
    content: 'This is a demo notice for college events. Check official KCT channels for actual event dates and registrations.',
    category: 'Events',
    status: 'Published',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
  },
];
