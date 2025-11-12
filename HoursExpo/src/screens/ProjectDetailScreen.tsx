import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Project, Session } from '../types';
import { StorageService } from '../services/storage';
import { getTotalHours, formatDuration } from '../utils/timeHelpers';

interface ProjectDetailScreenProps {
  route: any;
  navigation: any;
}

export const ProjectDetailScreen: React.FC<ProjectDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const [project, setProject] = useState<Project>(route.params.project);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    const projectSessions = await StorageService.getSessionsForProject(project.id);
    setSessions(projectSessions.sort((a, b) =>
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    ));
  };

  const handleStartSession = () => {
    navigation.navigate('Timer', { project });
  };

  const handleMarkComplete = () => {
    Alert.alert(
      'Complete Project?',
      'This will archive the project and show your completion summary.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          style: 'default',
          onPress: async () => {
            const updatedProject = {
              ...project,
              isCompleted: true,
              isSpotlight: false,
              completedAt: new Date().toISOString(),
            };
            await StorageService.updateProject(project.id, updatedProject);
            navigation.navigate('CompletionCelebration', { project: updatedProject });
          },
        },
      ]
    );
  };

  const handleToggleSpotlight = async () => {
    // First, remove spotlight from all other projects
    const allProjects = await StorageService.getProjects();
    for (const p of allProjects) {
      if (p.id !== project.id && p.isSpotlight) {
        await StorageService.updateProject(p.id, { isSpotlight: false });
      }
    }

    // Then toggle this project's spotlight
    const updatedProject = { ...project, isSpotlight: !project.isSpotlight };
    await StorageService.updateProject(project.id, updatedProject);
    setProject(updatedProject);
  };

  const formatSessionDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Project Info */}
        <View style={styles.projectHeader}>
          {project.isSpotlight && (
            <View style={styles.spotlightBadge}>
              <Text style={styles.spotlightBadgeText}>SPOTLIGHT</Text>
            </View>
          )}
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectSubtitle}>{project.subtitle}</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{getTotalHours(project.sessions)}</Text>
            <Text style={styles.statLabel}>hours devoted</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{project.sessions.length}</Text>
            <Text style={styles.statLabel}>sessions</Text>
          </View>
        </View>

        {/* Action Buttons */}
        {!project.isCompleted && (
          <>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartSession}
            >
              <Text style={styles.startButtonText}>Start Session</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.spotlightButton}
              onPress={handleToggleSpotlight}
            >
              <Text style={styles.spotlightButtonText}>
                {project.isSpotlight ? '★ Remove from Spotlight' : '☆ Make Spotlight'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Recent Sessions */}
        <View style={styles.sessionsSection}>
          <Text style={styles.sectionTitle}>
            Recent Sessions ({sessions.length})
          </Text>

          {sessions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No sessions yet. Start your first session to begin building your hours.
              </Text>
            </View>
          ) : (
            sessions.map((session, index) => (
              <View key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionHeader}>
                  <Text style={styles.sessionDate}>
                    {formatSessionDate(session.startTime)}
                  </Text>
                  <Text style={styles.sessionDuration}>
                    {formatDuration(session.duration)}
                  </Text>
                </View>

                {session.mood && session.mood.length > 0 && (
                  <View style={styles.sessionMoods}>
                    {session.mood.map((mood, i) => (
                      <View key={i} style={styles.moodTag}>
                        <Text style={styles.moodTagText}>{mood}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {session.sessionType && (
                  <Text style={styles.sessionType}>{session.sessionType}</Text>
                )}

                {session.reflectionNote && (
                  <Text style={styles.sessionNote}>{session.reflectionNote}</Text>
                )}
              </View>
            ))
          )}
        </View>

        {/* Mark Complete Button */}
        {!project.isCompleted && sessions.length > 0 && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleMarkComplete}
          >
            <Text style={styles.completeButtonText}>Mark Complete</Text>
          </TouchableOpacity>
        )}

        {project.isCompleted && (
          <View style={styles.completedBanner}>
            <Text style={styles.completedText}>
              ✓ Completed on {new Date(project.completedAt || '').toLocaleDateString()}
            </Text>
          </View>
        )}
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
    marginBottom: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#5856d6',
  },
  projectHeader: {
    marginBottom: 24,
  },
  spotlightBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#5856d6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  spotlightBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 1,
  },
  projectName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  projectSubtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#6b7280',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 40,
    fontWeight: '700',
    color: '#5856d6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8e8e93',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e5e7',
  },
  startButton: {
    backgroundColor: '#5856d6',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 12,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  spotlightButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#5856d6',
  },
  spotlightButtonText: {
    color: '#5856d6',
    fontSize: 16,
    fontWeight: '600',
  },
  sessionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 16,
  },
  sessionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  sessionDuration: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5856d6',
  },
  sessionMoods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  moodTag: {
    backgroundColor: '#f2f2f7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  moodTagText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5856d6',
  },
  sessionType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8e8e93',
    marginBottom: 4,
  },
  sessionNote: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 4,
  },
  completeButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e5e5e7',
  },
  completeButtonText: {
    color: '#8e8e93',
    fontSize: 16,
    fontWeight: '600',
  },
  completedBanner: {
    backgroundColor: '#34c759',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  completedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#8e8e93',
    textAlign: 'center',
    lineHeight: 22,
  },
});
