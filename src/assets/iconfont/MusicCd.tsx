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

let MusicCd: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 48 48" width={size} height={size} {...rest}>
      <Path
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
        d="M26 14v14"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        strokeLinejoin="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M14 28.666C14 26.64 15.934 25 18.32 25H26v4.334C26 31.36 24.066 33 21.68 33h-3.36C15.934 33 14 31.359 14 29.334v-.668Z"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="4"
        stroke="currentColor"
        d="m32 15-6-1"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

MusicCd.defaultProps = {
  size: 18,
};

MusicCd = React.memo ? React.memo(MusicCd) : MusicCd;

export default MusicCd;
