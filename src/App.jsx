import "./App.css";
import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import {
  ref,
  uploadString,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid"; // Correct import
import { RotatingLines } from "react-loader-spinner";


function App() {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]); // Store uploaded images
  const webcamRef = useRef(null); // Webcam reference
  const [capturedImage, setCapturedImage] = useState(null); // Capture from webcam

  // Firebase storage reference for 'images/'
  const imagesListRef = ref(storage, "images/");

  // Function to upload captured image
  const uploadFile = () => {
    setLoading(true);
    if (capturedImage) {
      const imageRef = ref(storage, `images/${uuidv4()}.jpg`); // Use uuidv4 to create unique image names
      uploadString(imageRef, capturedImage, "data_url").then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => {
            if (!prev.includes(url)) {
              return [...prev, url];
            }
            return prev;
          });
          setCapturedImage(null); // Close the pop-up after upload
          setLoading(false); // Stop the loader after the upload is complete
        });
      });
    }
  };
  // Capture image from webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture image from the webcam
    setCapturedImage(imageSrc); // Save the captured image to state
  };

  // Fetch and display all images in the 'images/' folder
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => {
            if (!prev.includes(url)) {
              return [...prev, url];
            }
            return prev;
          });
        });
      });
    });

    // Check for camera permissions
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => console.log("Camera permission granted"))
      .catch((error) => console.error("Camera permission denied", error));
  }, [imagesListRef]);

  // Names of the couple
  const name1 = "Kingsley";
  const name2 = "Nadia";
 

  return (
    <div className="App">
      <div
        className="flex justify-center items-center h-screen bg-mobile-bg sm:bg-desktop-bg bg-cover bg-center"
      >
        {/* Navbar */}
        <nav className=" name absolute top-0 w-full z-50 flex justify-between items-center px-6 py-4  bg-transparent">
          <div className="text-lg font-bold text-yellow-700">
            {name1} <span className="text-pink-400">💍</span> {name2}
          </div>
          <ul className="flex space-x-6 text-sm sm:text-base text-white">
            <li>
              <a
                href="#camera"
                className="hover:text-pink-400 hover:border-b-2 hover:border-pink-400 transition duration-300 ease-in-out"
              >
                Camera
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className="hover:text-pink-400 hover:border-b-2 hover:border-pink-400 transition duration-300 ease-in-out"
              >
                Gallery
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="text-center  ">
          <h1 className="name2 text-4xl sm:text-5xl md:text-6xl font-bold  bg-opacity-50">
            Welcome to Our Wedding Selfie Booth! 📸💍
          </h1>

          <p className=" name3 mt-4 text-lg sm:text-xl md:text-2xl p-4 ">
            We’re excited to celebrate with you! Capture the love, laughter, and fun moments. Snap your memories and be part of our special day!
          </p>

          <div className="mt-4 border-t-2 border-rose-200 w-16 mx-auto"></div>
        </div>
      </div>

      <div className="  p-6 mb-4 bg-slate-100">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">How It Works:</h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl">
          <ul>
            <li><b>Snap a Selfie: </b>Grab your phone, find your best angle, and take a selfie at the wedding. </li>
            <li> <b>Upload & Share: </b>Use the camera icon to upload your photo and become part of our digital wedding album.</li>
            <li><b>Spread the Love:</b> Feel free to add a fun message or tag your friends in the gallery.<br /> Let&apos;s Create Memories Together!</li>
          </ul>
        </p>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl">From the silly moments to the glamorous poses, every picture tells a story. So let’s fill this space with the best memories of our special day!
        </p>
      </div>

      {/* Camera Section */}
      <h1 id="camera" className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 text-center">Camera</h1>
      <p className="border-t-2 border-yellow-700 w-16 mx-auto mb-4"></p>

  
      <div className="relative flex-grow w-full flex items-center justify-center">
  <div className="border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden w-full h-full max-w-screen-lg max-h-screen-lg">
    <Webcam
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      mirrored={true}
      className="w-full h-full max-w-screen-lg max-h-screen-lg object-cover"
    />
    {/* Capture Image Button */}
    <button
      onClick={captureImage}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white text-white font-semibold rounded-full shadow-lg hover:bg-yellow-700 transition duration-300 ease-in-out flex items-center justify-center z-10"
    >
      <span className="sr-only">Capture Image</span>
    </button>
  </div>



      </div>

      {/* Preview captured webcam image in a pop-up */}
      {capturedImage && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-out">
    {/* Modal content */}
    <div className="relative bg-transparent p-6 rounded-lg shadow-lg w-full max-w-lg mx-5 sm:mx-0 transition-transform transform scale-105 hover:scale-100">
      
      {/* Close Button (X) */}
      <button
        onClick={() => setCapturedImage(null)}
        className="absolute top-2 right-2 text-yellow-700  hover:text-gray-800 bg-transparent font-bold p-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition duration-300 ease-in-out"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Captured Image */}
      <div className="flex justify-center p-3 mb-4">
        <img
          src={capturedImage}
          alt="Captured"
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>

      {/* Button to upload captured webcam image */}
      <div className="flex justify-center space-x-4">
      <button
      onClick={uploadFile}
      disabled={loading} // Disable button when loading
      className={`px-6 py-2 bg-yellow-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 ${
        loading ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="24"
            visible={true}
          />
          <span className="ml-2">Uploading...</span>
        </div>
      ) : (
        "Upload Image"
      )}
    </button>

        <button
          onClick={() => setCapturedImage(null)}
          className="px-6 py-2 bg-gray-300 text-gray-700 text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Retake
        </button>
      </div>
    </div>
  </div>
)}


      {/* Gallery Section */}
      <h1 id="gallery" className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 text-center">Gallery</h1>
      <p className="border-t-2 border-yellow-700 w-16 mx-auto"></p>
      <div className="image-gallery mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`uploaded-${index}`} className="w-full h-64 object-cover rounded-lg shadow-lg" />
        ))}
      </div>

      {/* Footer Section */}
<footer className="bg-black text-white text-center py-2 mt-6">
  <div className="container mx-auto">
    <p className="mb-2">
      &copy; {new Date().getFullYear()}. Designed by 
      <a href="https://www.instagram.com/adesanya_adeyemi_/" className="hover:text-pink-400 foot transition duration-300"> Adesanya Adeyemi</a>
    </p>
    
  </div>
</footer>

    </div>
    
  );
}

export default App;
