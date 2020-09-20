
import React from 'react';
import { configure, addDecorator } from '@storybook/react';
// import '../src/styles/index.scss';

function loadStories() {
  require.context('../src', true, /\.stories\.tsx$/);
}

configure(loadStories, module);

const styles: React.CSSProperties = { textAlign: 'center' }

const centerDecorator = (storyFN: any) => <div style={styles}>{storyFN()}</div>;
addDecorator(centerDecorator);