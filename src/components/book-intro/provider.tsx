"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { BookIntroModal } from "./modal";

type BookIntroContext = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const Ctx = createContext<BookIntroContext | null>(null);

export function BookIntroProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <BookIntroModal open={isOpen} onClose={close} />
    </Ctx.Provider>
  );
}

export function useBookIntro() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useBookIntro must be used inside <BookIntroProvider>");
  }
  return ctx;
}
