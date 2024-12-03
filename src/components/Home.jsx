import  { useState } from "react";
import {Camera ,FolderSearch } from "lucide-react"
const Home = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setError(""); // Clear any previous errors
    }
  };

  // Handle drag-and-drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setError(""); // Clear any previous errors
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please upload an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully!");
        setImage(null); // Reset image state after successful submission
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  return (
    <section className="min-h-screen bg-blue-50 flex flex-col items-center p-5">
      {/* Header Section */}
      <div className="w-full max-w-xl text-center mb-8">
        <h1 className="text-3xl uppercase font-extrabold text-blue-600 mb-3">Tablet Scheduler</h1>
        <p className="text-lg text-gray-700 font-medium mb-2">
          Upload a photo of the Stripe or Prescription and let the app guide you.
        </p>
        <p className="text-sm text-gray-600">
          Tablet Name | Purpose | Timings | Before/After Meal
        </p>
      </div>

      {/* Image Upload Section */}
      <form
        className="w-full max-w-xl bg-white shadow-md rounded-lg  p-5 border-dashed border-gray-300"
        onSubmit={handleSubmit}
      >
        {/* Mobile and Tablet View */}
        <div className="block md:hidden">
          <p className="text-center text-gray-700 mb-3 font-semibold">Upload Image</p>
          <p className=" text-center text-gray-700 text-sm my-2 " >File : JPG | PNG</p>
          <div className="flex  items-center gap-4">
            <button
              type="button"
              onClick={() =>
                document.getElementById("cameraInput").click()
              }
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
            >
            <div className="flex gap-2 p-1 items-center">
            <Camera />
            <p>Scan</p>
            </div>
            </button>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              id="cameraInput"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() =>
                document.getElementById("browseInput").click()
              }
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600"
            >
             <div className="flex gap-2 items-center p-1">
             <FolderSearch /> 
             <p>Browse</p>
             </div>
            </button>
            <input
              type="file"
              accept="image/*"
              id="browseInput"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Desktop and Laptop View */}
        <div
          className="hidden md:flex flex-col items-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className="text-center text-gray-700 mb-3 font-semibold">Drag & Drop or Browse</p>
          <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center text-gray-500">
            {image ? (
              <p className="text-gray-700 text-sm">File selected: {image.name}</p>
            ) : (
              "Drag & drop your file here"
            )}
          </div>
          <button
            type="button"
            onClick={() =>
              document.getElementById("desktopBrowseInput").click()
            }
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
          >
            Browse Files
          </button>
          <input
            type="file"
            accept="image/*"
            id="desktopBrowseInput"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Display File Name */}
        {image && (
          <p className="text-center text-sm text-gray-500 mt-2">
            Selected file: {image.name}
          </p>
        )}

        {/* Validation Error */}
        {error && (
          <p className="text-center text-red-500 mt-2">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Home;
