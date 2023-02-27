
import {Box, Button, Modal, Typography} from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";

import * as React from 'react';
// 한정윤 import axios
import axios from "axios";


const BackTestParameterCard = () => {

    // 한정윤 clicked method
    const clicked = () => {
        axios
            .get('http://127.0.0.1:8000/backtest/', {
                params: {
                    abc: 'django backtest 실행'
                }
            })
            .then((response) => setText(JSON.stringify(response.data)));
    };

    return (
        <div>
            <MainCard title="백테스트">
                <input />
                <Typography variant="body2">
                    Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa.
                    Ut enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube
                    grue dolor in reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non
                    president, sunk in culpa qui officiate descent molls anim id est labours.
                </Typography>
                {/* 한정윤 임의의 버튼 생성 */}
                <Button onClick={clicked}>Button</Button>
            </MainCard>
        </div>
    );
}

export default BackTestParameterCard;