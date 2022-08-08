/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let Right: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 48 48" width={size} height={size} {...rest}>
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="4"
        stroke="currentColor"
        d="m19 12 12 12-12 12"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Right.defaultProps = {
  size: 18,
};

Right = React.memo ? React.memo(Right) : Right;

export default Right;
