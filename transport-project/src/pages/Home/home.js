import { Container, Title, Text, Button } from '@mantine/core';
import './home.css';


export default function Home() {
  return (
    <div className="root">
      <Container size="lg">
        <div className="inner">
          <div className="content">
            <Title className="title">
              A{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                fully featured
              </Text>{' '}
              React components library
            </Title>

            <Text className="description" mt={30}>
              Build fully functional accessible web applications with ease – Mantine includes more
              than 100 customizable components and hooks to cover you in any situation
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className="control"
              mt={40}
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </div>
   
  );
}