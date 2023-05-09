import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore'

function ProfilePictureUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const {id} = useSelector((state) => state.auth )




  function handleImage(e) {
    const imageFile = e.target.files[0];
    console.log("Selected image:", imageFile); // Add this line
    setSelectedImage(imageFile);
    setPreviewImage(URL.createObjectURL(imageFile));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedImage) {
      return;
    }

    const objectHere = {
      'a': 'fooString',
      'b': ['1', '2', '3']
  };

    console.log("selectedImage", selectedImage.name); // Add this line

    const formData = new FormData();
    formData.append('fieldName', JSON.stringify(objectHere));

    // for(var key of formData.entries()) {
    //   console.log(key[0].name +',' + key[1])
    // }
    console.log("formData", formData); // Add this line

    // Clear the input and preview
    inputRef.current.value = null;
    setSelectedImage(null);
    setPreviewImage(null);
  }




  return (

    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          name='file'
          accept='image/*'
          onChange={handleImage}
          ref={inputRef}
        />
        {previewImage && (
          <img
            src={previewImage}
            alt='Preview Image'
            style={{ maxWidth: '200px', marginTop: '10px' }}
          />
        )}
        <button type='submit' disabled={!selectedImage}>
          Update Picture
        </button>
      </form>
    </div>
  );
}

export default ProfilePictureUpload;
