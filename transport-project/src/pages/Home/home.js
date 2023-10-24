import { Container, Title, Text, Button } from '@mantine/core';
import './Home.css';


export default function Home() {
  return (
    <div className="root">
      <Container size="lg">
        <div className="inner">
          <div className="content">
            <Title className="title">
              La {' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                mejor solución
              </Text>{' '}
              para sus necesidades de transporte
            </Title>

            <Text className="description" mt={30}>
              Nos caracterizamos por dar un servicio de calidad enfocandonos en la seguridad de su carga, la responsabilidad y la garantia de que usted tendra el mejor servicio
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className="control"
              mt={40}
            >
              Comencemos
            </Button>
          </div>
        </div>
      </Container>
    </div>
   
  );
}