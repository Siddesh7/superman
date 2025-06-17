import { Group } from "@/types/groups";
import { ActiveTabTypes } from "@/types/profile";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type GlobalContextType = {
  activeTab: ActiveTabTypes;
  setActiveTab: (tab: ActiveTabTypes) => void;
  showCreateGroupModal: boolean;
  setShowCreateGroupModal: (show: boolean) => void;
  showJoinGroupModal: boolean;
  setShowJoinGroupModal: (show: boolean) => void;
  selectedGroup: Group | null;
  setSelectedGroup: (group: Group | null) => void;
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<ActiveTabTypes>("dashboard");

  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const value = {
    activeTab,
    setActiveTab,
    showCreateGroupModal,
    setShowCreateGroupModal,
    showJoinGroupModal,
    setShowJoinGroupModal,
    selectedGroup,
    setSelectedGroup,
    walletAddress,
    setWalletAddress,
  };

  useEffect(() => {
    const initAgent = async () => {
      try {
        const res = await fetch("/api/agent");
        const data = await res.json();
        console.log("Agent initialized:", data);
      } catch (err) {
        console.error("Failed to initialize agent:", err);
      }
    };

    initAgent();
  }, []);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
