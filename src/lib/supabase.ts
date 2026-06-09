// Supabase deactivated - using hardcoded data
export const USE_MOCK_DATA = true;
export const isConfigured = false;

// Dummy client to prevent import errors in the rest of the application
export const supabase = {
  from: () => {
    const chain = {
      select: () => chain,
      order: () => chain,
      limit: () => chain,
      eq: () => chain,
      insert: () => chain,
      update: () => chain,
      upsert: () => chain,
      delete: () => chain,
      single: () => chain,
      maybeSingle: () => chain,
      then: (resolve: any) => resolve({ data: [], error: null }),
      catch: (reject: any) => reject(new Error('Database disabled')),
    };
    return chain;
  },
  auth: {
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getSession: () => Promise.resolve({ data: { session: null } }),
    getUser: () => Promise.resolve({ data: { user: null } }),
    signInWithPassword: () => Promise.resolve({ error: new Error('Database disabled') }),
    signOut: () => Promise.resolve({ error: null })
  },
  channel: () => ({
    on: () => ({
      subscribe: () => ({})
    })
  }),
  removeChannel: () => {}
} as any;
