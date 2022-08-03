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

let MusicMenu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 48 48" width={size} height={size} {...rest}>
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M29 6v29"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        strokeLinejoin="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M15 36.04A5.04 5.04 0 0 1 20.04 31H29v5.96A5.04 5.04 0 0 1 23.96 42h-3.92A5.04 5.04 0 0 1 15 36.96v-.92Z"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="4"
        stroke="currentColor"
        d="m29 14.066 12.883 3.056V9.013L29 6v8.066Z"
        clipRule="evenodd"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="4"
        stroke="currentColor"
        d="M6 8h14M6 16h14M6 24h10"
        dataFollowStroke="currentColor"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

MusicMenu.defaultProps = {
  size: 18,
};

MusicMenu = React.memo ? React.memo(MusicMenu) : MusicMenu;

export default MusicMenu;
