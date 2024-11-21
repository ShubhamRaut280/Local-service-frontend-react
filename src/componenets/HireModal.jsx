import React, { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";

const HireModal = ({ freelancer, onClose }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [status, setStatus] = useState("Pending"); // Initial status can be "Pending"
  const [userId] = useState("USER_ID"); // Replace with the actual user ID
  const [freelancerId] = useState(freelancer.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add a new job request document to Firestore
      await addDoc(collection(db, "jobrequest"), {
        userId,
        freelancerId,
        jobDescription,
        status,
        createdAt: new Date(),
      });
      alert("Job request submitted successfully!");
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting job request: ", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">Job Request Form</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Describe the job you want to hire for"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Submit Job Request
            </button>
            <button
              type="button"
              onClick={onClose} // Close the modal without submitting
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HireModal;