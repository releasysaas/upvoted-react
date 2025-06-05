import React, { useEffect, useState } from "react";
import { Upvoted } from "upvoted-react";
import "./App.css";

// Example of directly using the Upvoted client
const upvotedClient = new Upvoted(process.env.REACT_APP_UPVOTED_API_KEY);

function App() {
  // Main state for features from the first approach
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for features from the direct client approach
  const [directFeatures, setDirectFeatures] = useState([]);
  const [directLoading, setDirectLoading] = useState(false);
  const [directError, setDirectError] = useState(null);
  
  // State for feature creation form
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contributor: {
      name: "",
      email: ""
    }
  });
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  // First approach: Using the client in a useEffect hook
  useEffect(() => {
    const fetchFeatures = async () => {
      setLoading(true);
      try {
        const result = await upvotedClient.getFeatures();
        setFeatures(result.records || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching features:", err);
        setError(err.message || "Failed to fetch features");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  // Second approach: Direct client usage example
  useEffect(() => {
    const fetchDirectFeatures = async () => {
      setDirectLoading(true);
      try {
        const result = await upvotedClient.getFeatures();
        setDirectFeatures(result.records || []);
        setDirectError(null);
      } catch (err) {
        console.error("Error fetching features directly:", err);
        setDirectError(err.message || "Failed to fetch features directly");
      } finally {
        setDirectLoading(false);
      }
    };

    fetchDirectFeatures();
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested fields (contributor.name, contributor.email)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      // Handle top-level fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormSuccess("");
    setFormError("");
    
    try {
      const result = await upvotedClient.createFeature(formData);
      console.log("Feature created:", result);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        contributor: {
          name: "",
          email: ""
        }
      });
      
      // Show success message
      setFormSuccess("Feature request created successfully!");
      
      // Refresh features list
      const featuresResult = await upvotedClient.getFeatures();
      setFeatures(featuresResult.records || []);
      setDirectFeatures(featuresResult.records || []);
    } catch (err) {
      console.error("Error creating feature:", err);
      setFormError(err.message || "Failed to create feature request");
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading && directLoading) {
    return <div>Loading features...</div>;
  }

  if (error && directError) {
    return <div>Error: {error || directError}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upvoted React Example</h1>
      </header>

      <section>
        <h2>Create a Feature Request</h2>
        <div className="feature-form">
          {formSuccess && <div className="success-message">{formSuccess}</div>}
          {formError && <div className="error-message">{formError}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contributor.name">Your Name</label>
              <input
                type="text"
                id="contributor.name"
                name="contributor.name"
                value={formData.contributor.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contributor.email">Your Email</label>
              <input
                type="email"
                id="contributor.email"
                name="contributor.email"
                value={formData.contributor.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <button type="submit" disabled={formSubmitting}>
              {formSubmitting ? "Submitting..." : "Submit Feature Request"}
            </button>
          </form>
        </div>
      </section>

      <section>
        <h2>Features from first approach</h2>
        {features && features.length > 0 ? (
          <ul>
            {features.map((feature) => (
              <li key={feature.id}>
                <h3>{feature.title}</h3>
                <p>Status: {feature.status}</p>
                <p>Created: {new Date(feature.inserted_at).toLocaleString()}</p>
                <p>Contributor: {feature.contributor?.name || 'Anonymous'}</p>
                <p>Public Upvotes: {feature.public_upvotes_count}</p>
                <p>Private Upvotes: {feature.private_upvotes_count}</p>
                <p>Comments: {feature.comments_count}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No features found</p>
        )}
      </section>

      <section>
        <h2>Features from direct client usage</h2>
        {directFeatures && directFeatures.length > 0 ? (
          <ul>
            {directFeatures.map((feature) => (
              <li key={feature.id}>
                <h3>{feature.title}</h3>
                <p>Status: {feature.status}</p>
                <p>Created: {new Date(feature.inserted_at).toLocaleString()}</p>
                <p>Contributor: {feature.contributor?.name || 'Anonymous'}</p>
                <p>Public Upvotes: {feature.public_upvotes_count}</p>
                <p>Private Upvotes: {feature.private_upvotes_count}</p>
                <p>Comments: {feature.comments_count}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No features found</p>
        )}
      </section>
    </div>
  );
}

export default App;
