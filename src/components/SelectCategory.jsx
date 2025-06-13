import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader, AlertTriangle, Star } from 'lucide-react';

const SelectCategoryandRepo = () => {
  const [categories] = useState(['react', 'javascript', 'python', 'java', 'ruby']);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      const fetchRepos = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            // `https://api.github.com/search/repositories?q=topic:${selectedCategory}&sort=stars&order=desc`
          );
          setRepos(response.data.items);
        } catch (err) {
          setError('Failed to fetch repositories. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      fetchRepos();
    }
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setRepos([]);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <header className="bg-base-100 shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-base-content">
            GitHub Repository Finder
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Select a Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`btn btn-sm ${
                  selectedCategory === category ? 'btn-primary' : 'btn-outline'
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <AlertTriangle className="h-6 w-6" />
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {!loading && !error && selectedCategory && repos.length === 0 && (
          <div className="alert alert-info">
            <span>No repositories found for {selectedCategory}.</span>
          </div>
        )}

        {!loading && repos.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <div key={repo.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-hover text-primary"
                    >
                      {repo.full_name}
                    </a>
                  </h2>
                  <p className="text-base-content/70">
                    {repo.description || 'No description available.'}
                  </p>
                  <div className="card-actions flex items-center gap-2">
                    <Star className="h-5 w-5 text-warning" />
                    <span>{repo.stargazers_count} Stars</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SelectCategoryandRepo;