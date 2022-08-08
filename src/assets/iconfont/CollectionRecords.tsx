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

let CollectionRecords: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 48 48" width={size} height={size} {...rest}>
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M40 22c0-9.941-8.059-18-18-18S4 12.059 4 22s8.059 18 18 18"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M33.3 30c-1.822 0-3.3 1.722-3.3 3.846 0 3.845 3.9 7.34 6 8.154 2.1-.813 6-4.31 6-8.154C42 31.722 40.523 30 38.7 30c-1.116 0-2.103.646-2.7 1.634-.597-.988-1.584-1.634-2.7-1.634Z"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        strokeWidth="4"
        stroke="currentColor"
        d="M22 27a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

CollectionRecords.defaultProps = {
  size: 18,
};

CollectionRecords = React.memo ? React.memo(CollectionRecords) : CollectionRecords;

export default CollectionRecords;
