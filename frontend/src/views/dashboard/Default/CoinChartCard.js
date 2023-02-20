import MainCard from 'ui-component/cards/MainCard';


import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

const CoinChartCard = () => {
    const onLoadScriptRef = useRef();

    useEffect(
        () => {
            onLoadScriptRef.current = createWidget;

            if (!tvScriptLoadingPromise) {
                tvScriptLoadingPromise = new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.id = 'tradingview-widget-loading-script';
                    script.src = 'https://s3.tradingview.com/tv.js';
                    script.type = 'text/javascript';
                    script.onload = resolve;

                    document.head.appendChild(script);
                });
            }

            tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

            return () => onLoadScriptRef.current = null;

            function createWidget() {
                if (document.getElementById('tradingview_7ff00') && 'TradingView' in window) {
                    new window.TradingView.widget({
                        width: "100%",
                        height: 750,
                        symbol: "UPBIT:BTCKRW",
                        interval: "D",
                        timezone: "Etc/UTC",
                        theme: "light",
                        style: "1",
                        locale: "en",
                        toolbar_bg: "#f1f3f6",
                        enable_publishing: false,
                        container_id: "tradingview_7ff00"
                    });
                }
            }
        },
        []
    );


    return(
        <MainCard>
            <div className='tradingview-widget-container'>
                <div id='tradingview_7ff00' />
                <div className="tradingview-widget-copyright">
                    <a href="https://www.tradingview.com/symbols/BTCKRW/?exchange=UPBIT" rel="noopener" target="_blank"><span className="blue-text">BTCKRW chart</span></a> by TradingView
                </div>
            </div>
        </MainCard>
    )
}

export default CoinChartCard;