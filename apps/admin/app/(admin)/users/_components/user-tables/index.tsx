'use client';

import { useUsers } from '@/hooks/use-users';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { User } from '@/lib/typings';
import { columns } from './columns';
import { STATUS_OPTIONS, useUserTableFilters } from './use-user-table-filters';
import Loading from '@/components/common/Loading';

type TableProps = {
  filters: {
    page?: number;
    limit?: number;
    search?: string;
  };
};

export default function UserTable({ filters }: TableProps) {
  const { data, isLoading, error } = useUsers(filters);

  const {
    statusFilter,
    setStatusFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useUserTableFilters();

  if (isLoading) return <Loading />;
  if (error) return <div>Failed to load users</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="status"
          title="Status"
          options={STATUS_OPTIONS}
          setFilterValue={setStatusFilter}
          filterValue={statusFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable
        columns={columns}
        data={data.data.records}
        totalItems={data.data.total}
        isLoading={isLoading}
      />
    </div>
  );
}
