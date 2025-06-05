// Types based on the OpenAPI specification

export interface Contributor {
  email: string;
  name: string;
}

export interface Comment {
  contributor: Contributor;
  inserted_at: string;
  message: string;
}

export interface CommentCreate {
  contributor: Contributor;
  message: string;
}

export interface Vote {
  contributor: Contributor;
  inserted_at: string;
  public: boolean;
}

export interface FeatureCreate {
  title: string;
  description: string;
  contributor: Contributor;
}

export interface IndexFeature {
  comments_count: number;
  contributor: Contributor;
  description: string;
  id: string;
  inserted_at: string;
  private_upvotes_count: number;
  public_upvotes_count: number;
  status: string;
  title: string;
}

export interface ShowFeature extends IndexFeature {
  comments: Comment[];
  votes: Vote[];
}

export interface FeatureRecords {
  records: IndexFeature[];
}

export interface UpvoteCreate {
  contributor: Contributor;
}

export interface Status {
  name: string;
  order: number;
  is_final: boolean;
  is_initial: boolean;
}

export interface StatusRecords {
  records: Status[];
}

export interface ApiError {
  errors: {
    details: string;
  };
}
