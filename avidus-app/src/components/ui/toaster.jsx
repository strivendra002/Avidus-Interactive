import { Toaster } from "@chakra-ui/react";
import { toaster } from "./toasterStore";

const AppToaster = () => {
  return <Toaster toaster={toaster} />;
};

export default AppToaster;
