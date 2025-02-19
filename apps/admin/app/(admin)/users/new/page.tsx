import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import UserForm from '../_components/user-form';

export const metadata = {
  title: 'Users : Create User'
};

export default function Page() {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <UserForm />
        </Suspense>
      </div>
    </PageContainer>
  );
}
