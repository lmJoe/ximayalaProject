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

let Refresh: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 48 48" width={size} height={size} {...rest}>
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M42 8v16M6 24v16m36-16c0-9.941-8.059-18-18-18a17.947 17.947 0 0 0-12.952 5.5M6 24c0 9.941 8.059 18 18 18a17.94 17.94 0 0 0 12.5-5.048"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Refresh.defaultProps = {
  size: 18,
};

Refresh = React.memo ? React.memo(Refresh) : Refresh;

export default Refresh;
