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

interface ProjectsScreenProps {
  navigation: any;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ navigation }) => {
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [completedProjects, setCompletedProjects] = useState<Project[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const projects = await StorageService.getProjects();

    const active = projects.filter(p => !p.isCompleted)
      .sort((a, b) => {
        if (a.isSpotlight !== b.isSpotlight) {
          return a.isSpotlight ? -1 : 1;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    const completed = projects.filter(p => p.isCompleted)
      .sort((a, b) =>
        new Date(b.completedAt || b.createdAt).getTime() -
        new Date(a.completedAt || a.createdAt).getTime()
      );

    setActiveProjects(active);
    setCompletedProjects(completed);
  };

  const handleCreateProject = () => {
    navigation.navigate('CreateProject');
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
          <Text style={styles.title}>Projects</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateProject}
          >
            <Text style={styles.createButtonText}>+ New</Text>
          </TouchableOpacity>
        </View>

        {/* Active Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Active ({activeProjects.length})
          </Text>
          {activeProjects.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No active projects yet. Create one to get started.
              </Text>
            </View>
          ) : (
            activeProjects.map(project => (
              <TouchableOpacity
                key={project.id}
                style={[
                  styles.projectCard,
                  project.isSpotlight && styles.spotlightCard,
                ]}
                onPress={() => navigation.navigate('ProjectDetail', { project })}
              >
                {project.isSpotlight && (
                  <View style={styles.spotlightBadge}>
                    <Text style={styles.spotlightBadgeText}>SPOTLIGHT</Text>
                  </View>
                )}
                <View style={styles.projectInfo}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectSubtitle}>{project.subtitle}</Text>
                  <View style={styles.projectMeta}>
                    <Text style={styles.projectHours}>
                      {getTotalHours(project.sessions)} hours
                    </Text>
                    <Text style={styles.projectSessions}>
                      {project.sessions.length} sessions
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Completed Projects */}
        {completedProjects.length > 0 && (
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => setShowCompleted(!showCompleted)}
            >
              <Text style={styles.sectionTitle}>
                Completed ({completedProjects.length})
              </Text>
              <Text style={styles.toggleIcon}>
                {showCompleted ? '−' : '+'}
              </Text>
            </TouchableOpacity>

            {showCompleted && (
              <View>
                {completedProjects.map(project => (
                  <TouchableOpacity
                    key={project.id}
                    style={styles.projectCard}
                    onPress={() => navigation.navigate('ProjectDetail', { project })}
                  >
                    <View style={styles.projectInfo}>
                      <Text style={[styles.projectName, styles.completedText]}>
                        {project.name}
                      </Text>
                      <Text style={styles.projectSubtitle}>{project.subtitle}</Text>
                      <View style={styles.projectMeta}>
                        <Text style={styles.projectHours}>
                          {getTotalHours(project.sessions)} hours
                        </Text>
                        <Text style={styles.completedDate}>
                          Completed {new Date(project.completedAt || '').toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1c1c1e',
  },
  createButton: {
    backgroundColor: '#5856d6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1c1c1e',
  },
  toggleIcon: {
    fontSize: 28,
    fontWeight: '300',
    color: '#5856d6',
  },
  projectCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  spotlightCard: {
    borderWidth: 2,
    borderColor: '#5856d6',
  },
  spotlightBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#5856d6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  spotlightBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.8,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  projectSubtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#8e8e93',
    marginBottom: 12,
  },
  projectMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  projectHours: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5856d6',
  },
  projectSessions: {
    fontSize: 15,
    fontWeight: '400',
    color: '#8e8e93',
  },
  completedText: {
    color: '#8e8e93',
  },
  completedDate: {
    fontSize: 15,
    fontWeight: '400',
    color: '#8e8e93',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#8e8e93',
    textAlign: 'center',
  },
});
