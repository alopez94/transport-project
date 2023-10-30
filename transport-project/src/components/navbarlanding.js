import {
  Group,
  Button, 
  Box, 
  Drawer, 
  ScrollArea,
  rem  
} from '@mantine/core';


import './Navbarlanding.modules.css';

export default function Navbarlanding() {
  
  return (
    <Box pb={20}>
      <header className={"header"}>
        <Group justify="space-between" h="100%">
            <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className="link">
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
          

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" href="login">Log in</Button>
            <Button href="signup">Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}