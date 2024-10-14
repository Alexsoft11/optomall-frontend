import PageLayout from '@/components/Layout/PageLayout';
import { LoadingSpinner } from '@/ui/Spin';
import useQueryApiClient from '@/utils/useQueryApiClient';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react'

const AdditionalCategory = dynamic(() => import("@/components/AdditionalCategory"), {
  loading: () => <LoadingSpinner fullscreen={true} size="large" />,
});


const HotCategory = () => {
  const { query, locale } = useRouter()

  const { data: additionalCategory, isLoading } =
    useQueryApiClient({
      request: {
        url: `get-one-additional-category?category_id=${query.id}&limit=40&lang=${locale}`,
        method: "GET",
        disableOnMount: !query.id,
      },
      enabled: !!query.id
    });

  return (
    <PageLayout >
      <div className='container'>
        {isLoading && <LoadingSpinner fullscreen />}
        <AdditionalCategory categories={additionalCategory.category} />
      </div>
    </PageLayout>

  )
}

export default HotCategory