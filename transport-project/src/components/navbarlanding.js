import {
  Group,
  Button, 
  Divider, 
  Box, 
  Drawer, 
  ScrollArea,
  rem  
} from '@mantine/core';


import './navbarlanding.css';

export default function Navbarlanding() {
  
  return (
    <Box pb={20}>
      <header className="header">
        <Group justify="space-between" h="100%">
            <Group h="100%" gap={0} visibleFrom="sm">
            <a href="home" className="link">
              Home
            </a>
            
            <a href="about" className="link">
              Acerca de Nosotros
            </a>
            <a href="contact" className="link">
              Contacto
            </a>
          </Group>

          <Group visibleFrom="sm">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>

          
        </Group>
      </header>

      <Drawer
        
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className="link">
            Home
          </a>
                    
          <a href="#" className="link">
            Learn
          </a>
          <a href="#" className="link">
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}