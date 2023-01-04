import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { ButtonBase, Link, Tooltip } from '@mui/material';

// project imports
import Avatar from '../extended/Avatar';

// ==============================|| CARD SECONDARY ACTION ||============================== //

const CardSecondaryAction = ({ title, link, icon }) => {
    const theme = useTheme();

    return (
        <Tooltip title={title || 'Add Bot'} placement="left">
            <ButtonBase disableRipple>
                {!icon && (
                    <Avatar component={ButtonBase} target="_blank" alt="MUI Logo" size="badge" color="primary" outline>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="44"
                             height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none"
                             stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </Avatar>
                )}
                {icon && (
                    <Avatar component={Link} href={link} target="_blank" size="badge" color="primary" outline>
                        {icon}
                    </Avatar>
                )}
            </ButtonBase>
        </Tooltip>
    );
};

CardSecondaryAction.propTypes = {
    icon: PropTypes.node,
    link: PropTypes.string,
    title: PropTypes.string
};

export default CardSecondaryAction;
