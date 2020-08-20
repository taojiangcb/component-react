

import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

export const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={e=>{console.log(123)}}>Hello Button</Button>
        <Button size={ButtonSize.Large}>Large</Button>
        <Button size={ButtonSize.Small}>Small</Button>
        <Button target="_blank" btnType={ButtonType.Link} href="http://www.12306.com">Link Button</Button>
        <Button btnType={ButtonType.Link} disabled href="http://www.12306.com">Link Button</Button>
        <Button btnType={ButtonType.Primary} >Primary Button</Button>
        <Button btnType={ButtonType.Danger} >Danger Button</Button>
        <p>
          Edit <code>src/app.tsx</code> and save to reload.
       </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
       </a>
      </header>
    </div>)
}