import { useEffect } from "react";

export default function useClickOutside(ref:React.MutableRefObject<any>, onClickOutside:()=>void) {
    useEffect(() => {

      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          onClickOutside();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {

        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onClickOutside]);
}