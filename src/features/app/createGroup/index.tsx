import React from 'react';
import { Container, Header } from '@src/components';

import Iconback from '@src/assets/Path.png';
import NavigationService from '@src/navigation/NavigationService';

export default class CreateGroupScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header
          leftIcon={Iconback}
          onPressLeft={NavigationService.goBack}
          title="Create Group"
        />
      </Container>
    );
  }
}
