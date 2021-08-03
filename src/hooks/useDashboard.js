import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { dashboardAtom } from '../atoms';

export const useDashboard = () => {
  const [myLeads, setMyLeads] = useAtom(dashboardAtom.myLeads);

  useEffect(() => {
    return () => {}
    //eslint-disable-next-line
  }, []);

  return {

  }
}