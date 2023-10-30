import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import './Sidebar.css';

const data = [
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '', label: 'Security', icon: IconFingerprint },
];

export function Sidebar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className="link"
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className="linkIcon" stroke={5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className="navbar">
      <div className="navbarMain">
        <Group className="header" justify="space-between">
         
          <Code fw={10} className="version">
            v3.1.2
          </Code>
        </Group>
        {links}
      </div>

      <div className="footer">
       
        <a href="#" className="link" onClick={(event) => event.preventDefault()}>
          <IconLogout className="linkIcon" stroke={1} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}