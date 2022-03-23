import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

const DismissKeyboardView: React.FC<{style?: StyleProp<ViewStyle>}> = ({
  children,
  ...props
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView
      {...props}
      behavior={Platform.OS === 'android' ? 'position' : 'padding'}
      style={props.style}>
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
