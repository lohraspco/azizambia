export type ImmigrationIntent = 'move_to_us' | 'move_to_iran' | 'undecided' | 'support_partner_migration';

export interface LocationPreference {
  city?: string;
  country?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  distanceRadiusKm?: number;
}

export type RelationshipIntent = 'serious' | 'friendship' | 'networking';

export interface Profile {
  id: string;
  name: string;
  age: number;
  genderIdentity: string;
  orientation: string;
  educationLevel: string;
  occupation?: string;
  incomeBand?: string;
  about?: string;
  interests: string[];
  immigrationIntent: ImmigrationIntent;
  wantsToImmigrate: boolean;
  willingToSponsorPartner: boolean;
  locationCurrent: {
    city: string;
    country: string;
  };
  locationOrigin: {
    city: string;
    country: string;
  };
  locationPreference: LocationPreference;
  relationshipIntent: RelationshipIntent;
  agePreference: [number, number];
  distancePreferenceKm: number;
  educationPreference?: string;
  incomePreference?: string;
  isVisibleInDiscovery: boolean;
  isProfileVerified: boolean;
  verificationMediaUrl?: string;
  photoUrls: string[];
  languages: string[];
  lastSeen?: string;
  status?: 'online' | 'offline';
  createdAt: string;
  updatedAt: string;
  deactivatedAt?: string;
  deletedAt?: string;
}

export interface Match {
  id: string;
  users: string[];
  createdAt: string;
  lastInteractionAt: string;
  conversationId: string;
}

export interface ConversationMessage {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  readBy: string[];
  type: 'text' | 'image';
}
