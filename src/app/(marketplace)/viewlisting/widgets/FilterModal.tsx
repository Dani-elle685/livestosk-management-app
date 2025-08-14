import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FilterState } from '../../../../infrastructure/marketplace/dto/listed.livestock';
import { FilterSidebar } from './FilterSidebar';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableTypes: string[];
  availableBreeds: string[];
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  availableTypes,
  availableBreeds
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Filter Livestock</DialogTitle>
        </DialogHeader>
        <FilterSidebar
          filters={filters}
          onFilterChange={onFilterChange}
          availableTypes={availableTypes}
          availableBreeds={availableBreeds}
          className="p-0"
        />
      </DialogContent>
    </Dialog>
  );
};