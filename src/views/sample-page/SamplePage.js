import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ProductPerformance from '../dashboard/components/ProductPerformance';


const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
    <ProductPerformance/>
    </PageContainer>
  );
};

export default SamplePage;
