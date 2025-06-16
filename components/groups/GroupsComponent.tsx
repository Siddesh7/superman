import React, { useState } from "react";
import { Button } from "../ui/button";
import { Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Group } from "@/types/groups";
import { useProfile } from "@/context/ProfileContext";
import { GroupCard } from "./GroupCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGroups } from "@/lib/hooks/useGroups";

const GroupsComponent = () => {
  const { setShowCreateGroupModal } = useProfile();
  const { data: groups = [], isLoading, error } = useGroups();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter groups based on search and status
  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.purchase_item.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || group.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Separate active and expired groups
  const activeGroups = filteredGroups.filter(
    (group) => group.status !== "expired"
  );
  const expiredGroups = filteredGroups.filter(
    (group) => group.status === "expired"
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading groups...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-gray-600">
            Failed to load groups. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold ">Groups</h1>
            <p className=" mt-1">
              Join group purchases to get better prices on products you want
            </p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
            size="lg"
            onClick={() => setShowCreateGroupModal(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Group
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-transparent p-4 rounded-lg shadow-sm border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search groups or items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] border-gray-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="funded">Funded</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="flex h-[50px] w-fit grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger
                value="active"
                className="px-6 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
              >
                Active Groups
                <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                  {activeGroups.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="expired"
                className="px-6 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
              >
                Expired Groups
                <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {expiredGroups.length}
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active" className="mt-0">
            {renderGroupGrid(
              activeGroups,
              "No active groups found matching your criteria"
            )}
          </TabsContent>

          <TabsContent value="expired" className="mt-0">
            {renderGroupGrid(
              expiredGroups,
              "No expired groups found matching your criteria"
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const renderGroupGrid = (groups: Group[], emptyMessage: string) => {
  if (groups.length === 0) {
    return (
      <div className="text-center py-16 rounded-lg border-2 border-dashed border-gray-200">
        <div className="text-gray-400 text-4xl mb-4">📦</div>
        <p className="text-gray-500 dark:text-gray-200 text-lg">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupsComponent;
