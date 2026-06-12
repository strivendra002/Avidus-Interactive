import { Badge, Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaPen, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, onDelete, onEdit }) => {
  const taskId = task._id || task.id;
  const isCompleted = task.status === "Completed";

  return (
    <Box
      p={5}
      borderRadius="8px"
      bg="gray.900"
      color="white"
      boxShadow="md"
      borderWidth="1px"
      borderColor="gray.800"
      transition="transform 0.2s ease, border-color 0.2s ease"
      _hover={{ transform: "translateY(-4px)", borderColor: "purple.400" }}
    >
      <Flex justify="space-between" align="center" mb={3} gap={3}>
        <Badge colorPalette={isCompleted ? "green" : "orange"}>
          {task.status || "Pending"}
        </Badge>

        <Flex gap={2}>
          <IconButton
            aria-label="Edit task"
            size="sm"
            variant="ghost"
            onClick={() => onEdit(task)}
          >
            <FaPen />
          </IconButton>

          <IconButton
            aria-label="Delete task"
            size="sm"
            colorPalette="red"
            variant="ghost"
            onClick={() => onDelete(taskId)}
          >
            <FaTrash />
          </IconButton>
        </Flex>
      </Flex>

      <Text fontWeight="bold" fontSize="lg">
        {task.title}
      </Text>

      {task.description && (
        <Text mt={2} color="gray.400">
          {task.description}
        </Text>
      )}
    </Box>
  );
};

export default TaskCard;
