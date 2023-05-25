import dashboard from './dashboard';
import authentication from './authentication';
import portfolio from './portfolio';
import backtest from './backtest';
import loggedInAuthentication from "./loggedInAuthentication";

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, portfolio, backtest, authentication, loggedInAuthentication]
};

export default menuItems;
