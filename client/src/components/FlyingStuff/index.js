import React, { useEffect, useState, useRef } from 'react';
import { random } from 'lodash';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import * as styles from './styles';

const FlyingStuff = ({stuffArr = []} = {}) => {
    const animTime = 5000;

    // const delay = (animTime * index) + random(-100, 200);
    // const upDown = random(80, 400);

    return (
    <styles.FlyingStuffStyle>
        { stuffArr?.map((stuff, index) => {
            const [key, thing] = stuff;
            const delay = (animTime * index) + 50;
            const upDown = 50;
            return (
                <styles.ThingStyle delay={delay} upDown={upDown} key={index}>
                    <div>{thing}</div>
                </styles.ThingStyle>
            )
        })}
    </styles.FlyingStuffStyle>
    );
};

export default FlyingStuff;
