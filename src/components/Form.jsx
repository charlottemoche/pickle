import React, { useState } from "react";

export default function Form() {
  const [feedback, setFeedback] = useState("");
  const [proposedTime, setProposedTime] = useState("");

  const handleOffer = (e) => {
    e.preventDefault();
    if (proposedTime) {
      console.log("Offer time submitted:", proposedTime);
      setProposedTime("");
    } else {
      console.log("No offer time provided.");
    }
  };

  const handleDecline = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      console.log("Feedback submitted:", feedback);
      setFeedback("");
    } else {
      console.log("No feedback provided.");
    }
  };

  return (
    <form className="my-6 space-y-6">
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">
          Offer a new time
        </h3>
        <input
          type="datetime-local"
          value={proposedTime}
          onChange={(e) => setProposedTime(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleOffer}
          className="mt-3 w-full bg-brand text-white px-4 py-2 rounded"
        >
          Propose time
        </button>
      </div>

      <hr className="border-gray-200" />

      <div>
        <div className="flex gap-2 items-center">
        <h3 className="font-semibold text-gray-700 mb-2">Why are you declining?</h3>
        <p className="text-sm text-gray-500 mb-2">(Optional)</p>
        </div>
        <input
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Not available, accepted another offer, etc."
        />
        <button
          onClick={handleDecline}
          className="mt-3 w-full bg-red-600 text-white px-4 py-2 rounded"
        >
          Decline offer
        </button>
      </div>
    </form>
  );
}
