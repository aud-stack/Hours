import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Project } from '../types';
import { StorageService } from '../services/storage';
import { getTotalHours } from '../utils/timeHelpers';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [spotlightProject, setSpotlightProject] = useState<Project | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const projects = await StorageService.getProjects();
    const activeProjects = projects.filter(p => !p.isCompleted);

    const spotlight = activeProjects.find(p => p.isSpotlight);
    setSpotlightProject(spotlight || null);

    const recent = activeProjects
      .filter(p => !p.isSpotlight)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
    setRecentProjects(recent);
  };

  const handleStartSession = () => {
    if (spotlightProject) {
      navigation.navigate('Timer', { project: spotlightProject });
    }
  };

  const handleCreateProject = () => {
    navigation.navigate('CreateProject');
  };

  if (!spotlightProject) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Your hours shape you</Text>
          <Text style={styles.emptySubtitle}>
            Create your first project to begin tracking your devotion.
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateProject}
          >
            <Text style={styles.createButtonText}>Create Project</Text>
          </TouchableOpacity>
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
          <Text style={styles.greeting}>Hours</Text>
          <Text style={styles.tagline}>The story's unfolding.</Text>
        </View>

        {/* Spotlight Project */}
        <View style={styles.spotlightCard}>
          <View style={styles.spotlightBadge}>
            <Text style={styles.spotlightBadgeText}>SPOTLIGHT</Text>
          </View>

          <Text style={styles.spotlightName}>{spotlightProject.name}</Text>
          <Text style={styles.spotlightSubtitle}>{spotlightProject.subtitle}</Text>

          <View style={styles.spotlightStats}>
            <Text style={styles.spotlightHours}>
              {getTotalHours(spotlightProject.sessions)}
            </Text>
            <Text style={styles.spotlightHoursLabel}>hours devoted</Text>
          </View>

          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartSession}
          >
            <Text style={styles.startButtonText}>Start Session</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => navigation.navigate('ProjectDetail', { project: spotlightProject })}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Projects */}
        {recentProjects.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Other Projects</Text>
            {recentProjects.map(project => (
              <TouchableOpacity
                key={project.id}
                style={styles.projectCard}
                onPress={() => navigation.navigate('ProjectDetail', { project })}
              >
                <View style={styles.projectInfo}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectSubtitle}>{project.subtitle}</Text>
                </View>
                <Text style={styles.projectHours}>
                  {getTotalHours(project.sessions)}h
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Quick Actions */}
        <TouchableOpacity
          style={styles.newProjectButton}
          onPress={handleCreateProject}
        >
          <Text style={styles.newProjectButtonText}>+ New Project</Text>
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
    marginBottom: 32,
  },
  greeting: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 17,
    fontWeight: '400',
    color: '#6b7280',
    fontStyle: 'italic',
  },
  spotlightCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 28,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  spotlightBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#5856d6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  spotlightBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 1,
  },
  spotlightName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  spotlightSubtitle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#6b7280',
    marginBottom: 24,
  },
  spotlightStats: {
    alignItems: 'center',
    marginBottom: 24,
  },
  spotlightHours: {
    fontSize: 56,
    fontWeight: '300',
    color: '#5856d6',
    letterSpacing: -1,
  },
  spotlightHoursLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8e8e93',
    marginTop: 4,
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
  viewDetailsButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#5856d6',
    fontSize: 16,
    fontWeight: '600',
  },
  recentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 16,
  },
  projectCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  projectSubtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#8e8e93',
  },
  projectHours: {
    fontSize: 22,
    fontWeight: '600',
    color: '#5856d6',
  },
  newProjectButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e5e7',
    borderStyle: 'dashed',
  },
  newProjectButtonText: {
    color: '#5856d6',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1c1c1e',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 38,
  },
  emptySubtitle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  createButton: {
    backgroundColor: '#5856d6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
