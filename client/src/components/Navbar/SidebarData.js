import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Podcasts',
    path: '/podcasts',
    icon: <FaIcons.FaPodcast size={24} />,
    cName: 'nav-text',
  },
  {
    title: 'Episodes',
    path: '/episodes',
    icon: <AiIcons.AiFillAudio size={24} />,
    cName: 'nav-text',
  },
  {
    title: 'Websites',
    path: '/website-settings',
    icon: <MdIcons.MdWeb size={24} />,
    cName: 'nav-text',
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <IoIcons.IoMdSettings size={24} />,
    cName: 'nav-text',
  },
];
