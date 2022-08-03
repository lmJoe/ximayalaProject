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

let HomeTwo: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 48 48" width={size} height={size} {...rest}>
      <Path
        strokeLinejoin="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M44 44V20L24 4 4 20v24h12V26h16v18h12Z"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M24 44V34"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

HomeTwo.defaultProps = {
  size: 18,
};

HomeTwo = React.memo ? React.memo(HomeTwo) : HomeTwo;

export default HomeTwo;
