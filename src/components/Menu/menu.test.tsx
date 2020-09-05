import React from 'react';
import Menu, { MenuProps } from './menu';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import MenuItem from './menuItem';
import '@testing-library/jest-dom/extend-expect';

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  mode: 'vertical',
  defaultIndex: 0,
  onSelect: jest.fn()
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem > active </MenuItem>
      <MenuItem disabled > disabled </MenuItem>
      <MenuItem > xyz </MenuItem>
    </Menu>
  )
}

const createStyleFile = ()=> {
  const cssFile:string = ` 
    .viking-submenu {
      display:none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style')
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
}

let wapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wapper = render(generateMenu(testProps));
    menuElement = wapper.getByTestId('test-menu');
    activeElement = wapper.getByText('active');
    disabledElement = wapper.getByText('disabled');
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('viking-menu test');
    expect(activeElement).toHaveClass('is-active');
    expect(disabledElement).toHaveClass('is-disabled');
  })
  it('click items should change actived and call the right callback', () => {
    const thirdElement = wapper.getByText('xyz');
    fireEvent.click(thirdElement);
    expect(thirdElement).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
  })
  it('should render vertial model when mode is set to vertical', () => {
  })
})

let wapper2:RenderResult;
describe('test menu and MenuItem component is vertical mode',()=> {
  beforeEach(()=> {
    wapper2 = render(generateMenu(testVerProps));
    wapper2.container.append(createStyleFile());
  })
})