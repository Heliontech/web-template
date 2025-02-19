import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { userSearchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import UserTable from './user-tables';
import { Heading } from '@/components/ui/heading';

type TUserListingPage = {};

export default async function ListingPage({}: TUserListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = userSearchParamsCache.get('page');
  const search = userSearchParamsCache.get('q');
  // const status = userSearchParamsCache.get('status');
  const pageLimit = userSearchParamsCache.get('limit');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search })
    // ...(status && { status })
  };

  // mock api call
  // const data = await fakeUsers.getUsers(filters);
  // const totalUsers = data.total_users;
  // const user: NormalUser[] = data.users;
  // const { data, isLoading, error } = useUsers(filters);

  // if (error) return <div>Failed to load users</div>;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Users" description="" />
          <Link
            href={'/users/new'}
            className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
          >
            <Plus className="size-4" /> Add New
          </Link>
        </div>
        <Separator />
        {/* <UserTable
          data={data.data.records}
          totalData={data.data.total}
          isLoading={isLoading}
        /> */}
        <UserTable filters={filters} />
      </div>
    </PageContainer>
  );
}
