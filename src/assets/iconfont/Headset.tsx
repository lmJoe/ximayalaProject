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

let Headset: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 48 48" width={size} height={size} {...rest}>
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M42 30v-5.538C42 14.265 33.941 6 24 6S6 14.265 6 24.462V30"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        strokeLinejoin="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M34 32a4 4 0 0 1 4-4h4v14h-4a4 4 0 0 1-4-4v-6Z"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        fill={getIconColor(color, 2, 'currentColor')}
        d="M42 32h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2v-6ZM6 32H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v-6Z"
        dataFollowFill="currentColor"
      />
      <Path
        strokeLinejoin="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M6 28h4a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H6V28Z"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

Headset.defaultProps = {
  size: 18,
};

Headset = React.memo ? React.memo(Headset) : Headset;

export default Headset;
