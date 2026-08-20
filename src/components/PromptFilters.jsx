const FILTER_CATEGORIES = {
    Moods: ['Chill', 'Party', 'Workout', 'Focus', 'Late Night Drive'],
    Genres: ['Pop', 'Rock', 'Rap', 'RnB', 'Indie', 'Sad',  'Trap'],
    Eras: ['80s', '90s', '2000s', '2010s', 'Modern', 'Viral/Trending'],
    Vibes: ['Aesthetic', 'Nostalgic', 'Summer', 'Dark/Gothic', 'Energy Boost']
};

function PromptFilters({selectedTags, onToggle}) {
    return (
        <div className="prompt-filters">
            {Object.entries(FILTER_CATEGORIES).map(([category, tags]) => (
                <div key={category} className="filter-category">
                    <h4>{category}</h4>
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            className = {selectedTags.includes(tag) ? 'selected' : ''}
                            type="button"
                            onClick={() => onToggle(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default PromptFilters;