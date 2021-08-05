import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { dashboardAtom } from '../atoms';
import { SCORE } from '../constants/backend';
import {
  search,
  validation
} from '../services/leads';

const objAnswers = {
  0: { title: 'Oh no, Not approved', text: 'The lead not approved for credit because this lead him had a lot judicials', icon: '🤔' },
  1: { title: 'Oh no, Not approved', text: 'The lead not approved for credit because this score is below the minimum score of 60 points', icon: '😢' },
  2: { title: 'Yes, Approved', text: 'The lead approved for credit because this score is above of 60 points', icon: '💯' }
}

export const useDashboard = () => {
  const [leads, setLeads] = useAtom(dashboardAtom.leads);
  const [query, setQuery] = useAtom(dashboardAtom.query);
  const [leadsSelecteds, setLeadsSelecteds] = useAtom(dashboardAtom.leadsSelecteds);
  const [message, setMessage] = useAtom(dashboardAtom.message);
  const [isvisible, setIsvisible] = useAtom(dashboardAtom.isvisible);

  const onChangeIsVisible = (isVisible) => {
    setIsvisible(!isvisible);
  };

  const onChangeQuery = async value => {
    setQuery(value);
    setIsvisible(false);
    if(value.trim() === '') {
      setLeads([]);
      setMessage({});
    } else {
      let response = await search({
        firstname: value,
        lastname: value,
        idcard: value 
      });

      if(response && response?.payload?.data && response.payload.data.length > 0) {
        setLeads(response.payload.data);
      }
    }
  };

  const onSelectLead = async lead => {
    const isLead = leadsSelecteds.some(item => item.id === lead.id);
    let newLeadsSelecteds = [];
    if(isLead) {
      newLeadsSelecteds = leadsSelecteds.filter(item => item.id !== lead.id);
    } else {
      newLeadsSelecteds = [ ...leadsSelecteds, lead];
    }
    setLeadsSelecteds(newLeadsSelecteds);

    let response = await validation(lead.id);

    if(response && response?.payload?.data) {
      let description = '';
      if(response.payload.data.judicials.length > 0) {
        description = objAnswers[0];
      } else if(response.payload.data.judicials.length === 0 && response.payload.data.score < SCORE) {
        description = objAnswers[1];
      } else if(response.payload.data.judicials.length === 0 && response.payload.data.score >= SCORE) {
        description = objAnswers[2];
      } 

      const msg = { ...response.payload.data, ...description };
      setMessage(msg);
      if(isLead) {
        setIsvisible(false);
      } else {
        setIsvisible(true);
      }
    }
  };

  useEffect(() => {
    return () => {}
    //eslint-disable-next-line
  }, []);

  return {
    leads,
    query,
    onChangeQuery,
    onSelectLead,
    leadsSelecteds,
    message,
    isvisible,
    onChangeIsVisible
  }
}