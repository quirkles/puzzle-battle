'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useOauthContext } from '../services';

export default function Page() {
  const { oauthService } = useOauthContext();
  useEffect(() => {
    if (oauthService.isAuthorized()) {
      redirect('./home');
    } else {
      redirect('./login');
    }
  });
}
