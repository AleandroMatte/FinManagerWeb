import React from 'react';
import {
  AiFillHome,
  AiFillMoneyCollect,
  AiOutlineClockCircle,
  AiOutlineOrderedList,
} from 'react-icons/ai';
import { IoMdLogOut } from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/Home',
    icon: <AiFillHome/> ,
    cName: 'nav-text'
  },
  {
    title: 'Débitos',
    path: '/Debts',
    icon: <AiOutlineClockCircle />,
    cName: 'nav-text',
  },
  {
    title: 'Recebimentos',
    path: '/Wins',
    icon: <AiFillMoneyCollect/>,
    cName: 'nav-text',
  },
];

export const LogoutButton = {
  title: 'Logout',
  path: '',
  icon: <IoMdLogOut />,
  cName: 'nav-text',
};
