/**
 * KCT Programmes Data
 * Source: Official KCT Website (https://kct.ac.in/)
 * 
 * Programme names verified from the official KCT website.
 * Do not add specializations or details not verified from official sources.
 */

export interface Programme {
  id: string;
  name: string;
  degree: string;
  category: 'Undergraduate' | 'Postgraduate' | 'Management' | 'Research';
  department: string;
  description: string;
  source: string;
}

export const undergraduateProgrammes: Programme[] = [
  {
    id: 'be-aero',
    name: 'B.E. Aeronautical Engineering',
    degree: 'B.E.',
    category: 'Undergraduate',
    department: 'Aeronautical Engineering',
    description: 'Undergraduate programme in Aeronautical Engineering. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'btech-aids',
    name: 'B.Tech. Artificial Intelligence & Data Science',
    degree: 'B.Tech.',
    category: 'Undergraduate',
    department: 'Artificial Intelligence & Data Science',
    description: 'Undergraduate programme in Artificial Intelligence & Data Science. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'be-auto',
    name: 'B.E. Automobile Engineering',
    degree: 'B.E.',
    category: 'Undergraduate',
    department: 'Automobile Engineering',
    description: 'Undergraduate programme in Automobile Engineering. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'btech-bio',
    name: 'B.Tech. Biotechnology',
    degree: 'B.Tech.',
    category: 'Undergraduate',
    department: 'Biotechnology',
    description: 'Undergraduate programme in Biotechnology. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'be-civil',
    name: 'B.E. Civil Engineering',
    degree: 'B.E.',
    category: 'Undergraduate',
    department: 'Civil Engineering',
    description: 'Undergraduate programme in Civil Engineering. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'be-cse',
    name: 'B.E. Computer Science and Engineering',
    degree: 'B.E.',
    category: 'Undergraduate',
    department: 'Computer Science and Engineering',
    description: 'Undergraduate programme in Computer Science and Engineering. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'be-eee',
    name: 'B.E. Electrical and Electronics Engineering',
    degree: 'B.E.',
    category: 'Undergraduate',
    department: 'Electrical and Electronics Engineering',
    description: 'Undergraduate programme in Electrical and Electronics Engineering. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'be-ece',
    name: 'B.E. Electronics and Communication Engineering',
    degree: 'B.E.',
    category: 'Undergraduate',
    department: 'Electronics and Communication Engineering',
    description: 'Undergraduate programme in Electronics and Communication Engineering. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'be-eie',
    name: 'B.E. Electronics and Instrumentation Engineering',
    degree: 'B.E.',
    category: 'Undergraduate',
    department: 'Electronics and Instrumentation Engineering',
    description: 'Undergraduate programme in Electronics and Instrumentation Engineering. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'btech-ft',
    name: 'B.Tech. Fashion Technology',
    degree: 'B.Tech.',
    category: 'Undergraduate',
    department: 'Fashion Technology',
    description: 'Undergraduate programme in Fashion Technology. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'btech-it',
    name: 'B.Tech. Information Technology',
    degree: 'B.Tech.',
    category: 'Undergraduate',
    department: 'Information Technology',
    description: 'Undergraduate programme in Information Technology. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'be-mech',
    name: 'B.E. Mechanical Engineering',
    degree: 'B.E.',
    category: 'Undergraduate',
    department: 'Mechanical Engineering',
    description: 'Undergraduate programme in Mechanical Engineering. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'be-mechatronics',
    name: 'B.E. Mechatronics Engineering',
    degree: 'B.E.',
    category: 'Undergraduate',
    department: 'Mechatronics Engineering',
    description: 'Undergraduate programme in Mechatronics Engineering. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'btech-textile',
    name: 'B.Tech. Textile Technology',
    degree: 'B.Tech.',
    category: 'Undergraduate',
    department: 'Textile Technology',
    description: 'Undergraduate programme in Textile Technology. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
];

export const postgraduateProgrammes: Programme[] = [
  {
    id: 'me-pg',
    name: 'M.E. Programmes',
    degree: 'M.E.',
    category: 'Postgraduate',
    department: 'Various Engineering Departments',
    description: 'KCT offers M.E. postgraduate programmes. For the current list of M.E. specializations and admission details, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'mtech-pg',
    name: 'M.Tech. Programmes',
    degree: 'M.Tech.',
    category: 'Postgraduate',
    department: 'Various Technology Departments',
    description: 'KCT offers M.Tech. postgraduate programmes. For the current list of M.Tech. specializations and admission details, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'mca-pg',
    name: 'Master of Computer Applications (MCA)',
    degree: 'MCA',
    category: 'Postgraduate',
    department: 'Computer Applications',
    description: 'Postgraduate programme in Computer Applications. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
  {
    id: 'mba-pg',
    name: 'Master of Business Administration (MBA)',
    degree: 'MBA',
    category: 'Management',
    department: 'Management Studies',
    description: 'Postgraduate management programme. Detailed programme information will be available from official KCT resources.',
    source: 'Official KCT Website',
  },
];

export const allProgrammes: Programme[] = [...undergraduateProgrammes, ...postgraduateProgrammes];
