import { makeStyles } from '@material-ui/styles';
import Commons from '../../../utils/styles';
import { colors } from '../../../styleguide';

const styles = makeStyles({
  container: {
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100%',
    width: 'calc(100% - 32px)',
    padding: '0px 16px'
  },
});

export default styles;