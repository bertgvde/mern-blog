import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Alert, Spinner, Modal } from 'flowbite-react';

const ProfileImageManager = ({ userId }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/profile-image/${userId}`);
        setImageUrl(response.data.imageUrl);
      } catch (err) {
        if (err.response?.status !== 404) {
          setError('Failed to fetch profile image');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchProfileImage();
    }
  }, [userId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('userId', userId);

      const response = await axios.post('/api/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageUrl(response.data.imageUrl);
      setSuccess('Profile image updated successfully!');
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile Image</h2>
      
      {error && (
        <Alert color="failure" className="mb-4">
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert color="success" className="mb-4">
          {success}
        </Alert>
      )}

      {isLoading && !imageUrl ? (
        <div className="flex justify-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="flex flex-col items-center mb-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          
          <Button onClick={() => setShowModal(true)} gradientMonochrome="info">
            {imageUrl ? 'Change Image' : 'Upload Image'}
          </Button>
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Upload Profile Image</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Select Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            {selectedFile && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected: {selectedFile.name}</p>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="mt-2 max-h-40 rounded"
                />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpload} disabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : 'Upload'}
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileImageManager;