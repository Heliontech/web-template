import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
// import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { NormalUser } from '@/constants/data';
import { fakeUsers } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import UserTable from './user-tables';

type TUserListingPage = {};

export default async function UserListingPage({}: TUserListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const gender = searchParamsCache.get('gender');
  const pageLimit = searchParamsCache.get('limit');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(gender && { genders: gender })
  };

  // mock api call
  const data = await fakeUsers.getUsers(filters);
  const totalUsers = data.total_users;
  const user: NormalUser[] = data.users;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-end">
          {/* <Heading
            title={`Users (${totalUsers})`}
            description="Manage users"
          /> */}

          <Link
            href={'/user/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <UserTable data={user} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
