import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from '../components/DismissKeyboardView';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef<TextInput | null>(null); // <> => 함수의 타입을 알려주는 generic
  const passwordRef = useRef<TextInput | null>(null); // ref는 null이 들어갈 수 있다.

  const onChangeEmail = useCallback(text => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text);
  }, []);

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      // trim, 공백 제거 함수
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    Alert.alert('알림', '로그인 되었습니다.');
  }, [email, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;
  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이메일을 입력해주세요."
          value={email}
          onChangeText={onChangeEmail}
          // 자동완성
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address" // 골뱅이 @ 있는 입력창
          returnKeyType="next" // 키보드에서 엔터키
          onSubmitEditing={() => {
            passwordRef.current?.focus(); // 다음 입력창으로 포커스
          }}
          blurOnSubmit={false} // 키보드 내려가는 것 막기
          ref={emailRef} // ref 지정
          // clearButtonMode="while-editing" // ios에서만 가능
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry // 비밀번호 가리기
          // 자동완성
          importantForAutofill="yes"
          autoComplete="password"
          textContentType="password"
          keyboardType="decimal-pad"
          onSubmitEditing={onSubmit}
          ref={passwordRef}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            !canGoNext
              ? styles.loginButton
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }
          onPress={onSubmit}
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default SignIn;
