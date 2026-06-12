import { Box, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import TaskCard from "./TaskCard";

const TaskGrid = ({ tasks, onCreate, onDelete, onEdit }) => {
  if (!tasks.length) {
    return (
      <Box textAlign="center" py={20}>
        <Heading size="md">Ready to get productive?</Heading>
        <Text color="gray.400" mt={3}>
          Create your first task and start organizing your workflow.
        </Text>
        <Button colorPalette="purple" mt={6} onClick={onCreate}>
          Create Task
        </Button>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
      {tasks.map((task) => (
        <TaskCard
          key={task._id || task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </SimpleGrid>
  );
};

export default TaskGrid;
