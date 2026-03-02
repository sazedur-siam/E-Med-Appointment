import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Loader, Upload, X } from "lucide-react";
import { useState } from "react";
import storage from "../firebase/firebase.storage.config";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

const FileUpload = ({
  onUploadComplete,
  acceptedFileTypes = "image/*",
  label = "Upload File",
  description = "Click to select or drag and drop",
}) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
      setProgress(0);
      setDownloadURL("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const storageRef = ref(storage, `/files/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setProgress(prog);
        },
        (err) => {
          console.error(err);
          setError("Upload failed. Please try again.");
          setUploading(false);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setDownloadURL(url);
          setUploading(false);
          if (onUploadComplete) {
            onUploadComplete(url);
          }
        },
      );
    } catch (err) {
      setError("Upload failed. Please try again.");
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setProgress(0);
    setDownloadURL("");
    setError("");
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          <p className="text-sm text-gray-500 mb-4">{description}</p>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="file"
            accept={acceptedFileTypes}
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            disabled={uploading || !!downloadURL}
          />
          <label
            htmlFor="file-upload"
            className={`flex-1 flex items-center justify-center px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              file
                ? "border-primary-500 bg-primary-50"
                : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
            } ${uploading || downloadURL ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                {file ? file.name : "Click to select file"}
              </p>
              {file && (
                <p className="text-xs text-gray-500 mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>
          </label>

          {file && !downloadURL && (
            <Button
              onClick={handleRemove}
              variant="ghost"
              size="sm"
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <AnimatePresence>
          {file && !downloadURL && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full"
              >
                {uploading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {uploading && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-primary-600 h-2"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm text-center text-gray-600">
              {progress}% uploaded
            </p>
          </div>
        )}

        {downloadURL && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              File uploaded successfully!
            </span>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default FileUpload;
