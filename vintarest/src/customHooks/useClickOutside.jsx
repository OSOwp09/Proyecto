import { useEffect, useState } from "react";

const useClickOutside = (ref) =>{

    const [outside, setOutside] = useState(false)
    
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                //alert("You clicked outside of me!");
                setOutside(true)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // return () => {
        //     // Unbind the event listener on clean up
        //     document.removeEventListener("mousedown", handleClickOutside)
        // };
    }, [ref]);

    return {outside, setOutside}
}

export default useClickOutside;