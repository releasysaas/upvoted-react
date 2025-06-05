import { useCallback, useEffect, useState } from "react";
import { Upvoted } from "./client";
import {
  CommentCreate,
  FeatureCreate,
  FeatureRecords,
  ShowFeature,
  StatusRecords,
  UpvoteCreate,
} from "./types";

/**
 * Custom hook for using the Upvoted client in React components
 * @param token - Bearer token for authentication
 */
export const useUpvoted = (token: string) => {
  const [client] = useState<Upvoted>(() => new Upvoted(token));

  return {
    client,

    // Features
    useFeatures: (status?: string) => useUpvotedFeatures(client, status),
    useFeature: (id: string) => useUpvotedFeature(client, id),
    useCreateFeature: () => useUpvotedCreateFeature(client),
    useCommentFeature: () => useUpvotedCommentFeature(client),
    useUpvoteFeature: () => useUpvotedUpvoteFeature(client),

    // Statuses
    useStatuses: () => useUpvotedStatuses(client),
  };
};

/**
 * Hook for fetching features
 */
export const useUpvotedFeatures = (client: Upvoted, status?: string) => {
  const [data, setData] = useState<FeatureRecords | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFeatures = useCallback(async () => {
    setLoading(true);
    try {
      const result = await client.getFeatures(status);
      setData(result);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  }, [client, status]);

  useEffect(() => {
    fetchFeatures();
  }, [fetchFeatures]);

  return { data, loading, error, refetch: fetchFeatures };
};

/**
 * Hook for fetching a single feature
 */
export const useUpvotedFeature = (client: Upvoted, id: string) => {
  const [data, setData] = useState<ShowFeature | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFeature = useCallback(async () => {
    setLoading(true);
    try {
      const result = await client.getFeature(id);
      setData(result);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  }, [client, id]);

  useEffect(() => {
    fetchFeature();
  }, [fetchFeature]);

  return { data, loading, error, refetch: fetchFeature };
};

/**
 * Hook for creating a feature
 */
export const useUpvotedCreateFeature = (client: Upvoted) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createFeature = useCallback(
    async (feature: FeatureCreate) => {
      setLoading(true);
      try {
        const result = await client.createFeature(feature);
        setError(null);
        return result;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("An unknown error occurred");
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [client]
  );

  return { createFeature, loading, error };
};

/**
 * Hook for commenting on a feature
 */
export const useUpvotedCommentFeature = (client: Upvoted) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const commentFeature = useCallback(
    async (id: string, comment: CommentCreate) => {
      setLoading(true);
      try {
        const result = await client.commentFeature(id, comment);
        setError(null);
        return result;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("An unknown error occurred");
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [client]
  );

  return { commentFeature, loading, error };
};

/**
 * Hook for upvoting a feature
 */
export const useUpvotedUpvoteFeature = (client: Upvoted) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const upvoteFeature = useCallback(
    async (id: string, upvote: UpvoteCreate) => {
      setLoading(true);
      try {
        const result = await client.upvoteFeature(id, upvote);
        setError(null);
        return result;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("An unknown error occurred");
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [client]
  );

  return { upvoteFeature, loading, error };
};

/**
 * Hook for fetching statuses
 */
export const useUpvotedStatuses = (client: Upvoted) => {
  const [data, setData] = useState<StatusRecords | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStatuses = useCallback(async () => {
    setLoading(true);
    try {
      const result = await client.getStatuses();
      setData(result);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  return { data, loading, error, refetch: fetchStatuses };
};
