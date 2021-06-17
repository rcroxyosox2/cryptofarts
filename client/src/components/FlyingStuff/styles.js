import styled, { keyframes } from 'styled-components';
import { random } from 'lodash';

const upDown = (y) => {
    return keyframes`
        to { 
            transform: translateY(${y}%);
        }
    `;
};

const translate = keyframes`
    0% {
        transform: translateX(-100%);
    }
    100% { 
        transform: translateX(1000%);
    }
`;

export const ThingStyle = styled.div`
    position: absolute;
    width: 10%;
    transform: translateX(-100%);
    animation: ${translate} 5s 1 linear ${(props) => `${props.delay}ms`};
    > div {
        position: absolute;
        animation: ${(props) => {
            return upDown(props.upDown);
        }} 2s alternate infinite ease-in-out;
    }
`;

export const FlyingStuffStyle = styled.div.attrs({ className: 'FlyingStuffStyle' })`
    height: 100%;
    position: absolute;
    width: 100%;
`;
