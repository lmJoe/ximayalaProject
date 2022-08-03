/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import Avatar from './Avatar';
import MusicMenu from './MusicMenu';
import MusicCd from './MusicCd';
import HomeTwo from './HomeTwo';
export { default as Avatar } from './Avatar';
export { default as MusicMenu } from './MusicMenu';
export { default as MusicCd } from './MusicCd';
export { default as HomeTwo } from './HomeTwo';

export type IconNames = 'avatar' | 'music-menu' | 'music-cd' | 'home-two';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'avatar':
      return <Avatar key="1" {...rest} />;
    case 'music-menu':
      return <MusicMenu key="2" {...rest} />;
    case 'music-cd':
      return <MusicCd key="3" {...rest} />;
    case 'home-two':
      return <HomeTwo key="4" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
