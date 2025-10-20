import React, { useEffect } from "react"
import { useState } from "react"

const useMobile = (breakpoint = 768)=>{
    const [isMobile,setisMobile] = useState(window.innerWidth < breakpoint)


    const handleResize = ()=>{
        const checkpoint = window.innerWidth < breakpoint
        setisMobile(checkpoint);

    }


    useEffect(()=>{
        handleResize()

        window.addEventListener('resize',handleResize)

        return ()=>{
            window.removeEventListener('resize',handleResize)
        }

    },[])

    return [isMobile]

}

export default useMobile;