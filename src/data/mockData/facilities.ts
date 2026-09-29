/**
 * KCT Campus Facilities
 * Source: General KCT campus information
 * 
 * IMPORTANT: Do not invent specific capacity, timing, or fee details.
 * For current operational details, refer to official KCT information.
 */

export interface Facility {
  id: string;
  name: string;
  emoji: string;
  icon: string;
  description: string;
  details: string[];
  note: string;
  source: string;
}

export const campusFacilities: Facility[] = [
  {
    id: 'library',
    name: 'Mahatma Gandhi Central Library',
    emoji: '📚',
    icon: 'Library',
    description: 'KCT provides a central library facility supporting students, faculty, academic learning, and research activities.',
    details: [
      'Library Resources',
      'Digital Resources',
      'Reading Facilities',
      'Research Support',
    ],
    note: 'For current library timings, resource details and access information, check the latest official KCT library information.',
    source: 'Official KCT Website',
  },
  {
    id: 'hostel',
    name: 'Hostel',
    emoji: '🏠',
    icon: 'BedDouble',
    description: 'KCT provides hostel facilities for students. The hostel supports residential student accommodation.',
    details: [
      'Student Accommodation',
      'Dining Facilities',
      'Security',
      'Common Areas',
    ],
    note: 'For current hostel availability, fees, rules and other details, please refer to the latest official KCT hostel information.',
    source: 'Official KCT Website',
  },
  {
    id: 'sports',
    name: 'Sports',
    emoji: '🏃',
    icon: 'Trophy',
    description: 'KCT campus provides sports and physical activity facilities for students.',
    details: [
      'Indoor Sports',
      'Outdoor Sports',
      'Physical Education',
    ],
    note: 'For current sports facility details and schedules, refer to the official KCT information.',
    source: 'Official KCT Website',
  },
  {
    id: 'transport',
    name: 'Transport',
    emoji: '🚌',
    icon: 'Bus',
    description: 'KCT provides campus transportation services to support student commuting.',
    details: [
      'Bus Transportation',
      'Campus Connectivity',
      'Student Transportation Support',
    ],
    note: 'For current transport routes, timings and fees, check the latest official KCT transport schedule.',
    source: 'Official KCT Website',
  },
  {
    id: 'wellness',
    name: 'Wellness',
    emoji: '🏥',
    icon: 'Heart',
    description: 'KCT provides wellness and health support facilities for students on campus.',
    details: [
      'Health Support',
      'Student Wellness',
    ],
    note: 'For current wellness facility details, refer to the official KCT information.',
    source: 'Official KCT Website',
  },
  {
    id: 'food',
    name: 'Food Facilities',
    emoji: '🍴',
    icon: 'UtensilsCrossed',
    description: 'KCT campus provides food and dining facilities for students and staff.',
    details: [
      'Canteen / Cafeteria',
      'Food Courts',
    ],
    note: 'For current food facility details, timings and pricing, refer to the official KCT information.',
    source: 'Official KCT Website',
  },
  {
    id: 'shops',
    name: 'Campus Shops',
    emoji: '🛍️',
    icon: 'ShoppingBag',
    description: 'KCT campus includes shops and retail services for student convenience.',
    details: [
      'Stationery',
      'Student Supplies',
    ],
    note: 'For current shop details and availability, refer to the official KCT campus information.',
    source: 'Official KCT Website',
  },
  {
    id: 'print',
    name: 'Printing / Reprographic Services',
    emoji: '🖨️',
    icon: 'Printer',
    description: 'KCT campus provides printing and reprographic services for academic needs.',
    details: [
      'Printing Services',
      'Photocopying',
      'Academic Document Services',
    ],
    note: 'For current service details, refer to the official KCT campus information.',
    source: 'Official KCT Website',
  },
  {
    id: 'academic',
    name: 'Academic Blocks',
    emoji: '🏢',
    icon: 'Building2',
    description: 'KCT campus includes dedicated academic blocks housing classrooms, laboratories, and faculty offices.',
    details: [
      'Classrooms',
      'Laboratories',
      'Faculty Offices',
    ],
    note: 'For current block details, refer to the official KCT campus information.',
    source: 'Official KCT Website',
  },
  {
    id: 'conference',
    name: 'Conference Facilities',
    emoji: '🎤',
    icon: 'Presentation',
    description: 'KCT campus provides conference, seminar and auditorium facilities for academic and co-curricular events.',
    details: [
      'Auditorium',
      'Seminar Halls',
      'Conference Rooms',
    ],
    note: 'For current facility booking and availability, refer to the official KCT information.',
    source: 'Official KCT Website',
  },
];
