"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { FilterState, LivestockList } from "../../../infrastructure/marketplace/dto/listed.livestock";
import { LivestockCard } from "./widgets/LivestockCard";
import { FilterModal } from "./widgets/FilterModal";
import { FilterSidebar } from "./widgets/FilterSidebar";

interface Props{
  listedAnmals: LivestockList[]
}

export const LivestockListPage: React.FC<Props> = ({listedAnmals}) => {
  const [filters, setFilters] = useState<FilterState>({
    type: "",
    breed: "",
    status: "",
    searchQuery: "",
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

 // ✅ Available Types
  const availableTypes = useMemo(() => {
    return Array.from(new Set(listedAnmals.map((item) => item.type))).sort();
  }, [listedAnmals]);

  // ✅ Available Breeds filtered by selected type
  const availableBreeds = useMemo(() => {
    if (!filters.type) return [];
    return Array.from(
      new Set(
        listedAnmals
          .filter((item) => item.type === filters.type)
          .map((item) => item.breed)
      )
    ).sort();
  }, [listedAnmals, filters.type]);

  // ✅ Apply filters
  const filteredLivestock = useMemo(() => {
    return listedAnmals.filter((item) => {
      const matchesType = !filters.type || item.type === filters.type;
      const matchesBreed = !filters.breed || item.breed === filters.breed;
      const matchesStatus = !filters.status || item.status === filters.status;
      const matchesSearch =
        !filters.searchQuery ||
        item.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        item.tagNumber
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        item.breed.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return matchesType && matchesBreed && matchesStatus && matchesSearch;
    });
  }, [filters, listedAnmals]);

  return (
    <div className="min-h-screen bg-[#faf7f7]">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Livestock Marketplace
              </h1>
              <p className="text-gray-600 mt-1">
                Find quality livestock for your farm
              </p>
            </div>

            {/* Mobile filter button */}
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-8 w-full">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                availableTypes={availableTypes}
                availableBreeds={availableBreeds}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredLivestock.length} of {listedAnmals.length}{" "}
                animals
              </p>
            </div>

            {/* Livestock Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLivestock.map((livestock) => (
                <LivestockCard key={livestock.recordId} livestock={livestock} />
              ))}
            </div>

            {filteredLivestock.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No livestock found matching your criteria
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() =>
                    setFilters({
                      type: "",
                      breed: "",
                      status: "",
                      searchQuery: "",
                    })
                  }
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        availableTypes={availableTypes}
        availableBreeds={availableBreeds}
      />
    </div>
  );
};
