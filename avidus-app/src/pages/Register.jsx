import {
  Alert,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await API.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to create account. Please try again.",
      );
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
            Create your workspace account and start organizing work with your team.
          </Text>
        </Box>

        <Box as="form" flex="1" p={10} onSubmit={handleRegister}>
          <Heading size="lg" mb={6}>
            Create Account
          </Heading>

          <Stack gap={4}>
            {error && <Alert.Root status="error">{error}</Alert.Root>}

            <Input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />

            <NativeSelect.Root>
              <NativeSelect.Field
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </NativeSelect.Field>
            </NativeSelect.Root>

            <Button colorPalette="purple" type="submit" loading={isSubmitting}>
              Register
            </Button>

            <Text color="gray.300" fontSize="sm">
              Already have an account?{" "}
              <Link asChild color="purple.200">
                <RouterLink to="/login">Login</RouterLink>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;
