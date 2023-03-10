import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <Typography variant={'h2'} align={'center'}>
            KOBOT
        </Typography>
        {/*<Logo />*/}
    </ButtonBase>
);

export default LogoSection;
