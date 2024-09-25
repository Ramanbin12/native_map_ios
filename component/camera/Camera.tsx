import React from 'react';
import { Camera, CodeScanner, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { NoCameraDeviceError } from './components/NoCameraDeviceError';
import { PermissionsPage } from './components/PermissionPage';
import { StyleSheet, View } from 'react-native';

const CameraComponent = () => {
  const { hasPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  if (!hasPermission) {
    return <PermissionsPage />;
  }
  if (device == null) {
    return <NoCameraDeviceError />;
  }
  const codeScanner: CodeScanner = {
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log( codes);
    },
  };
  return (
    <View style={styles.absoluteFill}>
      <Camera
        style={styles.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default CameraComponent;
