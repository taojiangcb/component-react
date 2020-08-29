import React, { useContext } from "react"
import { MenuContext } from './menu';
import classnames from 'classnames';
import MenuItem, { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
  const context = useContext(MenuContext);
  const classes = classnames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })

  const renderChildren = () => {

    const subMenuClasses = classnames('viking-submenu',{

    })

    const childrenComponents = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement && childElement.type ? childElement.type.displayName : "";
      if (displayName === MenuItem.displayName) {
        return childElement;
      }
      else {
        console.error('Waring: SubMenu has a child which is not a MenuItem components');
      }
    })
    return <ul className={subMenuClasses}> {childrenComponents} </ul>
  }

  return (
    <li key={index} className={classes}>
      <div className='submenu-title'>{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;