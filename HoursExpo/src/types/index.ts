export interface Project {
  id: string;
  name: string;
  subtitle: string;
  moodTags: MoodTag[];
  isSpotlight: boolean;
  isCompleted: boolean;
  createdAt: string;
  completedAt?: string;
  sessions: Session[];
}

export interface Session {
  id: string;
  projectId: string;
  startTime: string;
  endTime: string;
  duration: number; // in seconds
  mood?: string[];
  energyLevel?: number; // 1-5
  sessionType?: SessionType;
  locationTags?: string[];
  reflectionNote?: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  dayOfWeek: string;
}

export interface MoodTag {
  category: string;
  options: string[];
}

export type SessionType =
  | 'Deep Work'
  | 'Editing'
  | 'Brainstorming'
  | 'Practice'
  | 'Learning'
  | 'Creating';

export interface InsightData {
  totalHours: number;
  topProject: Project;
  mostCommonMood: string;
  preferredTimes: string[];
  personalityType: string;
  patterns: string[];
}

export const DEFAULT_MOOD_TAGS: Record<string, MoodTag> = {
  creative: {
    category: 'Creative Work',
    options: ['Flowing', 'Blocked', 'Inspired', 'Focused'],
  },
  physical: {
    category: 'Physical Goal',
    options: ['Energized', 'Sore', 'Strong', 'Tired'],
  },
  learning: {
    category: 'Learning',
    options: ['Engaged', 'Confused', 'Breakthrough', 'Productive'],
  },
};
