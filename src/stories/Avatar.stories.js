import React from 'react';
import { Avatar } from '../Avatar';

export default { title: 'Avatar' };

export const defaultAvatar = () => <Avatar username="Anthow" />;

export const avatarWithGrayBorder = () => <Avatar username="Anthow" grayBorder />;

export const notReadyPlayerAvatar = () => <Avatar username="Anthow" ready={false} />;

export const readyPlayerAvatar = () => <Avatar username="Anthow" ready />;

export const avatarWithUsername = () => <Avatar username="Anthow" showUsername />;
