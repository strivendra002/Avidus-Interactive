import { Badge, Button, Table, Text } from "@chakra-ui/react";

const UserTable = ({ users, onToggleStatus }) => {
  if (!users.length) {
    return (
      <Text color="gray.400" py={12} textAlign="center">
        No users found.
      </Text>
    );
  }

  return (
    <Table.ScrollArea borderWidth="1px" borderColor="gray.800" borderRadius="8px">
      <Table.Root variant="outline" bg="white" color="gray.900">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user._id || user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>
                <Badge colorPalette={user.status === "Active" ? "green" : "red"}>
                  {user.status || "Active"}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Button size="sm" onClick={() => onToggleStatus(user)}>
                  Toggle
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default UserTable;
