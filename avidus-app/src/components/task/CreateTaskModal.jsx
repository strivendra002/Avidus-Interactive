import {
  Button,
  Dialog,
  Input,
  NativeSelect,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
const emptyTask = {
  title: "",
  description: "",
  status: "Pending",
};

const CreateTaskModal = ({
  open,
  onClose,
  onOpenChange,
  onSubmit,
  task,
  isSaving,
}) => {
  const isEditing = Boolean(task);
  const [formData, setFormData] = useState(() =>
    task
      ? {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "Pending",
        }
      : emptyTask,
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} placement="center">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content as="form" onSubmit={handleSubmit}>
          <Dialog.Header>
            <Dialog.Title>{isEditing ? "Update Task" : "Create Task"}</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Stack gap={4} color="black">
              <Input
                name="title"
                placeholder="Task title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <Textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />

              <NativeSelect.Root>
                <NativeSelect.Field
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Stack>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorPalette="purple" type="submit" loading={isSaving}>
              Save
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default CreateTaskModal;
