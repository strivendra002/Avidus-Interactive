import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toaster } from "./ui/toasterStore";

const Topbar = ({ onMenuOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toaster.create({
      title: "Signed out",
      description: "You have been logged out safely.",
      type: "success",
      duration: 3000,
    });
    navigate("/login");
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      p={5}
      borderBottom="1px solid"
      borderColor="gray.700"
      bg="gray.950"
      color="white"
    >
      <Flex align="center" gap={3}>
        <IconButton
          aria-label="Open menu"
          size="sm"
          variant="ghost"
          display={{ base: "inline-flex", md: "none" }}
          onClick={onMenuOpen}
        >
          <FaBars />
        </IconButton>

        <Text fontWeight="bold">Welcome, {user?.name || "User"}</Text>
      </Flex>

      <Button size="sm" colorPalette="red" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
};

export default Topbar;
