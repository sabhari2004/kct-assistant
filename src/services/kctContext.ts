/**
 * KCT AI Knowledge Base
 * ─────────────────────────────────────────────────────────────────────────────
 * Builds a COMPACT context string injected into every AI request.
 * Kept small intentionally to stay within Groq's request size limits.
 *
 * FUTURE: Replace with dynamic Firestore query (only fetch relevant facts).
 */

import { kctInfo } from '../data/mockData/collegeInfo';
import {
  undergraduateProgrammes,
  postgraduateProgrammes,
} from '../data/mockData/programmes';

// ─── Compact KCT Ground Truth ─────────────────────────────────────────────────

export function buildKctContext(): string[] {
  const ugList = undergraduateProgrammes.map((p) => p.name).join(', ');
  const pgList = postgraduateProgrammes.map((p) => p.name).join(', ');

  return [
    '=== KCT VERIFIED FACTS ===',
    `Name: ${kctInfo.name} (KCT)`,
    `Location: ${kctInfo.location.city}, Tamil Nadu, India. Full address: ${kctInfo.location.fullAddress}`,
    `Website: ${kctInfo.contact.website}`,
    `Phone: ${kctInfo.contact.main} | Admissions: ${kctInfo.contact.admissions}`,
    `Affiliation: Anna University, Coimbatore`,
    `CRITICAL: KCT MCA is a 2-year (4-semester) PG programme. NOT 3 years.`,
    `UG Programmes: ${ugList}`,
    `PG Programmes: ${pgList}`,
    `Facilities: Library (Mahatma Gandhi Central Library), Hostels (Boys & Girls), Sports, Transport, Cafeteria`,
    `Placements: Dedicated Placement & Career Development Cell. Companies from IT, Core, Product, Management sectors recruit from KCT.`,
    `Admissions: UG via TNEA, PG via TANCET/GATE/Management quota. Check kct.ac.in for current details.`,
    `Scholarships: Mahatma Gandhi (MG) Merit Scholarship (awarded to top academic performers and meritorious students), Swami Vivekananda Scholarship, Achiever Scholarship, Sports Scholarship, and Government BC/MBC/SC/ST & First Graduate concessions.`,
  ];
}

// Legacy exports (kept for any other files that import them)
export const KCT_GROUND_TRUTH: string[] = buildKctContext();
export const KCT_FAQ_CONTEXT: string[] = [];
