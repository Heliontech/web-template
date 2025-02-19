'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '@/lib/typings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
// import { User, RolesOnUsers } from '@pt/db';

interface CellActionProps {
  data: User; // Partial<User> & { roles: RolesOnUsers[] };
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['users', data.id],
    mutationFn: async () => {
      const response = await fetch(`/api/users/${data.id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete user');
      return response.json();
    },
    onMutate: async () => {
      // Cancel any ongoing re-fetch
      await queryClient.cancelQueries({ queryKey: ['users'] });

      // Get all queries matching ['users', *]
      const queryCache = queryClient.getQueryCache();
      const userQueries = queryCache.findAll({
        queryKey: ['users'],
        // exact: false allows matching all queries starting with ['users'].
        exact: false
      });
      const snapshots = new Map();

      // Optimistically update each query
      userQueries.forEach((query) => {
        const previousData = queryClient.getQueryData(query.queryKey);
        snapshots.set(query.queryKey, previousData);

        queryClient.setQueryData(query.queryKey, (old: any) => {
          if (!old?.items) return old;

          // Ensure old and items exist before filtering
          return {
            ...old,
            items: old.items.filter((user: any) => user.id !== data.id),
            total: (old.total || 0) - 1
          };
        });
      });

      return { snapshots };
    },
    onError: (error, variables, context) => {
      // Restore all queries' data when an error occurs
      context?.snapshots.forEach((data, queryKey) => {
        queryClient.setQueryData(queryKey, data);
      });
      toast.error(error.message || 'Failed to delete user');
    },
    onSuccess: () => {
      toast.success('User deleted successfully');
      setOpen(false);
    },
    onSettled: () => {
      // Invalidate all users-related queries
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
    }
  });

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => mutate()}
        loading={isPending}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => router.push(`/users/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
