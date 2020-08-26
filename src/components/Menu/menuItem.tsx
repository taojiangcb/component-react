import React, { useContext } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu'

export interface MenuItemProps {
  index?: number;
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
    context.onSelect && index && !disabled && context.onSelect(index);
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = "MenuItem";

export default MenuItem;

