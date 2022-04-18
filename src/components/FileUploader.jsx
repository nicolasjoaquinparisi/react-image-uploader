import { useState, useRef } from "react"

import ClipLoader from "react-spinners/ClipLoader"

const FileUploader = () => {
    
    const [ img, setImg ]                 = useState(null)
    const [ uploadData, setUploadData ]   = useState(null)
    const [ isUploading, setIsUploading ] = useState(false)

    const form = useRef(null)

    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME

    const handleChange = changeEvent => {
        const fileReader = new FileReader()
        
        fileReader.onload = loadEvent => setImg(loadEvent.target.result)
        
        if (changeEvent.target.files.length > 0)
            fileReader.readAsDataURL(changeEvent.target.files[0])
    }

    const handleSubmit = async e => {
        e.preventDefault()

        setIsUploading(true)

        const fileInput = Array.from(form.current.elements).find(({name}) => name === "file")

        const formData = new FormData()

        for (const file of fileInput.files) {
            formData.append("file", file)
        }

        formData.append("upload_preset", "my-upload")

        const data = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())

        setImg(data.secure_url)
        setUploadData(data)
        setIsUploading(false)
    }

    return (
        <main className="md:grid md:grid-cols-2 md:gap-5 container px-5 mx-auto mt-5">
            <form className="flex flex-col gap-3" ref={form} onChange={handleChange}>
                <input type="file" name="file" />
                <ClipLoader className="border-slate-900 m-0 my-auto block" loading={isUploading} size={50} />
            </form>
            <section>
                { img && ( <img src={img} className="w-1/2" /> ) }
                { img && !uploadData && ( <button onClick={handleSubmit} className="p-2 w-1/2 mt-3 bg-slate-900 text-white">Upload file</button> ) }
            </section>
        </main>
    );
}
 
export default FileUploader;