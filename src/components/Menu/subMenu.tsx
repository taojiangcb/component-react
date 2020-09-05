import React, { useContext, MouseEvent, useState } from "react"
import { MenuContext } from './menu';
import classnames from 'classnames';
import MenuItem, { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
export interface SubMenuProps {
  index?: number | string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {

  const [menuOpen, setOpen] = useState(false);
  const context = useContext(MenuContext);
  const classes = classnames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })

  const clickHandler = (e: MouseEvent) => {
    console.log('click the ',e.currentTarget);
    e.preventDefault();
    setOpen(!menuOpen);
  }

  let debunceTime: any = 0;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(debunceTime);
    e.preventDefault();
    debunceTime = setTimeout(() => {
      setOpen(toggle);
    }, 300)
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: clickHandler
  } : {};

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}

  const renderChildren = () => {
    const subMenuClasses = classnames('viking-submenu', {
      'menu-opened': menuOpen
    })

    const childrenComponents = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement && childElement.type ? childElement.type.displayName : "";
      if (displayName === MenuItem.displayName) {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      }
      else {
        console.error('Waring: SubMenu has a child which is not a MenuItem components');
      }
    })
    return <ul className={subMenuClasses}> {childrenComponents} </ul>
  }

  const subTitleClasses = classnames('submenu-title',{})

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className={subTitleClasses} {...clickEvents}>
        {title}
        <Icon type="primary" icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;