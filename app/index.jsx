import React from 'react'
import { Redirect, Stack } from 'expo-router';

const Index = () => {
  return (
    <>
      <Stack.Screen options={ { headerShown: false } } />
      <Redirect href="/jobs" />
    </>
  );
};

export default Index;