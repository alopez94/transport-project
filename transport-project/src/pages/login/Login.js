import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import {NavLink} from 'react-router-dom'

import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';

  import './Login.module.css'

  export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isPending} = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password);
    }

    return (
    <Container id="login-form" size={420} my={40}>
      <Title ta="center" className="title">
        Welcome!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <NavLink to="/signup" size="sm" component="button">Create account</NavLink>
      </Text>

      <Paper  withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput 
            label="Email" 
            placeholder="you@mantine.dev" 
            required 
            onChange={(e) =>setEmail(e.target.value)} 
            value={email}
            />
        <PasswordInput 
            label="Password" 
            placeholder="Your password" 
            required mt="md" 
            onChange={(e) =>setPassword(e.target.value)}
            value={password}
            />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        {!isPending && <Button form='login-form' type='submit' onClick={handleSubmit} fullWidth mt="xl">
          Sign in
        </Button>}

        
        {error && <p>{error}</p>}
      </Paper>
    </Container>
    )
  }
  