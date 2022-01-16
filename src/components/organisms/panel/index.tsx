import React, {useState, useEffect, ReactNode} from 'react';
import { merge, throttle } from 'lodash';
import { closePanel, selectPanel } from '@/reducers/UI/panels.reducer';
import { useDispatch } from 'react-redux';
import * as S from './styled';
import Resize from '@atoms/resize';
import { useMousePos } from '@/hooks/useMouse.hook';

const handleDragStart = ({event, x, y, styleData, setStyleData, id, dispatch, dragging, setDragging}) => {
    event.preventDefault();
    if (!dragging) {
        const newState = merge({}, styleData);
        newState.dragPrevX = x;
        newState.dragPrevY = y;
        setDragging(true);
        setStyleData(newState);
        document.body.className = 'cursor-move';
    }
    handleSelect({
        id: id,
        dispatch: dispatch
    });

    function _handleDragEnd() {
        setDragging(false);
        document.body.className = ''
        document.removeEventListener('mouseup', _handleDragEnd)
    };

    document.addEventListener('mouseup', _handleDragEnd)
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

const handleClose = ({styleData, setStyleData, dispatch, id}) => {
    const newState = merge({}, styleData);
    newState.stage = 1;
    newState.opacity = 0;
    newState.left -= 100;
    setStyleData(newState);
    setTimeout( () => {
        const action = {
            type: closePanel.type,
            payload: {
                id: id
            }
        };
        dispatch(action);
    }, 450);
};


const handleSelect = ({id, dispatch}) => {
    const action = {
        type: selectPanel.type,
        payload: {
            id: id
        }
    };
    dispatch(action);
}

interface PanelProps {
    data: {
        id: string;
        name: string;
        [other: string]: unknown;
    };
    children: ReactNode;
    [prop: string]: any;
}

const Panel = React.memo( function({
    data,
    children,
    ...props
}:PanelProps) {

    const dispatch = useDispatch();

    const mousePos = useMousePos();

    const [dragging, setDragging] = useState(false);

    const [styleData, setStyleData] = useState({
        left: Math.random() * (window.innerWidth - 800),
        top: Math.random() * (window.innerHeight - 600 ),
        width: 800,
        height: 600,
        minHeight: 50,
        minWidth: 200,
        dragPrevX: 0,
        dragPrevY: 0,
        stage: 0,
        opacity: 0,
    });

    useEffect(() => {
        const newState = merge({}, styleData);
        newState.left += 100;
        newState.stage = 1;
        newState.opacity = 1;
        setTimeout( () => {
            setStyleData(newState);
        }, 0);
        setTimeout( () => {
            const newerState = merge({}, newState);
            newerState.stage = 2;
            setStyleData(newerState);
        }, 720);
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

    return(
        <S.Root
            $stage={styleData.stage}
            style={styleData}
            onClick={(e) => handleSelect({
                id: data.id,
                dispatch: dispatch
            })}
            {...props}
        >

            <S.Header
                onMouseDown={e => handleDragStart({
                    event: e,
                    styleData: styleData,
                    setStyleData: setStyleData,
                    id: data.id,
                    dispatch: dispatch,
                    dragging: dragging,
                    setDragging: setDragging,
                    ...mousePos
                })}
            >
                <S.HeaderContent>
                    {data.name}
                </S.HeaderContent>
                <div>
                    <S.Close 
                        onClick={() => handleClose({
                            styleData: styleData,
                            setStyleData: setStyleData,
                            dispatch: dispatch,
                            id: data.id
                        })}
                    />
                </div>
            </S.Header>
            <S.Content>
                {children}
            </S.Content>
            <Resize styleData={styleData} setStyleData={setStyleData}/>

        </S.Root>
    );

})

export default Panel;