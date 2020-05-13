import React from 'react';
import { StyleSheet, View, TextInput, Image, ScrollView } from 'react-native';
import {
  Container,
  TouchableOpacity,
  Text,
  Header,
  ParsedText,
} from '@src/components';
import i18n from '@src/locale';
import IconClose from '@src/assets/ico-close-modal.png';
import colors from '@src/constants/colors';
import NavigationService from '@src/navigation/NavigationService';
import { SignUpStore } from '@src/stores/SignUpStore';
import { observer } from 'mobx-react';

@observer
export default class extends React.Component {
  passwordInput: TextInput | null = null;
  lastNameInput: TextInput | null = null;
  emailInput: TextInput | null = null;
  signUpStore = new SignUpStore();

  _submitFirstName = () => {
    this.lastNameInput && this.lastNameInput.focus();
  };

  _submitLastName = () => {
    this.emailInput && this.emailInput.focus();
  };

  _submitEmail = () => {
    this.passwordInput && this.passwordInput.focus();
  };

  _submitPassword = () => {};

  _onPressClose = () => {
    NavigationService.goBack();
  };

  _signUp = () => {};

  render() {
    const store = this.signUpStore;
    return (
      <Container>
        <Header
          leftIcon={IconClose}
          onPressLeft={this._onPressClose}
          backgroundColor="transparent"
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.title}>
              {String(i18n.t('signup.title')).toUpperCase()}
            </Text>
            <View style={styles.inputContainer}>
              <View style={styles.nameContainer}>
                <TextInput
                  value={store.firstName}
                  onChangeText={store.setFirstName}
                  style={styles.firstNameInput}
                  placeholder={i18n.t('signup.first_name')}
                  placeholderTextColor={colors.inputPlaceHolder}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={this._submitFirstName}
                />
                <View style={styles.vSeparator} />
                <TextInput
                  value={store.lastName}
                  onChangeText={store.setLastName}
                  ref={r => (this.lastNameInput = r)}
                  style={styles.lastNameInput}
                  placeholder={i18n.t('signup.last_name')}
                  placeholderTextColor={colors.inputPlaceHolder}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={this._submitLastName}
                />
              </View>
              <View style={styles.separator} />
              <TextInput
                value={store.email}
                onChangeText={store.setEmail}
                ref={r => (this.emailInput = r)}
                style={styles.emailInput}
                placeholder={i18n.t('signup.email')}
                placeholderTextColor={colors.inputPlaceHolder}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={this._submitEmail}
              />
              <View style={styles.separator} />
              <TextInput
                value={store.password}
                onChangeText={store.setPassword}
                ref={r => (this.passwordInput = r)}
                style={styles.passwordInput}
                placeholderTextColor={colors.inputPlaceHolder}
                placeholder={i18n.t('signup.password')}
                returnKeyType="done"
                secureTextEntry
                onSubmitEditing={this._signUp}
              />
            </View>
            <ParsedText style={styles.termText}>
              {i18n.t('signup.term')}
            </ParsedText>
            <View style={styles.spacingView} />
            <TouchableOpacity
              onPress={store.signUp}
              style={styles.signUpButton}>
              <Text style={styles.signUpText}>
                {String(i18n.t('signup.title')).toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Container.bottomSpacing,
  },
  scrollView: {
    flexGrow: 1,
  },
  title: {
    marginTop: 35,
    alignSelf: 'center',
    fontSize: 25,
  },
  inputContainer: {
    marginTop: 106,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  firstNameInput: {
    height: 50,
    flex: 1,
    paddingHorizontal: 16,
  },
  lastNameInput: {
    height: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  emailInput: {
    height: 50,
    paddingHorizontal: 16,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  vSeparator: {
    width: 1,
    backgroundColor: colors.border,
  },
  passwordInput: {
    height: 50,
    paddingHorizontal: 16,
  },
  termText: {
    marginTop: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  signUpButton: {
    marginBottom: 50,
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
  spacingView: {
    flex: 1,
  },
  signUpText: {
    color: colors.buttonText,
  },
});
