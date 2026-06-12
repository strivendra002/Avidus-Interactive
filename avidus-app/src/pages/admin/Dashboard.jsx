import { Alert, Box, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import StatCard from "../../components/admin/StatCard";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    API.get("/admin/analytics", { signal: controller.signal })
      .then((res) => {
        setAnalytics(res.data.analytics || res.data || {});
      })
      .catch((err) => {
        if (err.name !== "CanceledError") {
          setError(err.response?.data?.message || "Unable to load analytics.");
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <Heading mb={6}>Control Center</Heading>

      {error && (
        <Alert.Root status="error" mb={6}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {!analytics && !error ? (
        <Box py={16} textAlign="center">
          <Spinner size="lg" />
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={5}>
          <StatCard title="Users" value={analytics?.totalUsers} accent="purple" />
          <StatCard title="Tasks" value={analytics?.totalTasks} accent="blue" />
          <StatCard title="Completed" value={analytics?.completedTasks} accent="green" />
          <StatCard title="Pending" value={analytics?.pendingTasks} accent="orange" />
        </SimpleGrid>
      )}
    </>
  );
};

export default Dashboard;
