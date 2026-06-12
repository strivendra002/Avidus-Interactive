import { Box, Drawer, Flex, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const links = [
  {
    label: "My Tasks",
    path: "/tasks",
  },
];

const UserLayout = () => {
  const { open, onOpen, onClose, setOpen } = useDisclosure();

  return (
    <Flex minH="100vh" bg="gray.950">
      <Box display={{ base: "none", md: "block" }}>
        <Sidebar links={links} />
      </Box>

      <Drawer.Root
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
        placement="start"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="gray.900">
            <Drawer.Body p={0}>
              <Sidebar links={links} onNavigate={onClose} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      <Box flex={1}>
        <Topbar onMenuOpen={onOpen} />

        <Box p={6} color="white">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default UserLayout;
