import { Badge, Button, Table, Text } from "@chakra-ui/react";

const TaskTable = ({ tasks, onDelete }) => {
  if (!tasks.length) {
    return (
      <Text color="gray.400" py={12} textAlign="center">
        No tasks found.
      </Text>
    );
  }

  return (
    <Table.ScrollArea borderWidth="1px" borderColor="gray.800" borderRadius="8px">
      <Table.Root variant="outline" bg="white" color="gray.900">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>User</Table.ColumnHeader>
            <Table.ColumnHeader>Task</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task._id || task.id}>
              <Table.Cell>{task.userId?.name || task.user?.name || "Unassigned"}</Table.Cell>
              <Table.Cell>{task.title}</Table.Cell>
              <Table.Cell>
                <Badge colorPalette={task.status === "Completed" ? "green" : "orange"}>
                  {task.status || "Pending"}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Button
                  colorPalette="red"
                  size="sm"
                  onClick={() => onDelete(task._id || task.id)}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default TaskTable;
