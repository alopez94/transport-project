import { useState } from "react";
import "./Signup.module.css";
//hooks
import { useSignup } from "../../hooks/useSignup";

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
} from "@mantine/core";

export default function Login() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, isPending, error} = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, lastName, phone, company, email, password);
  };

  return (
    <Container id="login-form" size={420} my={40}>
      <Title ta="center" className="title">
        Welcome!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already register, Sign In?{" "}
        <Anchor size="sm" component="button">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={15} radius="md">
        <TextInput
          type="text"
          label="Name"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <TextInput
          type="text"
          label="Last Name"
          placeholder="Last Name"
          required
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <TextInput
          type="email"
          label="Email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextInput
          type="tel"
          label="Phone"
          placeholder="Phone"
          required
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <TextInput
          type="text"
          label="Company"
          placeholder="Company"
          required
          onChange={(e) => setCompany(e.target.value)}
          value={company}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        {!isPending && (
          <Button
            form="login-form"
            type="submit"
            onClick={handleSubmit}
            fullWidth
            mt="xl"
          >
            Sign in
          </Button>
        )}
        {isPending && <button 
        fullWidth
        mt="xl"
        >loading</button>}
        {error & <p>{error}</p>}
      </Paper>
    </Container>
  );
}
