import React, { useEffect, useState } from "react";
import { Upvoted } from "upvoted-react";

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
