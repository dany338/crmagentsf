import React from 'react'
import pageStyles from './styles/searchLeadsStyles';
import pageStylesc from './styles/confirmStyles';
import { Box, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core'
import { useDashboard } from '../hooks/useDashboard';
import SearchIcon from '../assets/leads/search.svg';
import CloseIcon from '../assets/leads/close.svg';
import ArrowUpIcon from '../assets/leads/chevron-down.svg';
import UserIcon from '../assets/images/1.webp';
import { utilsAtom } from '../atoms';
import { useAtom } from 'jotai';

const SearchLeads = ({ className = '' }) => {
  const styles = pageStyles();
  const stylesc = pageStylesc();
  const [focused, setFocused] = React.useState(false);
  const {
    leads,
    query,
    onChangeQuery,
    onSelectLead,
    leadsSelecteds,
    message,
    isvisible,
    onChangeIsVisible
  } = useDashboard();

  const returnHeight = () => {
    return {minHeight: 0}
  }

  const renderLeads = () => leads.map(({ id, firstname, lastname, idcard }) => <Box
    className={[styles.contTeam, leadsSelecteds.some(item => item.id === id) ? styles.selected : ''].join(' ')}
    key={`item-lead-${id}`}
    onClick={() => onSelectLead({ id, firstname, lastname, idcard })}
  >
    <Box
      className={styles.contImgTeam}
      style={{backgroundImage: `url("${require('../assets/images/1.webp')}")`}}
    />
    <p className={[styles.nameTeam, leadsSelecteds.some(item => item.id === id) ? styles.white : ''].join(' ')}>
      {`${firstname} ${lastname} c.c. ${idcard}`}
    </p>
  </Box>)

  const renderSearchEmpty = () => <Box className={styles.contEmpty} style={returnHeight()}>
    <span className={styles.emojiEmpty} role='img' aria-label='emoji'>🔎</span>
    <p className={styles.titleEmpty}>Oh no!</p>
    <p className={styles.labelEmpty}>We could’nt find that lead, try searching something else</p>
  </Box>

  const renderMessage = () => isvisible ? <Box className={stylesc.container}>
  <Box className={stylesc.contConfirm}>
    <img
      alt='close'
      src={require('../assets/icons/close.svg')}
      onClick={() => onChangeIsVisible()}
      className={stylesc.iconClose}
    />
    <span
      role='img'
      aria-label='emoji'
      className={stylesc.emoji}
    >
      {message?.icon || '🤔'}
    </span>
    <p className={stylesc.title}>
      {message?.title}
    </p>
    <p className={stylesc.text}>
      {message?.text}
    </p>
    <Box className={stylesc.rowButtons}>
      <Box
        className={stylesc.btAccept}
        onClick={() => onChangeIsVisible()}
      >
        {'Accept'}
      </Box>
    </Box>
  </Box>
</Box> : null

  return <Box className={[styles.contSearch, className].join(' ')}>
    <Box className={styles.contInput}>
      <input
        value={query}
        placeholder='Can’t find your leads? Search it here!'
        onChange={e => { onChangeQuery(e.target.value) }}
        className={[styles.input, focused ? styles.border :  ''].join(' ')}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <img 
        src={query !== '' ? CloseIcon : SearchIcon}
        alt='Icon Back'
        className={styles.searchIcon}
        onClick={() => query !== '' && onChangeQuery('')}
      />
    </Box>
    <p className={styles.sublabel}>
      {query !== '' ? `${leads.length} Results for "${query}"` : `YOU CAN PICK ${leads.length ?? 0} ANY LEAD FOR GET SCORE.`}
    </p>
    {leads.length > 0 && (
      <Box>
        {renderLeads()}
      </Box>
    )}
    {(leads.length === 0 && query !== '') && (
      <Box>
        {renderSearchEmpty()}
      </Box>
    )}
    {Object.keys(message).length > 0 && (
      <Box>
        {renderMessage()}
      </Box>
    )}
  </Box>
};

export default SearchLeads