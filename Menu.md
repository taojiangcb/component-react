# Menu 组件
在 dom 结构上主要是利用 ul 和 li 来包裹 menu children

分析抽象 menu 行为的数据结构 
```
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
```

抽象 menu context 上下文透传数据结构处理行为交互

```
/**
 * 需要传递给子组件的上下文属性
 */
interface IMenuContext {
  index: number;
  onSelect?: SelectCallBack;
}

const Menu: React.FC<MenuProps> = (props) => {
  ...

  const [currentActive, setActive] = useState(defaultIndex);

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
```

在自己 menu-item 对 context 数据进行判断来处理 menu 是哪个子级进行了 click 行为交互

```
const MenuItem: React.FC<MenuItemProps> = (props) => {
  //使用 menu 中的 context
  const context = useContext(MenuContext);
  
  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    //判断当前是否激活状态
    'is-active': context.index === index
  })

  //点击的时候 处理上下文透传过来的点击事件
  const handleClick = () => {
    context.onSelect && !disabled && context.onSelect(index);
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}
```