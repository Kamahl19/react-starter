export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          author: string;
          createdAt: string;
          description: string;
          id: string;
          title: string;
        };
        Insert: {
          author: string;
          createdAt?: string;
          description: string;
          id?: string;
          title: string;
        };
        Update: {
          author?: string;
          createdAt?: string;
          description?: string;
          id?: string;
          title?: string;
        };
        Relationships: [];
      };
      reading_list: {
        Row: {
          bookId: string;
          createdAt: string;
          finished: boolean;
          note: string;
          rating: number;
          userId: string;
        };
        Insert: {
          bookId: string;
          createdAt?: string;
          finished?: boolean;
          note?: string;
          rating?: number;
          userId: string;
        };
        Update: {
          bookId?: string;
          createdAt?: string;
          finished?: boolean;
          note?: string;
          rating?: number;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reading_list_bookId_fkey';
            columns: ['bookId'];
            referencedRelation: 'books';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reading_list_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'buckets_owner_fkey';
            columns: ['owner'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey';
            columns: ['bucket_id'];
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Schema: public
// Tables
export type Book = Database['public']['Tables']['books']['Row'];
export type InsertBook = Database['public']['Tables']['books']['Insert'];
export type UpdateBook = Database['public']['Tables']['books']['Update'];

export type ReadingList = Database['public']['Tables']['reading_list']['Row'];
export type InsertReadingList = Database['public']['Tables']['reading_list']['Insert'];
export type UpdateReadingList = Database['public']['Tables']['reading_list']['Update'];

// Schema: storage
// Tables
export type Bucket = Database['storage']['Tables']['buckets']['Row'];
export type InsertBucket = Database['storage']['Tables']['buckets']['Insert'];
export type UpdateBucket = Database['storage']['Tables']['buckets']['Update'];

export type Migration = Database['storage']['Tables']['migrations']['Row'];
export type InsertMigration = Database['storage']['Tables']['migrations']['Insert'];
export type UpdateMigration = Database['storage']['Tables']['migrations']['Update'];

export type Object = Database['storage']['Tables']['objects']['Row'];
export type InsertObject = Database['storage']['Tables']['objects']['Insert'];
export type UpdateObject = Database['storage']['Tables']['objects']['Update'];

// Functions
export type ArgsCanInsertObject = Database['storage']['Functions']['can_insert_object']['Args'];
export type ReturnTypeCanInsertObject =
  Database['storage']['Functions']['can_insert_object']['Returns'];

export type ArgsExtension = Database['storage']['Functions']['extension']['Args'];
export type ReturnTypeExtension = Database['storage']['Functions']['extension']['Returns'];

export type ArgsFilename = Database['storage']['Functions']['filename']['Args'];
export type ReturnTypeFilename = Database['storage']['Functions']['filename']['Returns'];

export type ArgsFoldername = Database['storage']['Functions']['foldername']['Args'];
export type ReturnTypeFoldername = Database['storage']['Functions']['foldername']['Returns'];

export type ArgsGetSizeByBucket = Database['storage']['Functions']['get_size_by_bucket']['Args'];
export type ReturnTypeGetSizeByBucket =
  Database['storage']['Functions']['get_size_by_bucket']['Returns'];

export type ArgsSearch = Database['storage']['Functions']['search']['Args'];
export type ReturnTypeSearch = Database['storage']['Functions']['search']['Returns'];
