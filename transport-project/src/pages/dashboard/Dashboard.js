import React from 'react'
import classes from'./Dashboard.module.css'
import {Sidebar} from '../../components/Sidebar'
import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';

const PRIMARY_COL_HEIGHT = rem(300);


export default function Dashboard() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <div> 
      
      
      
      <div className={classes.container} my="lg">   
      <div className={classes.sidebar}>
      <Sidebar /> 
      </div>   
      
      <div className={classes.content}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md"> 
      <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />           
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
      </div>
    </div>               
    
    </div>
  )
}
