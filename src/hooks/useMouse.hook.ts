import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

export function useMousePos() {

  const [state, setState] = useState({x: 0, y: 0})

  useEffect( () => {
    function _handleMouseMove(e) {
        setState(state => ({...state, x: e.clientX, y: e.clientY}))
    }

    const handleMouseMove = throttle(_handleMouseMove, 10);

    document.addEventListener("mousemove", handleMouseMove)

    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return state;
  
}