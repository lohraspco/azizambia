import { Profile } from '@/types/profile';

export interface DiscoveryFilters {
  gender: Profile['genderIdentity'] | 'any';
  minAge: number;
  maxAge: number;
  maxDistanceKm: number;
  city: string;
  country: string;
}

export function calculateDistanceKm(
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number }
) {
  const earthRadiusKm = 6371;
  const dLat = deg2rad(destination.latitude - origin.latitude);
  const dLon = deg2rad(destination.longitude - origin.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(origin.latitude)) *
      Math.cos(deg2rad(destination.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(earthRadiusKm * c);
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const sampleProfiles: Profile[] = [
  {
    id: 'sara',
    name: 'Sara',
    age: 28,
    genderIdentity: 'woman',
    orientation: 'straight',
    educationLevel: 'masters',
    occupation: 'Data Scientist',
    incomeBand: '60k-100k',
    about:
      'Born in Tehran, now in Seattle. I lead ML teams and dream about building a future with purpose and poetry.',
    interests: ['Art', 'Travel', 'Machine Learning'],
    immigrationIntent: 'support_partner_migration',
    wantsToImmigrate: false,
    willingToSponsorPartner: true,
    locationCurrent: { city: 'Seattle', country: 'United States' },
    locationOrigin: { city: 'Tehran', country: 'Iran' },
    locationPreference: {
      coordinates: { latitude: 47.6062, longitude: -122.3321 },
      distanceRadiusKm: 12000
    },
    relationshipIntent: 'serious',
    agePreference: [27, 38],
    distancePreferenceKm: 12000,
    educationPreference: "Master's+",
    incomePreference: '60k+',
    isVisibleInDiscovery: true,
    isProfileVerified: true,
    verificationMediaUrl: '',
    photoUrls: [
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      'https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg'
    ],
    languages: ['English', 'Farsi'],
    lastSeen: new Date().toISOString(),
    status: 'online',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'amir',
    name: 'Amir',
    age: 32,
    genderIdentity: 'man',
    orientation: 'straight',
    educationLevel: 'phd',
    occupation: 'Entrepreneur',
    incomeBand: '>100k',
    about:
      'Founder building a climate-tech startup in Austin. Looking for a grounded partner in Iran with curiosity for the world.',
    interests: ['Climate Action', 'Persian Literature', 'Cycling'],
    immigrationIntent: 'support_partner_migration',
    wantsToImmigrate: false,
    willingToSponsorPartner: true,
    locationCurrent: { city: 'Austin', country: 'United States' },
    locationOrigin: { city: 'Shiraz', country: 'Iran' },
    locationPreference: {
      coordinates: { latitude: 30.2672, longitude: -97.7431 },
      distanceRadiusKm: 12000
    },
    relationshipIntent: 'serious',
    agePreference: [25, 35],
    distancePreferenceKm: 12000,
    educationPreference: "Bachelor's+",
    incomePreference: 'Flexible',
    isVisibleInDiscovery: true,
    isProfileVerified: true,
    photoUrls: [
      'https://images.pexels.com/photos/458697/pexels-photo-458697.jpeg',
      'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg'
    ],
    languages: ['English', 'Farsi'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'laleh',
    name: 'Laleh',
    age: 26,
    genderIdentity: 'woman',
    orientation: 'straight',
    educationLevel: 'masters',
    occupation: 'Architect',
    incomeBand: '40k-60k',
    about:
      'Sustainable architect based in Tehran. Passionate about design, community, and exploring New York galleries someday.',
    interests: ['Architecture', 'Photography', 'Jazz'],
    immigrationIntent: 'move_to_us',
    wantsToImmigrate: true,
    willingToSponsorPartner: false,
    locationCurrent: { city: 'Tehran', country: 'Iran' },
    locationOrigin: { city: 'Tehran', country: 'Iran' },
    locationPreference: {
      coordinates: { latitude: 35.6892, longitude: 51.389 },
      distanceRadiusKm: 500
    },
    relationshipIntent: 'serious',
    agePreference: [27, 40],
    distancePreferenceKm: 12000,
    educationPreference: "Master's+",
    incomePreference: '60k+',
    isVisibleInDiscovery: true,
    isProfileVerified: false,
    photoUrls: [
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      'https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg'
    ],
    languages: ['Farsi', 'English'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
