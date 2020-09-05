import React, { FC } from 'react';
import classnames from 'classnames';
import { FontAwesomeIconProps, FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classnames('viking-icon',className, {
    [`icon-${theme}`]: theme
  })

  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
}

export default Icon;

