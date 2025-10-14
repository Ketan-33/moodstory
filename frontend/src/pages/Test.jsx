
import { useEffect, useState } from "react";
import image1 from "../assets/face1.jpg";
import audio1 from "../assets/test.wav";

const Test = () => {
    const [imageBlob, setImageBlob] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    useEffect(() => {
        const fetchFileAsBlob = async (fileUrl) => {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            return blob;
        };

        const loadFiles = async () => {
            const imageBlob = await fetchFileAsBlob(image1);
            const audioBlob = await fetchFileAsBlob(audio1);
            setImageBlob(imageBlob);
            setAudioBlob(audioBlob);
        };

        loadFiles();
    }, []);

    const handleSubmit = async () => {
        // Create a FormData object
        console.log("Fetching...");
        
        const formData = new FormData();
        formData.append('image', imageBlob, 'face1.jpg');
        formData.append('audio', audioBlob, 'test.wav');
        // Manually log the FormData contents (use FormData.entries to inspect)
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        
        // Make the API call
        try {
            const response = await fetch('http://127.0.0.1:8000/generate-story', {
                method: 'POST',
                body: formData,
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('Upload success:', result);
            } else {
                console.error('Upload failed:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }finally{

            console.log("OKKKKKKK...");
        }
    };

    return (
        <div className='bg-black h-screen text-white pt-20'>
            <button className="border-2 p-2 cursor-pointer border-white" onClick={handleSubmit}>
                Fetch
            </button>
        </div>
    )
}

export default Test