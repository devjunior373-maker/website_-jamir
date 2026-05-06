// Supabase deactivated - using hardcoded data
export const USE_MOCK_DATA = true;
export const isConfigured = false;

// Dummy client to prevent import errors in the rest of the application
export const supabase = {
  from: () => ({
    select: () => ({
      order: () => ({
        limit: () => Promise.resolve({ data: [], error: null }),
        then: () => Promise.resolve({ data: [], error: null })
      }),
      eq: () => Promise.resolve({ data: [], error: null })
    })
  }),
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
