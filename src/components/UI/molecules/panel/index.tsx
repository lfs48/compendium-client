import React, {useState, useEffect, ReactNode, useCallback} from 'react';
import { merge, throttle } from 'lodash';
import { closePanel } from '@/reducers/UI/panels.reducer';
import { useDispatch } from 'react-redux';
import * as S from './styled';
import Resize from '@atoms/resize';
import { useMousePos } from '@/hooks/useMouse.hook';
import { Entity } from '@/enums';

const handleDragStart = ({event, x, y, styleData, setStyleData, dragging, setDragging}) => {
    event.preventDefault();
    if (!dragging) {
        const newState = merge({}, styleData);
        newState.dragPrevX = x;
        newState.dragPrevY = y;
        setDragging(true);
        setStyleData(newState);
        document.body.className = 'cursor-move';
    }

    function _handleDragEnd() {
        setDragging(false);
        document.body.className = ''
        document.removeEventListener('mouseup', _handleDragEnd);
    };

    document.addEventListener('mouseup', _handleDragEnd);
};

const _handleDrag = ({x, y, styleData, setStyleData, dragging}) => {
    const newState = merge({}, styleData);
    if (dragging) {
        if (x > 0) {
            newState.left += x - styleData.dragPrevX;
            newState.left = Math.max(newState.left, 0);
            newState.left = Math.min(newState.left, window.innerWidth - newState.width);
            newState.dragPrevX = x;
        }
        if (y > 0) {
            newState.top += y - styleData.dragPrevY;
            newState.top = Math.min(newState.top, window.innerHeight - styleData.height);
            newState.top = Math.max(newState.top, 0);
            newState.dragPrevY = y;
        }
        setStyleData(newState);
    }
};

const handleDrag = throttle(_handleDrag, 10);

interface PanelProps {
    entity: {
        id: string;
        name: string;
        [other: string]: unknown;
    };
    title: string;
    children: ReactNode;
    [prop: string]: any;
}

const Panel = React.memo( function({
    entity,
    title,
    children,
    ...props
}:PanelProps) {

    const dispatch = useDispatch();

    const mousePos = useMousePos();

    const [dragging, setDragging] = useState(false);
    const [transitioning, setTransitioning] = useState(true);
    const [minimized, setMinized] = useState(false);
    const [stage, setStage] = useState(0);

    const [styleData, setStyleData] = useState({
        left: Math.random() * (window.innerWidth - 400),
        top: Math.random() * (window.innerHeight - 464 ),
        width: 400,
        height: 400,
        minHeight: 90,
        minWidth: 200,
        dragPrevX: 0,
        dragPrevY: 0
    });

    const [prevDims, setPrevDrims] = useState({
        width: 400,
        height: 400
    })

    const handleMinimize = useCallback( () => {
        setMinized(true);
        setPrevDrims({
            width: styleData.width,
            height: styleData.height
        });
        const newState = merge({}, styleData);
        newState.width = 200;
        newState.height = 48;
        newState.minHeight = 48;
        setStyleData(newState);
        setTransitioning(true);
        setTimeout( () => {
            setTransitioning(false);
        }, 200);
    }, [styleData])

    const handleUnminimize = useCallback( () => {
        setMinized(false);
        const newState = merge({}, styleData);
        newState.width = prevDims.width;
        newState.height = prevDims.height;
        newState.minHeight = 90;
        setStyleData(newState);
        setTransitioning(true);
        setTimeout( () => {
            setTransitioning(false);
        }, 200);
    }, [styleData])

    useEffect(() => {
        setTimeout( () => {
            setStage(1);
        }, 50);
        setTimeout( () => {
            setStage(2);
            setTransitioning(false);
        }, 550);
    }, []);

    useEffect( () => {
        if (dragging) {
            handleDrag({
                styleData: styleData,
                setStyleData: setStyleData,
                dragging: dragging,
                ...mousePos
            })
        }
    }, [dragging, mousePos])

    const handleClose = useCallback( () => {
        setTimeout( () => {
            setStage(0);
            setTransitioning(true);
        }, 0);
        setTimeout( () => {
            const action = {
                type: closePanel.type,
                payload: {
                    id: entity.id
                }
            };
            dispatch(action);
        }, 450);
    }, [entity, styleData]);

    return(
        <S.Root
            $stage={stage}
            style={styleData}
            $minimized={minimized}
            $transitioning={transitioning}
            {...props}
        >

            <S.Header
                onMouseDown={e => handleDragStart({
                    event: e,
                    styleData: styleData,
                    setStyleData: setStyleData,
                    dragging: dragging,
                    setDragging: setDragging,
                    ...mousePos
                })}
                onDoubleClick={minimized ? handleUnminimize : handleMinimize}
            >
                <S.HeaderContent>
                    {title}
                </S.HeaderContent>
                <S.Close 
                    onMouseDown={handleClose}
                />
            </S.Header>
            {!minimized &&
                <>
                <S.Content>
                    {children}
                </S.Content>
                <Resize styleData={styleData} setStyleData={setStyleData}/>
                </>
            }

        </S.Root>
    );

})

export default Panel;