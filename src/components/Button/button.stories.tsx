import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import Button, { ButtonSize } from './button';

const defaultButton = ()=> (
  <Button onClick={action('click')}> default button </Button>
)

const buttonWithSize = ()=> (
  <>
    <Button size={ButtonSize.Large}> large button </Button>
    <Button size={ButtonSize.Small}> small button </Button>
  </>
)

storiesOf('Button Component',module)
  .add('默认 Button',defaultButton)