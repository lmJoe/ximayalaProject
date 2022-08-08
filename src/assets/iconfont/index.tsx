/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import Avatar from './Avatar';
import MusicMenu from './MusicMenu';
import MusicCd from './MusicCd';
import HomeTwo from './HomeTwo';
import CollectionRecords from './CollectionRecords';
import Refresh from './Refresh';
import Right from './Right';
export { default as Avatar } from './Avatar';
export { default as MusicMenu } from './MusicMenu';
export { default as MusicCd } from './MusicCd';
export { default as HomeTwo } from './HomeTwo';
export { default as CollectionRecords } from './CollectionRecords';
export { default as Refresh } from './Refresh';
export { default as Right } from './Right';

export type IconNames = 'avatar' | 'music-menu' | 'music-cd' | 'home-two' | 'collection-records' | 'refresh' | 'right';

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
    case 'collection-records':
      return <CollectionRecords key="5" {...rest} />;
    case 'refresh':
      return <Refresh key="6" {...rest} />;
    case 'right':
      return <Right key="7" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
