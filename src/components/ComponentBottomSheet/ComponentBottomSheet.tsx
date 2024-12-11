import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { ReactElement, RefObject } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  transparentBlack: {
    backgroundColor: '#999999',
  },
});
type BottomSheetProps = {
  sheetRef: RefObject<BottomSheetModal>;
  snapPoints: string[];
  children: ReactElement;
  onBackdropPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disappearsOnIndex?: number;
  enablePanDownToClose?: boolean;
};

function ComponentBottomSheet({
  sheetRef,
  snapPoints,
  children,
  onBackdropPress = () => {},
  style,
  disappearsOnIndex = 1,
  enablePanDownToClose = true,
}: BottomSheetProps) {
  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop style={styles.transparentBlack} {...props} appearsOnIndex={1} disappearsOnIndex={disappearsOnIndex} />
  );
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        index={1}
        handleIndicatorStyle={{ backgroundColor: '#73777F' }}
        enablePanDownToClose={enablePanDownToClose}
        animateOnMount={true}
        backdropComponent={props => renderBackdrop(props)}
        onDismiss={onBackdropPress}
        style={style}
      >
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
export default ComponentBottomSheet;
