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
  // groupName: string;
  // setGroupName: (name: string) => void;
  // targetAmount: string;
  // setTargetAmount: (amount: string) => void;
  // maxMembers: string;
  // setMaxMembers: (members: string) => void;
  // copyToClipboard: (text: string) => void;
  // handleCreateGroup: (e: React.FormEvent) => void;
  handleJoinGroup: (e: React.FormEvent) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<ActiveTabTypes>("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [copySuccess, setCopySuccess] = useState("");

  // const handleCreateGroup = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Here would be the logic to create a group
  //   setShowCreateGroupModal(false);
  // };

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
    // handleCreateGroup,
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
