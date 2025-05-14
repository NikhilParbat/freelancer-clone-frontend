import React, { useState } from "react";
import "./Searchbar.css";

const predefinedTags = ["AI/ML", "Web Dev", "Python", "JavaScript", "Java", "C++"];

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSearch = () => {
    onSearch({ query, tags: selectedTags });
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Search jobs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <div className="tags-container">
        {predefinedTags.map((tag) => (
          <label key={tag} className={`tag ${selectedTags.includes(tag) ? "selected" : ""}`}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => toggleTag(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
