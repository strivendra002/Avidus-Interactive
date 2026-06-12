import { Box, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ links, onNavigate }) => {
  return (
    <Box w="260px" bg="gray.900" color="white" minH="100vh" p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={10}>
        Momentum
      </Text>

      <Stack gap={3} align="stretch">
        {links.map((link) => (
          <NavLink key={link.path} to={link.path} onClick={onNavigate}>
            {({ isActive }) => (
              <Box
                p={3}
                borderRadius="8px"
                bg={isActive ? "gray.800" : "transparent"}
                color={isActive ? "purple.200" : "white"}
                _hover={{ bg: "gray.800", color: "purple.200" }}
              >
                {link.label}
              </Box>
            )}
          </NavLink>
        ))}
      </Stack>
    </Box>
  );
};

export default Sidebar;
