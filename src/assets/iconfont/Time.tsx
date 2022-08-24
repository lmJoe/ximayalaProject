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

let Time: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 48 48" width={size} height={size} {...rest}>
      <Path
        strokeLinejoin="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M24.008 12v12.01l8.479 8.48"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

Time.defaultProps = {
  size: 18,
};

Time = React.memo ? React.memo(Time) : Time;

export default Time;
