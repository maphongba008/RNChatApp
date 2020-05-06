import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import { Container, TouchableOpacity, Text } from '@src/components';
import i18n from '@src/locale';
import Logo from '@src/assets/ico-logo.png';
import colors from '@src/constants/colors';
import Screens from '@src/navigation/Screens';
import NavigationService from '@src/navigation/NavigationService';

export default class extends React.Component {
  passwordInput: TextInput | null = null;

  _submitEmail = () => {
    this.passwordInput && this.passwordInput.focus();
  };

  _submitPassword = () => {};

  _login = () => {};

  _onPressSignUp = () => {
    NavigationService.navigate(Screens.SIGN_UP_SCREEN);
  };

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.welcomeMessage}>
            {String(i18n.t('login.welcome')).toUpperCase()}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.emailInput}
              placeholder={i18n.t('login.email')}
              placeholderTextColor={colors.inputPlaceHolder}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={this._submitEmail}
            />
            <View style={styles.separator} />
            <TextInput
              ref={r => (this.passwordInput = r)}
              style={styles.passwordInput}
              placeholderTextColor={colors.inputPlaceHolder}
              placeholder={i18n.t('login.password')}
              returnKeyType="done"
              secureTextEntry
              onSubmitEditing={this._login}
            />
          </View>
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>
              {i18n.t('login.forgot_password')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._login} style={styles.signInButton}>
            <Text style={styles.signInText}>{i18n.t('login.sign_in')}</Text>
          </TouchableOpacity>
          <View style={styles.spacingView} />
          <Text style={styles.noAccountText}>{i18n.t('login.no_account')}</Text>
          <TouchableOpacity
            onPress={this._onPressSignUp}
            style={styles.signUpButton}>
            <Text style={styles.signUpText}>{i18n.t('login.signup')}</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Container.bottomSpacing + 20,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 75,
  },
  welcomeMessage: {
    marginTop: 70,
    alignSelf: 'center',
    fontSize: 25,
  },
  inputContainer: {
    marginTop: 36,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  emailInput: {
    height: 50,
    paddingHorizontal: 16,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  passwordInput: {
    height: 50,
    paddingHorizontal: 16,
  },
  forgotPasswordButton: {
    marginTop: 8,
    marginRight: 16,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  signInButton: {
    marginTop: 24,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 1,
  },
  signInText: {
    color: colors.buttonText,
  },
  spacingView: {
    flex: 1,
  },
  noAccountText: {
    alignSelf: 'center',
  },
  signUpButton: {
    alignSelf: 'center',
  },
  signUpText: {
    color: colors.accent,
  },
});
