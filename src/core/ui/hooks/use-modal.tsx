import { useState } from "react";

function useModal(open: boolean = false) {
  const [isOpen, setOpen] = useState(open);
  const toogle = () => setOpen(!isOpen);
  return { isOpen, toogle };
}
export default useModal;
