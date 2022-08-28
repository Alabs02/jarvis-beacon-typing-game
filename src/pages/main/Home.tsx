import React, { Fragment } from 'react';
import { NextPage } from 'next';

// COMPONENTS
import { AppBar } from '@/components/navigation';
import { StartChallenge } from '@/components/core';

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <AppBar />

      <main className="pdx-20 pdx-lg-40 pdy-40">
        <StartChallenge />
      </main>
    </Fragment>
  );
};

export default HomePage;
