// Using native fetch API instead of axios
import {
  FeatureCreate,
  FeatureRecords,
  ShowFeature,
  CommentCreate,
  UpvoteCreate,
  StatusRecords
} from './types';

export class Upvoted {
  private baseUrl: string = 'https://upvoted.io/api';
  private headers: HeadersInit;

  /**
   * Creates a new Upvoted API client
   * @param token - Bearer token for authentication
   */
  constructor(token: string) {
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  /**
   * List all features for the board
   * @param status - Optional filter by status
   * @returns Promise with feature records
   */
  async getFeatures(status?: string): Promise<FeatureRecords> {
    let url = `${this.baseUrl}/boards/features`;
    if (status) {
      url += `?status=${encodeURIComponent(status)}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Get a specific feature by ID
   * @param id - Feature ID
   * @returns Promise with feature details
   */
  async getFeature(id: string): Promise<ShowFeature> {
    const response = await fetch(`${this.baseUrl}/boards/features/${id}`, {
      method: 'GET',
      headers: this.headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Create a new feature
   * @param feature - Feature data
   * @returns Promise with created feature
   */
  async createFeature(feature: FeatureCreate): Promise<ShowFeature> {
    const response = await fetch(`${this.baseUrl}/boards/features`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(feature)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Add a comment to a feature
   * @param id - Feature ID
   * @param comment - Comment data
   * @returns Promise with updated feature
   */
  async commentFeature(id: string, comment: CommentCreate): Promise<ShowFeature> {
    const response = await fetch(`${this.baseUrl}/boards/features/${id}/comments`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(comment)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Upvote a feature
   * @param id - Feature ID
   * @param upvote - Upvote data
   * @returns Promise with updated feature
   */
  async upvoteFeature(id: string, upvote: UpvoteCreate): Promise<ShowFeature> {
    const response = await fetch(`${this.baseUrl}/boards/features/${id}/upvote`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(upvote)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Get all statuses for the board
   * @returns Promise with status records
   */
  async getStatuses(): Promise<StatusRecords> {
    const response = await fetch(`${this.baseUrl}/boards/statuses`, {
      method: 'GET',
      headers: this.headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  }
}
