import { useMousePos } from '@/hooks/useMouse.hook';
import { merge, throttle } from 'lodash'; 
import { useEffect, useState } from 'react';

function startResize(event, dirs, setDirs, resizing, setResizing) {
    event.preventDefault();

    if (!resizing) {
        setResizing(true);
        setDirs(dirs);
        document.body.className = dirsCursorClass(dirs);

        function _endResize() {
            setResizing(false);
            document.body.className = '';
            document.removeEventListener('mouseup', _endResize);
        }
    
        document.addEventListener('mouseup', _endResize);
    }
};

function _handleResize(dirs, styleData, setStyleData, {x,y}) {
    const newState = merge({}, styleData);
    if(x > 0 && x < window.innerWidth - 1) {
        if ("right" in dirs) {
            const newWidth = x - newState.left
            newState.width =  Math.max( newWidth, newState.minWidth );
        } else if ("left" in dirs) {
            const newWidth = newState.width + newState.left - x;
            newState.width = Math.max(newWidth, newState.minWidth);
            if (newState.width !== styleData.width) {newState.left = x; }
        }
    }

    if(y > 0 && y < window.innerHeight - 1) {
        if ("top" in dirs) {
            const newHeight = newState.height + newState.top - y;
            newState.height = Math.max(newHeight, newState.minHeight);
            if (newState.height !== styleData.height) {newState.top = y};
        } else if ("bottom" in dirs) {
            const newHeight = y - newState.top;
            newState.height = Math.max(newHeight, newState.minHeight);
        }
    }
    setStyleData(newState);
}

const handleResize = throttle(_handleResize, 10);

export default function Resize({styleData, setStyleData}) {

    const mousePos = useMousePos();

    const [resizing, setResizing] = useState(false);
    const [dirs, setDirs] = useState({
        top: false,
        left: false,
        right: false,
        bottom: false
    })

    useEffect( () => {
        if (resizing) {
            handleResize(
                dirs,
                styleData,
                setStyleData,
                mousePos
            )
        }
    }, [resizing, mousePos])
    
    return(
        <div>
            <div draggable="true" className="resize-area resize-top" onMouseDown={ e => startResize(e, {top: true}, setDirs, resizing, setResizing ) } ></div>
            <div draggable="true" className="resize-area resize-left" onMouseDown={ e => startResize(e, {left: true}, setDirs, resizing, setResizing  ) }></div>
            <div draggable="true" className="resize-area resize-bottom" onMouseDown={ e => startResize(e, {bottom: true}, setDirs, resizing, setResizing ) } ></div>
            <div draggable="true" className="resize-area resize-right" onMouseDown={ e => startResize(e, {right: true}, setDirs, resizing, setResizing ) }></div>
            <div draggable="true" className="resize-area resize-corner resize-bottomright" onMouseDown={ e => startResize(e, {bottom: true, right: true}, setDirs, resizing, setResizing ) }></div>
            <div draggable="true" className="resize-area resize-corner resize-bottomleft" onMouseDown={ e => startResize(e, {bottom: true, left: true}, setDirs, resizing, setResizing ) }></div>
            <div draggable="true" className="resize-area resize-corner resize-topright" onMouseDown={ e => startResize(e, {top: true, right: true}, setDirs, resizing, setResizing ) }></div>
            <div draggable="true" className="resize-area resize-corner resize-topleft" onMouseDown={ e => startResize(e, {top: true, left: true}, setDirs, resizing, setResizing ) }></div>
        </div>
    );
}

function dirsCursorClass(dirs) {
    if ('top' in dirs) {
        if ('left' in dirs) {
            return 'cursor-nesw-resize';
        }
        if ('right' in dirs) {
            return 'cursor-nwse-resize';
        }
        return 'cursor-ns-resize';
    }
    if ('bottom' in dirs) {
        if ('left' in dirs) {
            return 'cursor-nesw-resize';
        }
        if ('right' in dirs) {
            return 'cursor-nwse-resize';
        }
        return 'cursor-ns-resize';
    }
    return 'cursor-ew-resize';
}