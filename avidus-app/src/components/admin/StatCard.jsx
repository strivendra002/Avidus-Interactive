import { Box, Heading, Text } from "@chakra-ui/react";

const StatCard = ({ title, value, accent = "purple" }) => {
  return (
    <Box
      bg={`${accent}.500`}
      color="white"
      p={6}
      borderRadius="8px"
      boxShadow="md"
    >
      <Text opacity={0.82}>{title}</Text>

      <Heading mt={2}>{value ?? 0}</Heading>
    </Box>
  );
};

export default StatCard;
