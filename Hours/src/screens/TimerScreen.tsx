import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { formatDuration } from '../utils/timeHelpers';

interface TimerScreenProps {
  route: any;
  navigation: any;
}

export const TimerScreen: React.FC<TimerScreenProps> = ({ route, navigation }) => {
  const { project } = route.params;
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const lightProgress = useRef(new Animated.Value(0)).current;

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Accumulated Light animation - progresses every 30 seconds
  useEffect(() => {
    const progress = Math.min(seconds / 7200, 1); // 2 hours = full brightness

    Animated.timing(lightProgress, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [seconds]);

  // Interpolate gradient colors from dark purple/blue to golden amber
  const startColor = lightProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1a0b2e', '#ffa726'], // Deep purple to golden
  });

  const middleColor = lightProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2d1b4e', '#ffb74d'], // Purple to light golden
  });

  const endColor = lightProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['#4a2c6b', '#ffcc80'], // Lighter purple to amber
  });

  const handleEnd = () => {
    setIsRunning(false);
    navigation.navigate('MoodCheck', {
      project,
      duration: seconds,
      startTime: new Date(Date.now() - seconds * 1000).toISOString(),
    });
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View style={styles.gradientContainer}>
        <LinearGradient
          colors={[startColor, middleColor, endColor] as any}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.content}>
            {/* Project Name */}
            <Text style={styles.projectName}>{project.name}</Text>

            {/* Timer Display */}
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{formatDuration(seconds)}</Text>
              <Text style={styles.timerLabel}>hours of devotion</Text>
            </View>

            {/* Subtle progress indicator */}
            <View style={styles.progressContainer}>
              <View style={styles.progressTrack}>
                <Animated.View
                  style={[
                    styles.progressBar,
                    {
                      width: lightProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
            </View>

            {/* Pause/End Controls */}
            <View style={styles.controls}>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={handleCancel}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleEnd}
              >
                <Text style={styles.primaryButtonText}>
                  {isRunning ? 'End Session' : 'Complete'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Ambient message */}
            <Text style={styles.ambientMessage}>
              {seconds < 300
                ? 'Beginning...'
                : seconds < 1800
                ? 'Another hour in devotion.'
                : 'You showed up anyway.'}
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0b2e',
  },
  gradientContainer: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  projectName: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: -40,
  },
  timerText: {
    fontSize: 72,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.98)',
    letterSpacing: 2,
    fontVariant: ['tabular-nums'],
  },
  timerLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
    letterSpacing: 1,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: -60,
  },
  progressTrack: {
    width: 200,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  controls: {
    width: '100%',
    gap: 16,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a0b2e',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
    letterSpacing: 0.5,
  },
  ambientMessage: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
});
