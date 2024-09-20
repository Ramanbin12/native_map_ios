import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Camera } from 'react-native-vision-camera';

export const PermissionsPage = () => {
  useEffect(() => {
    const cameraPermission = Camera.requestCameraPermission();
    console.log(cameraPermission);
  },[]);

  return (
    <Text>PermissionPage</Text>
  );
};
