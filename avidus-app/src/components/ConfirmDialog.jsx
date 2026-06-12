import { Button, Dialog, Text } from "@chakra-ui/react";

const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  isLoading,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) {
          onCancel();
        }
      }}
      placement="center"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Text color="gray.600">{description}</Text>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button colorPalette="red" loading={isLoading} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default ConfirmDialog;
