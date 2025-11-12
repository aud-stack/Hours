import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Project, Session } from '../types';
import { StorageService } from '../services/storage';
import { getTotalHours } from '../utils/timeHelpers';

interface InsightsScreenProps {
  navigation: any;
}

interface Insight {
  totalHours: number;
  totalSessions: number;
  topProject: { name: string; hours: number } | null;
  mostCommonMood: string | null;
  preferredTime: string | null;
  personalityType: string;
  bestDay: string | null;
}

export const InsightsScreen: React.FC<InsightsScreenProps> = ({ navigation }) => {
  const [insights, setInsights] = useState<Insight | null>(null);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    const projects = await StorageService.getProjects();
    const sessions = await StorageService.getSessions();

    if (sessions.length === 0) {
      setInsights(null);
      return;
    }

    // Calculate total hours
    const totalHours = getTotalHours(sessions);

    // Find top project
    const projectHours = projects.map(p => ({
      name: p.name,
      hours: getTotalHours(p.sessions),
    }));
    const topProject = projectHours.reduce((max, p) =>
      p.hours > (max?.hours || 0) ? p : max
    , projectHours[0]);

    // Most common mood
    const moodCounts: Record<string, number> = {};
    sessions.forEach(s => {
      s.mood?.forEach(m => {
        moodCounts[m] = (moodCounts[m] || 0) + 1;
      });
    });
    const mostCommonMood = Object.entries(moodCounts).reduce(
      (max, [mood, count]) => (count > (max.count || 0) ? { mood, count } : max),
      { mood: '', count: 0 }
    ).mood || null;

    // Preferred time of day
    const timeCounts: Record<string, number> = {};
    sessions.forEach(s => {
      timeCounts[s.timeOfDay] = (timeCounts[s.timeOfDay] || 0) + 1;
    });
    const preferredTime = Object.entries(timeCounts).reduce(
      (max, [time, count]) => (count > (max.count || 0) ? { time, count } : max),
      { time: '', count: 0 }
    ).time || null;

    // Best day of week
    const dayCounts: Record<string, number> = {};
    sessions.forEach(s => {
      dayCounts[s.dayOfWeek] = (dayCounts[s.dayOfWeek] || 0) + 1;
    });
    const bestDay = Object.entries(dayCounts).reduce(
      (max, [day, count]) => (count > (max.count || 0) ? { day, count } : max),
      { day: '', count: 0 }
    ).day || null;

    // Generate personality type
    const personalityType = generatePersonalityType(
      preferredTime,
      bestDay,
      mostCommonMood
    );

    setInsights({
      totalHours,
      totalSessions: sessions.length,
      topProject,
      mostCommonMood,
      preferredTime,
      personalityType,
      bestDay,
    });
  };

  const generatePersonalityType = (
    time: string | null,
    day: string | null,
    mood: string | null
  ): string => {
    const timePart = time ? `${time.charAt(0).toUpperCase()}${time.slice(1)}` : 'Anytime';
    const dayPart = day || 'Every-Day';
    const moodPart = mood || 'Dedicated';

    return `${timePart} ${dayPart} ${moodPart}`;
  };

  if (!insights || insights.totalSessions === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No insights yet</Text>
          <Text style={styles.emptySubtitle}>
            Complete a few sessions to see your patterns and personality emerge.
          </Text>
          <Text style={styles.emptyMessage}>
            "Every hour spent is who you are—right now."
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Wrapped</Text>
          <Text style={styles.subtitle}>The story of your devotion</Text>
        </View>

        {/* Hero Stats Card */}
        <LinearGradient
          colors={['#5856d6', '#7c3aed', '#a855f7']}
          style={styles.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.heroLabel}>Total Hours Devoted</Text>
          <Text style={styles.heroValue}>{insights.totalHours}</Text>
          <Text style={styles.heroSubtitle}>
            across {insights.totalSessions} sessions
          </Text>
        </LinearGradient>

        {/* Personality Type */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Your Devotion Personality</Text>
          <Text style={styles.personalityType}>{insights.personalityType}</Text>
          <Text style={styles.cardDescription}>
            You show up consistently, carving your path with intention.
          </Text>
        </View>

        {/* Patterns Grid */}
        <View style={styles.grid}>
          <View style={styles.gridCard}>
            <Text style={styles.gridLabel}>Top Project</Text>
            <Text style={styles.gridValue}>{insights.topProject?.name}</Text>
            <Text style={styles.gridSubvalue}>
              {insights.topProject?.hours}h
            </Text>
          </View>

          <View style={styles.gridCard}>
            <Text style={styles.gridLabel}>Preferred Time</Text>
            <Text style={styles.gridValue}>
              {insights.preferredTime?.charAt(0).toUpperCase()}
              {insights.preferredTime?.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.gridCard}>
            <Text style={styles.gridLabel}>Best Day</Text>
            <Text style={styles.gridValue}>{insights.bestDay}</Text>
          </View>

          <View style={styles.gridCard}>
            <Text style={styles.gridLabel}>Common Mood</Text>
            <Text style={styles.gridValue}>{insights.mostCommonMood}</Text>
          </View>
        </View>

        {/* Encouragement */}
        <View style={styles.encouragementCard}>
          <Text style={styles.encouragementText}>
            "You showed up anyway."
          </Text>
          <Text style={styles.encouragementSubtext}>
            {insights.totalSessions} times and counting
          </Text>
        </View>

        {/* Share Button (future feature) */}
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share Your Wrapped</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#6b7280',
    fontStyle: 'italic',
  },
  heroCard: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  heroLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  heroValue: {
    fontSize: 64,
    fontWeight: '700',
    color: 'white',
    letterSpacing: -2,
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8e8e93',
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  personalityType: {
    fontSize: 26,
    fontWeight: '700',
    color: '#5856d6',
    marginBottom: 12,
    lineHeight: 32,
  },
  cardDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6b7280',
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  gridCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  gridLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8e8e93',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gridValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  gridSubvalue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5856d6',
  },
  encouragementCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  encouragementText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1c1c1e',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  encouragementSubtext: {
    fontSize: 16,
    fontWeight: '400',
    color: '#8e8e93',
  },
  shareButton: {
    backgroundColor: '#5856d6',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  emptyMessage: {
    fontSize: 18,
    fontWeight: '500',
    color: '#5856d6',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
