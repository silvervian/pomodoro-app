import { useState } from "react";
import { SettingsProvider } from "../context/settings";
import { Labels } from "./Labels";
import { Modal } from "./Modal";
import { Timer } from "./Timer";

export const Pomodoro = () => {
  return (
    <SettingsProvider>
      <Labels />
      <Timer />
      <Modal />
    </SettingsProvider>
  );
};
