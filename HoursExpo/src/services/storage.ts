import AsyncStorage from '@react-native-async-storage/async-storage';
import { Project, Session } from '../types';

const PROJECTS_KEY = '@hours_projects';
const SESSIONS_KEY = '@hours_sessions';

export const StorageService = {
  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const data = await AsyncStorage.getItem(PROJECTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  },

  async saveProjects(projects: Project[]): Promise<void> {
    try {
      await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  },

  async addProject(project: Project): Promise<void> {
    const projects = await this.getProjects();
    projects.push(project);
    await this.saveProjects(projects);
  },

  async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
    const projects = await this.getProjects();
    const index = projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates };
      await this.saveProjects(projects);
    }
  },

  async deleteProject(projectId: string): Promise<void> {
    const projects = await this.getProjects();
    const filtered = projects.filter(p => p.id !== projectId);
    await this.saveProjects(filtered);
  },

  // Sessions
  async getSessions(): Promise<Session[]> {
    try {
      const data = await AsyncStorage.getItem(SESSIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  },

  async saveSessions(sessions: Session[]): Promise<void> {
    try {
      await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving sessions:', error);
    }
  },

  async addSession(session: Session): Promise<void> {
    const sessions = await this.getSessions();
    sessions.push(session);
    await this.saveSessions(sessions);
  },

  async getSessionsForProject(projectId: string): Promise<Session[]> {
    const sessions = await this.getSessions();
    return sessions.filter(s => s.projectId === projectId);
  },

  // Clear all data
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([PROJECTS_KEY, SESSIONS_KEY]);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  },
};
