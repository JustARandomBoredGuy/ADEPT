import React, { useState } from 'react';
import roadmap from "../../../backend/src/constants/processedData/finalData.json";

const Roadmap = () => {
  const [selectedSection, setSelectedSection] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSection) {
      console.log("Selected section:", selectedSection);
      // You can use roadmap[selectedSection - 1] here if needed
    } else {
      console.log("Please select a section");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="roadmap">Choose a roadmap section:</label>
      <select
        id="roadmap"
        name="roadmap"
        value={selectedSection}
        onChange={(e) => setSelectedSection(e.target.value)}
      >
        <option value="">-- Select Section --</option>
        {Object.entries(roadmap).map(([sectionKey]) => {
          const displayNumber = parseInt(sectionKey) + 1;
          return (
            <option key={sectionKey} value={displayNumber}>
              Section {displayNumber}
            </option>
          );
        })}
      </select>

      <button type="submit" style={{ marginLeft: "1rem" }}>
        Submit
      </button>
    </form>
  );
};

export default Roadmap;
