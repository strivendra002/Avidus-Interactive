import { Alert, Box, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import UserTable from "../../components/admin/UserTable";
import { toaster } from "../../components/ui/toasterStore";

const getUsersFromResponse = (payload) => payload?.data || payload?.users || payload || [];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setError("");

    try {
      const res = await API.get("/admin/users");
      setUsers(getUsersFromResponse(res.data));
    } catch (err) {
      const message = err.response?.data?.message || "Unable to load users.";
      setError(message);
      toaster.create({ title: message, type: "error", duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    API.get("/admin/users", { signal: controller.signal })
      .then((res) => {
        setUsers(getUsersFromResponse(res.data));
      })
      .catch((err) => {
        if (err.name !== "CanceledError") {
          const message = err.response?.data?.message || "Unable to load users.";
          setError(message);
          toaster.create({ title: message, type: "error", duration: 3000 });
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const toggleStatus = async (user) => {
    const status = user.status === "Active" ? "Inactive" : "Active";

    try {
      const res = await API.patch(`/admin/users/${user._id || user.id}/status`, {
        status,
      });
      await fetchUsers();
      toaster.create({
        title: res.data?.message || `User marked ${status}`,
        type: "success",
        duration: 3000,
      });
    } catch (err) {
      const message = err.response?.data?.message || "Unable to update user status.";
      setError(message);
      toaster.create({ title: message, type: "error", duration: 3000 });
    }
  };

  return (
    <>
      <Heading mb={6}>Team Directory</Heading>

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
        <UserTable users={users} onToggleStatus={toggleStatus} />
      )}
    </>
  );
};

export default Users;
