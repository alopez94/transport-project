import React from 'react'
import './Dashboard.module.css'
import {Sidebar} from '../../components/Sidebar'
import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';

const PRIMARY_COL_HEIGHT = rem(300);


export default function Dashboard() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <div>
      
      <Container my="md">
        
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">       
      
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false}> 
          </Skeleton>
        <Grid gutter="md">
          <Grid.Col>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
        
    </div>
  )
}
