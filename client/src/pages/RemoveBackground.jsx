import { EraserIcon, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null); // Changed from {} to null

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', input);
      
      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      
      if (data.success) {
        console.log('Response data:', data);
        // Add timestamp to prevent caching
        const imageUrlWithTimestamp = `${data.content}?t=${Date.now()}`;
        setContent({ ...data, content: imageUrlWithTimestamp });
      } else {
        console.log(data);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start gap-4 text-slate-700">
      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#ff4938]" />
          <h1 className="text-xl font-semibold">Background Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload image</p>

        <input
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm text-gray-600 rounded-md border border-gray-300"
          required
          type="file"
          onChange={(e) => setInput(e.target.files[0])}
        />
        <p className="text-xs font-light text-gray-500 mt-1">
          Supports JPG, PNG, and other image formats
        </p>
        <br />

        <button 
          disabled={loading} 
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#f6ab41] to-[#ff4938] text-white px-4 py-2 text-sm rounded-lg cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <EraserIcon className="w-5" />
          )}          
          Remove background
        </button>
      </form>
      
      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <EraserIcon className="w-5 h-5 text-[#ff4938]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <EraserIcon className="w-9 h-9" />
              <p>
                Upload an image and click "Remove Background" to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex-1 overflow-auto">
            <img 
              key={content.content} // Force re-render when URL changes
              src={content.content} 
              alt="Processed image with background removed" 
              className="w-full h-full "
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;