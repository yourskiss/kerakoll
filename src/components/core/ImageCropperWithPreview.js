import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
// import Loader from "../shared/LoaderComponent";
 
export default function ImageCropperWithPreview({filePath}) 
{
  const [fs, setFS] = useState(false);
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  const onChange = (e) => 
  {
    e.preventDefault();
    if ((e.target.files[0].size)/1024 > 5120) 
    {
        setFS("Please upload a file smaller than 5 MB");
        return;
    }
    else
    {
      setFS("");
      let files;
      if (e.dataTransfer) {files = e.dataTransfer.files;  } 
      else if (e.target) {files = e.target.files; }
      const reader = new FileReader();
      reader.onload = () => { setImage(reader.result); };
      reader.readAsDataURL(files[0]);
    }
  };
  const getCropData = (e) => 
  {
    e.preventDefault();
    if (typeof cropperRef.current?.cropper !== "undefined") 
    {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setImage('');
      filePath(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };
  

  return (
    <>
        <div className="registerPhotoField">
          <input type="file" id="registerphoto" accept=".jpg, .jpeg, .png" onChange={onChange} />
          <label htmlFor="registerphoto"> { cropData ? <img src={cropData} alt="cropped" /> : null } </label>
          <span className="register_photo_name">Add Profile Photo</span>
          { fs ? <span className="registerError registerErrorCenter">{fs}</span> : null }
        </div>

      { image ?
        <div className="reactcroppercontainer">
          <section>
            <Cropper
                ref={cropperRef}
                style={{ height: 350, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}  
                guides={true}
            />
            <button className="reactcropperbutton" onClick={getCropData}>Crop Image</button>
            <div className="img-preview" style={{ display:"none" }} />
          </section>
        </div>
        : null }


    </>
  );
};
 