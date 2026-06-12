import {
  Alert,
  Button,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios";
import ConfirmDialog from "../../components/ConfirmDialog";
import CreateTaskModal from "../../components/task/CreateTaskModal";
import TaskGrid from "../../components/task/TaskGrid";
import { toaster } from "../../components/ui/toasterStore";

const getTasksFromResponse = (payload) => payload?.data || payload?.tasks || payload || [];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTasks = async ({ showLoading = true } = {}) => {
    setError("");

    if (showLoading) {
      setIsLoading(true);
    }

    try {
      const res = await API.get("/task");
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

    API.get("/task", { signal: controller.signal })
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

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const saveTask = async (taskData) => {
    setError("");
    setIsSaving(true);

    try {
      if (selectedTask) {
        const res = await API.patch(
          `/task/${selectedTask._id || selectedTask.id}`,
          taskData,
        );
        toaster.create({
          title: res.data?.message || "Task Updated",
          type: "success",
          duration: 3000,
        });
      } else {
        const res = await API.post("/task", taskData);
        toaster.create({
          title: res.data?.message || "Task Created",
          type: "success",
          duration: 3000,
        });
      }

      await fetchTasks();
      closeModal();
    } catch (err) {
      const message = err.response?.data?.message || "Unable to save task.";
      setError(message);
      toaster.create({ title: message, type: "error", duration: 3000 });
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) {
      return;
    }

    setError("");
    setIsDeleting(true);

    try {
      const res = await API.delete(`/task/${taskToDelete}`);
      await fetchTasks();
      setTaskToDelete(null);
      toaster.create({
        title: res.data?.message || "Task Deleted",
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

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return tasks;
    }

    return tasks.filter((task) =>
      [task.title, task.description, task.status]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [search, tasks]);

  return (
    <>
      <Flex justify="space-between" align="center" mb={6} gap={4} wrap="wrap">
        <Heading>Momentum Workspace</Heading>

        <Button colorPalette="purple" onClick={openCreateModal}>
          New Task
        </Button>
      </Flex>

      <Input
        placeholder="Search tasks..."
        mb={6}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        bg="gray.900"
        borderColor="gray.800"
        color="white"
      />

      {error && (
        <Alert.Root status="error" mb={6}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {isLoading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} h="160px" borderRadius="8px" />
          ))}
        </SimpleGrid>
      ) : (
        <TaskGrid
          tasks={filteredTasks}
          onCreate={openCreateModal}
          onDelete={setTaskToDelete}
          onEdit={openEditModal}
        />
      )}

      {isModalOpen && (
        <CreateTaskModal
          key={selectedTask?._id || selectedTask?.id || "new-task"}
          open={isModalOpen}
          onClose={closeModal}
          onOpenChange={(details) => {
            if (!details.open) {
              closeModal();
            }
          }}
          onSubmit={saveTask}
          task={selectedTask}
          isSaving={isSaving}
        />
      )}

      <ConfirmDialog
        open={Boolean(taskToDelete)}
        isLoading={isDeleting}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={confirmDeleteTask}
      />
    </>
  );
};

export default Dashboard;
