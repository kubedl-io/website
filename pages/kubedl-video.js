import React, { useRef} from 'react'

function myComponent(props) {
    const vidRef = useRef(null);
    const handlePlayVideo = () => {
        vidRef.current.play();
    }
    return (
        <video ref={vidRef}>
            <source src={["/video/kubedl-pipeline.mp4"]} type="video/mp4" />
        </video>
    )
}
