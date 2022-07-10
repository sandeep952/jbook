import React, { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './Resizeable.css'
interface ResizeableProps {
    direction: 'horizontal' | 'vertical',
    children: React.ReactNode
}
const Resizeable: React.FC<ResizeableProps> = ({ direction, children }) => {

    let resizeableBoxProps: ResizableBoxProps;
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);

    useEffect(() => {
        let timer: any;
        const listener = () => {

            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                setInnerWidth(window.innerWidth);
                setInnerHeight(window.innerHeight)
            }, 100)
        }
        window.addEventListener('resize', listener)
    }, [])

    if (direction === 'horizontal') {
        resizeableBoxProps = {
            className: "resize-horizontal",
            height: Infinity,
            width: innerWidth * 0.75,
            resizeHandles: ['e'],
            maxConstraints: [innerWidth * 0.8, Infinity]
        }
    }
    else {
        resizeableBoxProps = {
            height: 400,
            width: Infinity,
            resizeHandles: ['s'],
            maxConstraints: [Infinity, innerHeight * 0.7]
        }
    }
    console.log("rendered")

    return (
        <ResizableBox
            {...resizeableBoxProps}
        >{children}</ResizableBox>
    )
}

export default Resizeable