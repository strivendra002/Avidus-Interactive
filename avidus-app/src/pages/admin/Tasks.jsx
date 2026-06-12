import { Alert, Box, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import ConfirmDialog from "../../components/ConfirmDialog";
import TaskTable from "../../components/admin/TaskTable";
import { toaster } from "../../components/ui/toasterStore";

const getTasksFromResponse = (payload) => payload?.data || payload?.tasks || payload || [];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTasks = async () => {
    setError("");

    try {
      const res = await API.get("/admin/tasks");
      setTasks(getTasksFromResponse(res.data));
    } catch (err) {
      const message = err.response?.data?.message || "Unable to load tasks.";
      setError(message);
      toaster.create({ title: message, type: "error", duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    API.get("/admin/tasks", { signal: controller.signal })
      .then((res) => {
        setTasks(getTasksFromResponse(res.data));
      })
      .catch((err) => {
        if (err.name !== "CanceledError") {
          const message = err.response?.data?.message || "Unable to load tasks.";
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

  const deleteTask = async () => {
    if (!taskToDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      const res = await API.delete(`/admin/tasks/${taskToDelete}`);
      await fetchTasks();
      setTaskToDelete(null);
      toaster.create({
        title: res.data?.message || "Task deleted successfully",
        type: "success",
        duration: 3000,
      });
    } catch (err) {
      const message = err.response?.data?.message || "Unable to delete task.";
      setError(message);
      toaster.create({ title: message, type: "error", duration: 3000 });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Heading mb={6}>Workspace Monitor</Heading>

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
        <TaskTable tasks={tasks} onDelete={setTaskToDelete} />
      )}

      <ConfirmDialog
        open={Boolean(taskToDelete)}
        title="Delete task?"
        description="This will permanently remove the task from the workspace."
        isLoading={isDeleting}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={deleteTask}
      />
    </>
  );
};

export default Tasks;
