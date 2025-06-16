"use client";

import { ActiveTabTypes } from "@/types/profile";
import { Group } from "@/types/groups";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProfileContextType {
  activeTab: ActiveTabTypes;
  setActiveTab: (tab: ActiveTabTypes) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  showCreateGroupModal: boolean;
  setShowCreateGroupModal: (show: boolean) => void;
  showJoinGroupModal: boolean;
  setShowJoinGroupModal: (show: boolean) => void;
  selectedGroup: Group | null;
  setSelectedGroup: (group: Group | null) => void;
  copySuccess: string;
  setCopySuccess: (success: string) => void;
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
  handleJoinGroup: (e: React.FormEvent) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTabTypes>("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [copySuccess, setCopySuccess] = useState("");

  const handleJoinGroup = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the logic to join a group
    setShowJoinGroupModal(false);
  };

  const value = {
    activeTab,
    setActiveTab,
    showNotifications,
    setShowNotifications,
    showCreateGroupModal,
    setShowCreateGroupModal,
    showJoinGroupModal,
    setShowJoinGroupModal,
    selectedGroup,
    setSelectedGroup,
    copySuccess,
    setCopySuccess,
    walletAddress,
    setWalletAddress,
    handleJoinGroup,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
