// assets
import { IconChartInfographic } from '@tabler/icons';

// constant
const icons = { IconChartInfographic };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const backtest = {
    id: 'backtest',
    title: 'Backtest',
    type: 'group',
    children: [
        {
            id: 'backtest',
            title: 'Back Test',
            type: 'item',
            url: '/back-test',
            icon: icons.IconChartInfographic,
            breadcrumbs: false,
            modal: false
        }
    ]
};

export default backtest;
