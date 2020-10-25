import React, { useContext } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu'

export interface MenuItemProps {
  index?: number | string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { children, className, style, index, disabled } = props;
  const context = useContext(MenuContext);

  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  const handleClick = () => {
    console.log('click the menu-item : ', index);
    const indexCanuse = typeof index === 'number' || typeof index === 'string';
    context.onSelect && index!== undefined && !disabled && context.onSelect(index);
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = "MenuItem";
export default MenuItem;

