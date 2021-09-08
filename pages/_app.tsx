import React from 'react';
import { AppProps } from 'next/app';
import { SWRConfig, SWRConfiguration } from 'swr';
import axios from 'axios';
import { RecoilRoot } from 'recoil';
import 'ress';
import '../styles/style.css';
import { environment } from '../config/environment';
import { Dialog } from "../components/dialog";
import { Toast } from "../components/toast";
import dynamic from 'next/dynamic';

const swrConfig: SWRConfiguration = {
  fetcher: args => axios.get(environment.baseUrl + args).then(res => res.data),
  revalidateOnFocus: false,
};

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const CSRComponent = dynamic(() => import('../components/csr-component'), { ssr: false });

  return (
    <>
      <CSRComponent>
        <RecoilRoot>
          <SWRConfig value={swrConfig}>
            <Component {...pageProps} />
            <Dialog />
            <Toast />
          </SWRConfig>
        </RecoilRoot>
      </CSRComponent>
    </>
  );
}
