
import React, { createContext, useState } from 'react';
import classnames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallBack = (selectedIndex: number) => void;

/**
 * menu的属性类型
 */
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallBack;
}

/**
 * 需要传递给子组件的上下文属性
 */
interface IMenuContext {
  index: number;
  onSelect?: SelectCallBack;
}

/**
 * 上下文穿透给子级组件
 */
export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classnames('viking-menu', className, {
    'menu-vertical': mode === 'vertical'
  });

  const handleClick = (index: number) => {
    setActive(index);
    onSelect && onSelect(index);
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  }

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal"
}

export default Menu;