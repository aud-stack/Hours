import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Project } from '../types';
import { getTotalHours } from '../utils/timeHelpers';

interface CompletionCelebrationScreenProps {
  route: any;
  navigation: any;
}

export const CompletionCelebrationScreen: React.FC<CompletionCelebrationScreenProps> = ({
  route,
  navigation,
}) => {
  const project: Project = route.params.project;
  const totalHours = getTotalHours(project.sessions);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Calculate insights
  const getTiredSessions = () => {
    return project.sessions.filter(s =>
      s.mood?.some(m => m.toLowerCase().includes('tired') || m.toLowerCase().includes('sore'))
    ).length;
  };

  const getMostCommonMood = () => {
    const moodCounts: Record<string, number> = {};
    project.sessions.forEach(s => {
      s.mood?.forEach(m => {
        moodCounts[m] = (moodCounts[m] || 0) + 1;
      });
    });

    if (Object.keys(moodCounts).length === 0) return null;

    return Object.entries(moodCounts).reduce((max, [mood, count]) =>
      count > (max.count || 0) ? { mood, count } : max
    , { mood: '', count: 0 }).mood;
  };

  const handleDone = () => {
    navigation.navigate('Main', { screen: 'Projects' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#5856d6', '#7c3aed', '#a855f7']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Confetti emoji as placeholder for confetti animation */}
          <Text style={styles.confetti}>🎉</Text>

          <Text style={styles.title}>Project Complete!</Text>

          <View style={styles.projectCard}>
            <Text style={styles.projectName}>{project.name}</Text>
            <Text style={styles.projectSubtitle}>{project.subtitle}</Text>
          </View>

          {/* Summary Stats */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Hours Devoted</Text>
              <Text style={styles.summaryValue}>{totalHours}</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Sessions</Text>
              <Text style={styles.summaryValue}>{project.sessions.length}</Text>
            </View>

            {getTiredSessions() > 0 && (
              <>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>You pushed through</Text>
                  <Text style={styles.summaryValue}>
                    {getTiredSessions()} tough {getTiredSessions() === 1 ? 'session' : 'sessions'}
                  </Text>
                </View>
              </>
            )}

            {getMostCommonMood() && (
              <>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Most Common Mood</Text>
                  <Text style={styles.summaryValue}>{getMostCommonMood()}</Text>
                </View>
              </>
            )}
          </View>

          {/* Encouragement */}
          <View style={styles.encouragement}>
            <Text style={styles.encouragementText}>
              "You showed up anyway."
            </Text>
            <Text style={styles.encouragementSubtext}>
              {totalHours} hours is who you are now.
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share Certificate</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  confetti: {
    fontSize: 72,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
    marginBottom: 32,
    textAlign: 'center',
  },
  projectCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  projectName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  projectSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    marginBottom: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1c1c1e',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e5e5e7',
    marginVertical: 8,
  },
  encouragement: {
    marginBottom: 40,
  },
  encouragementText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  encouragementSubtext: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  shareButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#5856d6',
    fontSize: 18,
    fontWeight: '600',
  },
  doneButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
