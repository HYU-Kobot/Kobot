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
            url: '/sample-page',
            icon: icons.IconChartInfographic,
            breadcrumbs: false
        }
    ]
};

export default backtest;
