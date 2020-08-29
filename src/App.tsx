

import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import MenuItem from './components/Menu/menuItem';
import Menu from './components/Menu/menu';
import SubMenu from './components/Menu/subMenu';

export const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">

        <Menu style={{ marginLeft: 10 }} defaultIndex={0} mode="horizontal" >
          <MenuItem index={1}>cool link</MenuItem>
          <MenuItem index={2} disabled={true}>cool link1</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>
              dropdown 1
            </MenuItem>
            <MenuItem>
              dropdown 2
            </MenuItem>
          </SubMenu>
          <MenuItem index={3}>cool link2</MenuItem>
        </Menu>

        {/* <Button onClick={e => { console.log(123) }}>Hello Button</Button>
        <Button size={ButtonSize.Large}>Large</Button>
        <Button size={ButtonSize.Small}>Small</Button>
        <Button target="_blank" btnType={ButtonType.Link} href="http://www.12306.com">Link Button</Button>
        <Button btnType={ButtonType.Link} disabled href="http://www.12306.com">Link Button</Button>
        <Button btnType={ButtonType.Primary} >Primary Button</Button>
        <Button btnType={ButtonType.Danger} >Danger Button</Button> */}
        <p>
          Edit <code>src/app.tsx</code> and save to reload.
       </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
       </a>
      </header>
    </div>)
}