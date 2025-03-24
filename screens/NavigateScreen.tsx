import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useDeadReckoning from 'useDeadReckoning'; // adjust path if needed

export const sharedPositionRef = { current: { x: 0, y: 0 } };

const NavigateScreen = () => {
  const position = useDeadReckoning();

  // Keep latest position in a shared exportable ref
  useEffect(() => {
    sharedPositionRef.current = position;
  }, [position]);

  // Optional: Update at fixed interval if needed by other modules
  useEffect(() => {
    const interval = setInterval(() => {
      // This value is updated every second but not shown
      const { x, y } = sharedPositionRef.current;
      console.log(`📍 Silent Position: (${x.toFixed(2)}, ${y.toFixed(2)})`);
      // You could also emit this to a socket or write to a store
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
  },
});

export default NavigateScreen;
