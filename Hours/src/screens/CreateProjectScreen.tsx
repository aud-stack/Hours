import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Project, MoodTag, DEFAULT_MOOD_TAGS } from '../types';
import { StorageService } from '../services/storage';
import { generateId } from '../utils/timeHelpers';

interface CreateProjectScreenProps {
  navigation: any;
}

export const CreateProjectScreen: React.FC<CreateProjectScreenProps> = ({
  navigation,
}) => {
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [selectedMoodCategory, setSelectedMoodCategory] = useState<string>('creative');
  const [makeSpotlight, setMakeSpotlight] = useState(true);

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Name Required', 'Please enter a project name.');
      return;
    }

    if (!subtitle.trim()) {
      Alert.alert('Subtitle Required', 'Please enter a subtitle for your project.');
      return;
    }

    // If making this spotlight, remove spotlight from other projects
    if (makeSpotlight) {
      const allProjects = await StorageService.getProjects();
      for (const p of allProjects) {
        if (p.isSpotlight) {
          await StorageService.updateProject(p.id, { isSpotlight: false });
        }
      }
    }

    const newProject: Project = {
      id: generateId(),
      name: name.trim(),
      subtitle: subtitle.trim(),
      moodTags: [DEFAULT_MOOD_TAGS[selectedMoodCategory]],
      isSpotlight: makeSpotlight,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      sessions: [],
    };

    await StorageService.addProject(newProject);

    Alert.alert(
      'Project Created',
      'Your new project has been created. Ready to start your first session?',
      [
        {
          text: 'Later',
          style: 'cancel',
          onPress: () => navigation.navigate('Main'),
        },
        {
          text: 'Start Session',
          onPress: () => navigation.navigate('Timer', { project: newProject }),
        },
      ]
    );
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
            <Text style={styles.backButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>New Project</Text>
          <View style={{ width: 60 }} />
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Project Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Novel Draft"
              placeholderTextColor="#8e8e93"
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Subtitle</Text>
            <TextInput
              style={styles.input}
              placeholder="First draft of my debut novel"
              placeholderTextColor="#8e8e93"
              value={subtitle}
              onChangeText={setSubtitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mood Tag Template</Text>
            <Text style={styles.helper}>
              Choose the mood tags that best fit this project
            </Text>

            <View style={styles.moodCategories}>
              {Object.entries(DEFAULT_MOOD_TAGS).map(([key, moodTag]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.categoryCard,
                    selectedMoodCategory === key && styles.categoryCardSelected,
                  ]}
                  onPress={() => setSelectedMoodCategory(key)}
                >
                  <Text
                    style={[
                      styles.categoryTitle,
                      selectedMoodCategory === key && styles.categoryTitleSelected,
                    ]}
                  >
                    {moodTag.category}
                  </Text>
                  <View style={styles.categoryOptions}>
                    {moodTag.options.map((option, i) => (
                      <Text
                        key={i}
                        style={[
                          styles.categoryOption,
                          selectedMoodCategory === key && styles.categoryOptionSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setMakeSpotlight(!makeSpotlight)}
            >
              <View style={styles.checkbox}>
                {makeSpotlight && <View style={styles.checkboxInner} />}
              </View>
              <View style={styles.checkboxLabel}>
                <Text style={styles.checkboxText}>Make this my Spotlight project</Text>
                <Text style={styles.checkboxHelper}>
                  Your Spotlight project appears on your home screen
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Create Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>Create Project</Text>
        </TouchableOpacity>

        {/* Inspiration */}
        <Text style={styles.inspiration}>
          "Your hours shape you."
        </Text>
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
    marginBottom: 32,
  },
  backButton: {
    width: 60,
  },
  backButtonText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#5856d6',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 28,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  helper: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8e8e93',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 17,
    color: '#1c1c1e',
    borderWidth: 1,
    borderColor: '#e5e5e7',
  },
  moodCategories: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    borderWidth: 2,
    borderColor: '#e5e5e7',
  },
  categoryCardSelected: {
    borderColor: '#5856d6',
    backgroundColor: '#f8f8ff',
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 10,
  },
  categoryTitleSelected: {
    color: '#5856d6',
  },
  categoryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8e8e93',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f2f2f7',
    borderRadius: 8,
  },
  categoryOptionSelected: {
    color: '#5856d6',
    backgroundColor: '#e8e8ff',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#5856d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 3,
    backgroundColor: '#5856d6',
  },
  checkboxLabel: {
    flex: 1,
  },
  checkboxText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  checkboxHelper: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8e8e93',
  },
  createButton: {
    backgroundColor: '#5856d6',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 24,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  inspiration: {
    fontSize: 17,
    fontWeight: '500',
    color: '#8e8e93',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
