import React, { useState } from 'react';
import '../styles/DescriptionInput.css';

function DescriptionInput({ playerName, onSubmit, isLastPlayer }) {
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() === '') {
      alert('Please enter a description!');
      return;
    }
    
    onSubmit(description.trim().split(/\s+/)[0]); // Only take the first word
    setSubmitted(true);
    setDescription('');
  };

  if (submitted) {
    return (
      <div className="description-submitted">
        <p className="submitted-message">✓ Description submitted!</p>
        <p className="next-message">
          {isLastPlayer ? 'Ready for voting round...' : 'Waiting for next player...'}
        </p>
      </div>
    );
  }

  return (
    <div className="description-input">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="description">Describe in ONE word:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter one word..."
            maxLength="50"
            autoFocus
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit Description
        </button>
      </form>
    </div>
  );
}

export default DescriptionInput;
