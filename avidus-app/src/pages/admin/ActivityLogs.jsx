import { Alert, Box, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import ActivityTimeline from "../../components/admin/ActivityTimeline";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    API.get("/admin/activity-logs", { signal: controller.signal })
      .then((res) => {
        setLogs(res.data.logs || res.data || []);
      })
      .catch((err) => {
        if (err.name !== "CanceledError") {
          setError(err.response?.data?.message || "Unable to load activity.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <Heading mb={6}>Live Activity Feed</Heading>

      {error && (
        <Alert.Root status="error" mb={6}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {isLoading ? (
        <Box py={16} textAlign="center">
          <Spinner size="lg" />
        </Box>
      ) : (
        <ActivityTimeline logs={logs} />
      )}
    </>
  );
};

export default ActivityLogs;
