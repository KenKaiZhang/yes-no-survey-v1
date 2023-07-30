import React, { useState } from "react";

const useToggle = (start: boolean = false) => {
  const [isOpen, toggleOpen] = useState(start);

  const toggler = () => {
    toggleOpen(!isOpen);
  };
  return [isOpen, toggler];
};

export default useToggle;
