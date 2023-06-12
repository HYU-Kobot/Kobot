import MainCard from "../../ui-component/cards/MainCard";

import { ResponsiveLine } from '@nivo/line'

import * as React from 'react';



const ProfitChartCard = () => {

    return(
        <MainCard title={"수익률 그래프"} >
            <div style={{height:'33vh'}}>

            <ResponsiveLine
                margin={{top: 20, right: 30, bottom: 23, left: 30} }
                data={[
                    {
                        id: 'fake corp. B',
                        data: [
                            { x: '2018-01', y: 14 },
                            { x: '2018-02', y: 14 },
                            { x: '2018-03', y: 15 },
                            { x: '2018-04', y: 11 },
                            { x: '2018-06', y: 10 },
                            { x: '2018-08', y: 12 },
                            { x: '2018-10', y: 9 },
                            { x: '2018-11', y: 7 },
                        ],
                    },
                ]}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
            />
            </div>
        </MainCard>
    )
}

export default ProfitChartCard;