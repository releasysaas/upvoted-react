# Upvoted React Client

A React client for the Upvoted API. This library provides a simple way to interact with the Upvoted API from React applications. It uses the native fetch API for making HTTP requests.

## Installation

```bash
npm install upvoted-react
```

## Usage

### Basic Client Usage

```typescript
import { Upvoted } from 'upvoted-react';

// Initialize the client with your bearer token
const client = new Upvoted('your-bearer-token');

// Get all features
client.getFeatures()
  .then(features => console.log(features))
  .catch(error => console.error(error));

// Get features filtered by status
client.getFeatures('pending')
  .then(features => console.log(features))
  .catch(error => console.error(error));

// Get a specific feature
client.getFeature('feature-id')
  .then(feature => console.log(feature))
  .catch(error => console.error(error));

// Create a new feature
const newFeature = {
  title: 'New Feature',
  description: 'This is a new feature',
  contributor: {
    email: 'user@example.com',
    name: 'User Name'
  }
};

client.createFeature(newFeature)
  .then(feature => console.log(feature))
  .catch(error => console.error(error));

// Add a comment to a feature
const comment = {
  message: 'This is a comment',
  contributor: {
    email: 'user@example.com',
    name: 'User Name'
  }
};

client.commentFeature('feature-id', comment)
  .then(feature => console.log(feature))
  .catch(error => console.error(error));

// Upvote a feature
const upvote = {
  contributor: {
    email: 'user@example.com',
    name: 'User Name'
  }
};

client.upvoteFeature('feature-id', upvote)
  .then(feature => console.log(feature))
  .catch(error => console.error(error));

// Get all statuses
client.getStatuses()
  .then(statuses => console.log(statuses))
  .catch(error => console.error(error));
```

### React Hooks Usage

```tsx
import React from 'react';
import { useUpvoted } from 'upvoted-react';

const FeatureList = () => {
  const { useFeatures } = useUpvoted('your-bearer-token');
  const { data, loading, error } = useFeatures();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h1>Features</h1>
      <ul>
        {data.records.map(feature => (
          <li key={feature.id}>{feature.title}</li>
        ))}
      </ul>
    </div>
  );
};

const FeatureDetail = ({ id }) => {
  const { useFeature } = useUpvoted('your-bearer-token');
  const { data, loading, error } = useFeature(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <p>Status: {data.status}</p>
      <p>Comments: {data.comments_count}</p>
      <p>Public Upvotes: {data.public_upvotes_count}</p>
      <p>Private Upvotes: {data.private_upvotes_count}</p>
    </div>
  );
};

const CreateFeatureForm = () => {
  const { useCreateFeature } = useUpvoted('your-bearer-token');
  const { createFeature, loading, error } = useCreateFeature();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createFeature({
        title,
        description,
        contributor: { email, name }
      });
      console.log('Feature created:', result);
      // Reset form or redirect
    } catch (err) {
      console.error('Failed to create feature:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Feature'}
      </button>
      {error && <div>Error: {error.message}</div>}
    </form>
  );
};
```

## API Reference

### Upvoted Class

The main client class for interacting with the Upvoted API.

#### Constructor

```typescript
constructor(token: string)
```

- `token`: Bearer token for authentication

#### Methods

- `getFeatures(status?: string): Promise<FeatureRecords>`
- `getFeature(id: string): Promise<ShowFeature>`
- `createFeature(feature: FeatureCreate): Promise<ShowFeature>`
- `commentFeature(id: string, comment: CommentCreate): Promise<ShowFeature>`
- `upvoteFeature(id: string, upvote: UpvoteCreate): Promise<ShowFeature>`
- `getStatuses(): Promise<StatusRecords>`

### React Hooks

- `useUpvoted(token: string)`: Main hook that provides access to all other hooks
- `useFeatures(status?: string)`: Hook for fetching features
- `useFeature(id: string)`: Hook for fetching a single feature
- `useCreateFeature()`: Hook for creating a feature
- `useCommentFeature()`: Hook for commenting on a feature
- `useUpvoteFeature()`: Hook for upvoting a feature
- `useStatuses()`: Hook for fetching statuses

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

Copyright (c) 2025 Releasy CORP
