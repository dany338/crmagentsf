import React from 'react';
import Box from '@material-ui/core/Box';
import Layout from '../layout';
import pageStyles from './styles/dashboardStyles';
import { utilsAtom } from '../../atoms';
import { useAtom } from 'jotai';
import Search from '../../components/searchTeams';

const Dashboard = ({ history }) => {
  const view = history?.location?.state?.view || 1
  const styles = pageStyles();
  const [, setLoading] = useAtom(utilsAtom.loading);
  const [tabActive, setTabActive] = React.useState(view);

  const renderView = () => {
    if (tabActive === 1) {
      return <Search className={styles.animation } />
    }
  }

  React.useEffect(() => {
    setLoading({show: false, opacity: 0.7})
    return () => {}
    //eslint-disable-next-line
  }, []);

  return <Layout>
    <Box className={styles.container}>
      <Box className={styles.tabs}>
        <Box
          className={[styles.tab, tabActive === 1 ? styles.activeTab : ''].join(' ')}
          onClick={() => setTabActive(1)}
        >
          <span className={styles.lblTab}>
            ADDI LEADS
          </span>
          <Box className={styles.lineTab}/>
        </Box>
      </Box>
      <Box className={styles.contView} id='ref-scroll-courses'>
        {renderView()}
        <Box className={styles.blank} />
      </Box>
    </Box>
  </Layout>
}

export default Dashboard;