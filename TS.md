# Partial
Partial 作用是将传入的属性变为可选项. 首先我们需要理解两个关键字 keyof 和 in, keyof 可以用来取得一个对象接口的所有 key 值.

```
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
```
