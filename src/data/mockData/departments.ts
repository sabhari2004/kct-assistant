/**
 * KCT Academic Departments
 * Source: Official KCT Website (https://kct.ac.in/)
 */

export interface Department {
  id: string;
  name: string;
  shortName: string;
  category: 'Engineering' | 'Technology' | 'Science' | 'Management' | 'Humanities';
  description: string;
  source: string;
}

export const departments: Department[] = [
  {
    id: 'aero',
    name: 'Aeronautical Engineering',
    shortName: 'AERO',
    category: 'Engineering',
    description: 'Department of Aeronautical Engineering at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'aids',
    name: 'Artificial Intelligence & Data Science',
    shortName: 'AI&DS',
    category: 'Technology',
    description: 'Department of Artificial Intelligence & Data Science at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'auto',
    name: 'Automobile Engineering',
    shortName: 'AUTO',
    category: 'Engineering',
    description: 'Department of Automobile Engineering at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'bio',
    name: 'Biotechnology',
    shortName: 'BIO',
    category: 'Technology',
    description: 'Department of Biotechnology at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    shortName: 'CIVIL',
    category: 'Engineering',
    description: 'Department of Civil Engineering at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'cse',
    name: 'Computer Science and Engineering',
    shortName: 'CSE',
    category: 'Engineering',
    description: 'Department of Computer Science and Engineering at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'eee',
    name: 'Electrical and Electronics Engineering',
    shortName: 'EEE',
    category: 'Engineering',
    description: 'Department of Electrical and Electronics Engineering at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'ece',
    name: 'Electronics and Communication Engineering',
    shortName: 'ECE',
    category: 'Engineering',
    description: 'Department of Electronics and Communication Engineering at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'eie',
    name: 'Electronics and Instrumentation Engineering',
    shortName: 'EIE',
    category: 'Engineering',
    description: 'Department of Electronics and Instrumentation Engineering at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'ft',
    name: 'Fashion Technology',
    shortName: 'FT',
    category: 'Technology',
    description: 'Department of Fashion Technology at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'it',
    name: 'Information Technology',
    shortName: 'IT',
    category: 'Technology',
    description: 'Department of Information Technology at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'mech',
    name: 'Mechanical Engineering',
    shortName: 'MECH',
    category: 'Engineering',
    description: 'Department of Mechanical Engineering at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'mechatronics',
    name: 'Mechatronics Engineering',
    shortName: 'MECT',
    category: 'Engineering',
    description: 'Department of Mechatronics Engineering at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'textile',
    name: 'Textile Technology',
    shortName: 'TT',
    category: 'Technology',
    description: 'Department of Textile Technology at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'maths',
    name: 'Mathematics',
    shortName: 'MATH',
    category: 'Science',
    description: 'Department of Mathematics at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'physics',
    name: 'Physics',
    shortName: 'PHY',
    category: 'Science',
    description: 'Department of Physics at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    shortName: 'CHEM',
    category: 'Science',
    description: 'Department of Chemistry at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'lang',
    name: 'Languages and Communications',
    shortName: 'LANG',
    category: 'Humanities',
    description: 'Department of Languages and Communications at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
  {
    id: 'mgmt',
    name: 'Management Studies',
    shortName: 'MBA',
    category: 'Management',
    description: 'Department of Management Studies at KCT. For detailed department information, please refer to the official KCT website.',
    source: 'Official KCT Website',
  },
];
