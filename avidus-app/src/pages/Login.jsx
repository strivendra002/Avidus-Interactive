import {
  Alert,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../context/auth";
import API from "../api/axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data.user, res.data.token);
      if (res.data.user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/tasks");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      bg="gray.900"
      color="white"
      align="center"
      justify="center"
      px={4}
    >
      <Flex
        w="100%"
        maxW="1100px"
        bg="rgba(255,255,255,0.05)"
        backdropFilter="blur(10px)"
        borderRadius="24px"
        overflow="hidden"
      >
        <Box flex="1" p={12} display={{ base: "none", md: "block" }}>
          <Heading mb={4}>TaskFlow</Heading>

          <Text color="gray.400">
            Manage tasks, teams and productivity in one workspace.
          </Text>
        </Box>

        <Box as="form" flex="1" p={10} onSubmit={handleLogin}>
          <Heading size="lg" mb={6}>
            Welcome Back
          </Heading>

          <Stack gap={4}>
            {error && <Alert.Root status="error">{error}</Alert.Root>}

            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button colorPalette="purple" type="submit" loading={isSubmitting}>
              Login
            </Button>

            <Text color="gray.300" fontSize="sm">
              New here?{" "}
              <Link asChild color="purple.200">
                <RouterLink to="/register">Create an account</RouterLink>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
