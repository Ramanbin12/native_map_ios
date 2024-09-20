import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Camera, useMicrophonePermission } from 'react-native-vision-camera';

export const PermissionsPage = () => {
  useEffect(() => {
    const cameraPermission = Camera.requestCameraPermission();
    console.log(cameraPermission);
  },[]);

  return (
    <Text>PermissionPage</Text>
  );
};
