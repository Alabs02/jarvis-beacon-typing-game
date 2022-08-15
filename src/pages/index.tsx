import React from 'react';
import { NextPage } from 'next';

// PAGES
import { HomePage } from '@/pages/main';

const Home: NextPage = () => {
  return <HomePage />;
}

export { Home as default };