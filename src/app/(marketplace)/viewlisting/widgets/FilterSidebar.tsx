import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FilterState } from '../../../../infrastructure/marketplace/dto/listed.livestock';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableTypes: string[];
  availableBreeds: string[];
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  availableTypes,
  availableBreeds,
  className
}) => {
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      type: '',
      breed: '',
      status: '',
      searchQuery: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{activeFiltersCount} active</Badge>
            <button
              onClick={clearFilters}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6 w-full">
        <div>
          <Label htmlFor="search" className="text-sm font-medium mb-2 block">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search by name or tag..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className='w-full rounded'
          />
        </div>

        <div className='w-full'>
          <Label className="text-sm font-medium mb-2 block">Animal Type</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange('type', value === "all" ? "" : value)}
          >
            <SelectTrigger className='w-full rounded'>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {availableTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Breed</Label>
          <Select
            value={filters.breed}
            onValueChange={(value) => handleFilterChange('breed', value === "all" ? "" : value)}
          >
            <SelectTrigger className='w-full rounded'>
              <SelectValue placeholder="All breeds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All breeds</SelectItem>
              {availableBreeds.map((breed) => (
                <SelectItem key={breed} value={breed}>
                  {breed}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value === "all" ? "" : value)}
          >
            <SelectTrigger className='w-full rounded'>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
              <SelectItem value="Reserved">Reserved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};