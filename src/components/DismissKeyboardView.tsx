import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const DismissKeyboardView: React.FC<{style?: StyleProp<ViewStyle>}> = ({
  children,
  ...props
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView
      {...props}
      //   behavior={Platform.OS === 'android' ? 'position' : 'padding'}
      style={props.style}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
