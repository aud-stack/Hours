import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Session, SessionType } from '../types';
import { StorageService } from '../services/storage';
import { getTimeOfDay, getDayOfWeek, generateId } from '../utils/timeHelpers';

interface MoodCheckScreenProps {
  route: any;
  navigation: any;
}

export const MoodCheckScreen: React.FC<MoodCheckScreenProps> = ({
  route,
  navigation,
}) => {
  const { project, duration, startTime } = route.params;
  const moodOptions = project.moodTags[0]?.options || [];
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState<number>(3);
  const [sessionType, setSessionType] = useState<SessionType>('Deep Work');
  const [locationTags, setLocationTags] = useState<string[]>([]);
  const [reflectionNote, setReflectionNote] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const sessionTypes: SessionType[] = [
    'Deep Work',
    'Editing',
    'Brainstorming',
    'Practice',
    'Learning',
    'Creating',
  ];

  const toggleMood = (mood: string) => {
    setSelectedMoods(prev =>
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  };

  const addLocation = () => {
    if (newLocation.trim()) {
      setLocationTags(prev => [...prev, newLocation.trim()]);
      setNewLocation('');
    }
  };

  const removeLocation = (location: string) => {
    setLocationTags(prev => prev.filter(l => l !== location));
  };

  const handleComplete = async () => {
    const endTime = new Date().toISOString();

    const newSession: Session = {
      id: generateId(),
      projectId: project.id,
      startTime,
      endTime,
      duration,
      mood: selectedMoods.length > 0 ? selectedMoods : undefined,
      energyLevel,
      sessionType,
      locationTags: locationTags.length > 0 ? locationTags : undefined,
      reflectionNote: reflectionNote.trim() || undefined,
      timeOfDay: getTimeOfDay(),
      dayOfWeek: getDayOfWeek(),
    };

    await StorageService.addSession(newSession);

    // Update project with the new session
    const updatedProject = {
      ...project,
      sessions: [...project.sessions, newSession],
    };
    await StorageService.updateProject(project.id, updatedProject);

    navigation.navigate('Main', { screen: 'Home' });
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
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
          <Text style={styles.title}>Session Complete</Text>
          <Text style={styles.subtitle}>
            {formatDuration(duration)} on {project.name}
          </Text>
          <Text style={styles.message}>How did it feel?</Text>
        </View>

        {/* Mood Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Mood</Text>
          <View style={styles.tagContainer}>
            {moodOptions.map(mood => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.tag,
                  selectedMoods.includes(mood) && styles.tagSelected,
                ]}
                onPress={() => toggleMood(mood)}
              >
                <Text
                  style={[
                    styles.tagText,
                    selectedMoods.includes(mood) && styles.tagTextSelected,
                  ]}
                >
                  {mood}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Energy Level */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Energy Level</Text>
          <View style={styles.energyContainer}>
            {[1, 2, 3, 4, 5].map(level => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.energyDot,
                  energyLevel >= level && styles.energyDotActive,
                ]}
                onPress={() => setEnergyLevel(level)}
              />
            ))}
          </View>
        </View>

        {/* Session Type */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Session Type</Text>
          <View style={styles.tagContainer}>
            {sessionTypes.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.tag,
                  sessionType === type && styles.tagSelected,
                ]}
                onPress={() => setSessionType(type)}
              >
                <Text
                  style={[
                    styles.tagText,
                    sessionType === type && styles.tagTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Location (Optional)</Text>
          <View style={styles.locationInputContainer}>
            <TextInput
              style={styles.locationInput}
              placeholder="Add a location..."
              placeholderTextColor="#8e8e93"
              value={newLocation}
              onChangeText={setNewLocation}
              onSubmitEditing={addLocation}
              returnKeyType="done"
            />
            {newLocation.trim().length > 0 && (
              <TouchableOpacity style={styles.addButton} onPress={addLocation}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
          {locationTags.length > 0 && (
            <View style={styles.tagContainer}>
              {locationTags.map((location, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.tag, styles.tagSelected]}
                  onPress={() => removeLocation(location)}
                >
                  <Text style={styles.tagTextSelected}>{location}</Text>
                  <Text style={styles.removeIcon}> ×</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Reflection Note */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Reflection (Optional)</Text>
          <TextInput
            style={styles.reflectionInput}
            placeholder="Any thoughts about this session..."
            placeholderTextColor="#8e8e93"
            value={reflectionNote}
            onChangeText={setReflectionNote}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Complete Button */}
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>Save Session</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 16,
  },
  message: {
    fontSize: 15,
    fontWeight: '400',
    color: '#8e8e93',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#e5e5e7',
  },
  tagSelected: {
    backgroundColor: '#5856d6',
    borderColor: '#5856d6',
  },
  tagText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1c1c1e',
  },
  tagTextSelected: {
    color: 'white',
  },
  removeIcon: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  energyContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  energyDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e5e5e7',
  },
  energyDotActive: {
    backgroundColor: '#5856d6',
    borderColor: '#5856d6',
  },
  locationInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  locationInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1c1c1e',
    borderWidth: 1,
    borderColor: '#e5e5e7',
  },
  addButton: {
    backgroundColor: '#5856d6',
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  reflectionInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1c1c1e',
    borderWidth: 1,
    borderColor: '#e5e5e7',
    minHeight: 100,
  },
  completeButton: {
    backgroundColor: '#5856d6',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    marginTop: 8,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
