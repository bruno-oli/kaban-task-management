import React, {
  createContext,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

interface IContext {
  isOpen: boolean;
  refEditBoard: null | RefObject<HTMLDialogElement>;
  setIsOpen: (newState: boolean) => void;
}

const INITIAL_STATE: IContext = {
  isOpen: false,
  refEditBoard: null,
  setIsOpen: () => {},
};

export const EditBoardContext = createContext<IContext>(INITIAL_STATE);

const EditBoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(INITIAL_STATE.isOpen);
  const refEditBoard = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      refEditBoard.current?.showModal();
    } else {
      refEditBoard.current?.close();
    }
  }, [isOpen]);

  return (
    <EditBoardContext.Provider value={{ isOpen, setIsOpen, refEditBoard }}>
      {children}
    </EditBoardContext.Provider>
  );
};

export default EditBoardProvider;
