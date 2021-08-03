import React from 'react'
import pageStyles from './styles/searchTeamsStyles'
import { Box, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core'

import SearchIcon from '../assets/images/leads/search.svg';
import CloseIcon from '../assets/images/leads/close.svg';
import ArrowUpIcon from '../assets/images/leads/chevron-down.svg';
import { utilsAtom } from '../atoms';
import { useAtom } from 'jotai';
const Search = ({ className = '' }) => {

  const styles = pageStyles();

  return <Box className={[styles.contSearch, className].join(' ')}>
    search...
  </Box>
};

export default Search