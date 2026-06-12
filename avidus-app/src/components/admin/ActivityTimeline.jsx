import { Box, Stack, Text } from "@chakra-ui/react";

const ActivityTimeline = ({ logs }) => {
  if (!logs.length) {
    return (
      <Text color="gray.400" py={12} textAlign="center">
        No activity yet.
      </Text>
    );
  }

  return (
    <Stack gap={4}>
      {logs.map((log) => (
        <Box
          key={log._id || log.id}
          p={4}
          bg="white"
          color="gray.900"
          borderRadius="8px"
          boxShadow="sm"
          borderLeft="4px solid"
          borderLeftColor="purple.400"
        >
          <Text fontWeight="bold">{log.userId?.name || log.user?.name || "System"}</Text>

          <Text>{log.action}</Text>

          <Text fontSize="sm" color="gray.500">
            {log.createdAt ? new Date(log.createdAt).toLocaleString() : "Just now"}
          </Text>
        </Box>
      ))}
    </Stack>
  );
};

export default ActivityTimeline;
