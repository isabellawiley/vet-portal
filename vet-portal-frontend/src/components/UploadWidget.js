import { useEffect, useRef, useState } from "react";


function UploadWidget({url, setUrl}){
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    // const [url, setUrl] = useState('');
    
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'ddr8azah3',
            uploadPreset: "vet-portal"
        }, function(error, result) {
            // console.log(result)
            setUrl(result.info.files[0].uploadInfo.secure_url);
        })
    }, [])

    return(
        <div>
            <button onClick={() => widgetRef.current.open()}>Upload</button>
            {url ?
            <img src={url} style={{height: '200px', width: '200px', objectFit: 'cover'}}/>
            : <div></div>}
        </div>
    )
}

export default UploadWidget;

// http://res.cloudinary.com/ddr8azah3/image/upload/v1678752568/pet-images/skbo90jrxmzqxnzyu53i.jpg"