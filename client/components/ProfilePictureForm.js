// import React, { useState, useRef, useEffect } from 'react';
// import S3FileUpload from 'react-s3/lib/ReactS3';
// import { useSelector, useDispatch } from 'react-redux'
// import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore'
// import { Buffer } from 'buffer';

// function ProfilePictureUpload() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const dispatch = useDispatch();
//   const inputRef = useRef(null);
//   const {id} = useSelector((state) => state.auth )


//   const config = {
//     bucketName: 'bingeproof',
//     region: 'US East (N. Virginia) us-east-1',
//     accessKeyId: 'AKIAXIAXBGEQVIBPLXOE',
//     secretAccessKey: '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'
//   }



//   function handleImage(e) {
//     // S3FileUpload.uploadFile(e.target.files[0], config)
//     //   .then((data)=> {
//     //     console.log(data.location)
//     //   })
//     //   .catch( (err)=>{
//     //     alert(err)
//     //   })

//     const imageFile = e.target.files[0];
//     console.log("Selected image:", imageFile); // Add this line
//     setSelectedImage(imageFile);
//     setPreviewImage(URL.createObjectURL(imageFile));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!selectedImage) {
//       return;
//     }

//     console.log("selectedImage", selectedImage.name); // Add this line

//     S3FileUpload.uploadFile(selectedImage, config)
//     // .then((data)=> {
//     //   console.log(data.location)
//     // })
//     // .catch( (err)=>{
//     //   alert(err)
//     // })

//     const formData = new FormData();
//     formData.append('userId', id);
//     formData.append('fieldName', selectedImage, selectedImage.name);
//     dispatch(updateSingleUser(id, formData))
//     console.log("formData", id); // Add this line

//     // Clear the input and preview
//     inputRef.current.value = null;
//     setSelectedImage(null);
//     setPreviewImage(null);
//   }




//   return (

//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type='file'
//           name='file'
//           accept='image/*'
//           onChange={handleImage}
//           ref={inputRef}
//         />
//         {previewImage && (
//           <img
//             src={previewImage}
//             alt='Preview Image'
//             style={{ maxWidth: '200px', marginTop: '10px' }}
//           />
//         )}
//         <button type='submit' disabled={!selectedImage}>
//           Update Picture
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ProfilePictureUpload;

import React , {useState} from 'react';
import S3 from 'react-aws-s3';

// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

// a React functional component, used to create a simple upload input and button

const ProfilePictureUpload = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    // the configuration information is fetched from the .env file
    const config = {
        bucketName: "bingeproof",
        region: 'us-east-1',
        accessKeyId: "AKIAXIAXBGEQVIBPLXOE",
        secretAccessKey: "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",
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = async (file) => {
        const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, file.name)
        .then(data => console.log(data.location))
        .catch(err => console.error(err))
    }
    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <br></br>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
}

export default ProfilePictureUpload;
