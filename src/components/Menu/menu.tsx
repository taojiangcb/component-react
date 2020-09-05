
import React, { createContext, useState } from 'react';
import classnames from 'classnames';
import MenuItem, { MenuItemProps } from './menuItem';
import SubMenu from './subMenu';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallBack = (selectedIndex: number | string) => void;

/**
 * menu的属性类型
 */
export interface MenuProps {
  defaultIndex?: number | string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallBack;
}

/**
 * 需要传递给子组件的上下文属性
 */
interface IMenuContext {
  index: number | string;
  onSelect?: SelectCallBack;
  mode?: MenuMode;
}

/**
 * 上下文穿透给子级组件
 */
export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classnames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== "vertical",
  });

  const handleClick = (index: number | string) => {
    setActive(index);
    onSelect && onSelect(index);
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
    mode,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === MenuItem.displayName || displayName === SubMenu.displayName) {
        return React.cloneElement(childElement, { index });
      }
      else {
        console.error('has child is not MenuItem.');
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: -1,
  mode: "horizontal"
}

export default Menu;