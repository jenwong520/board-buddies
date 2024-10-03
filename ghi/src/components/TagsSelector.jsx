// import React, { useState } from 'react';

const TagSelector = ({ selectedTags, setSelectedTags }) => {
    const availableTags = ['Gaming', 'Board Games', 'Playtesting', 'Strategy', 'Family', 'Casual'];

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div className="tag-selector mb-3">
            <h4>Choose Your Tags</h4>
            <div className="d-flex flex-wrap">
                {availableTags.map(tag => (
                    <button
                        key={tag}
                        className={`btn m-1 ${selectedTags.includes(tag) ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => toggleTag(tag)}
                    >
                        + {tag}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TagSelector;
