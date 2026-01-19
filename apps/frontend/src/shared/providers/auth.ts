import { authClient } from '@/shared/lib/auth-client';
import { ERROR_MESSAGES } from '@/shared/providers/constants';
import { SignUpPayload } from '@/shared/types';
import type { AuthActionResponse, AuthProvider, CheckResponse } from '@refinedev/core';
import { createErrorResponse, createSuccessResponse, getStoredUser, removeUser, storeUser } from './helpers';

export const authProvider: AuthProvider = {
  register: async (params: SignUpPayload): Promise<AuthActionResponse> => {
    try {
      const { email, password, name, role, image, imageCldPubId } = params;

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        role,
        imageCldPubId,
      } as SignUpPayload);

      if (error) {
        return createErrorResponse('Registration failed', error.message || ERROR_MESSAGES.REGISTER_FAILED);
      }

      if (data?.user) {
        storeUser(data.user);
      }

      return createSuccessResponse('/');
    } catch (error) {
      console.error('Register error:', error);
      return createErrorResponse('Registration failed', ERROR_MESSAGES.REGISTER_FAILED);
    }
  },

  login: async ({ email, password }): Promise<AuthActionResponse> => {
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        console.error('Login error from auth client:', error);
        return createErrorResponse('Login failed', error.message || ERROR_MESSAGES.LOGIN_FAILED);
      }

      if (data?.user) {
        storeUser(data.user);
      }

      return createSuccessResponse('/');
    } catch (error) {
      console.error('Login exception:', error);
      return createErrorResponse('Login failed', ERROR_MESSAGES.LOGIN_FAILED);
    }
  },

  logout: async (): Promise<AuthActionResponse> => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error('Logout error:', error);
        return createErrorResponse('Logout failed', ERROR_MESSAGES.LOGOUT_FAILED);
      }

      removeUser();

      return createSuccessResponse('/login');
    } catch (error) {
      console.error('Logout exception:', error);
      return createErrorResponse('Logout failed', ERROR_MESSAGES.LOGOUT_FAILED);
    }
  },

  check: async (): Promise<CheckResponse> => {
    const user = getStoredUser();

    if (user) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: '/login',
      error: {
        name: 'Unauthorized',
        message: ERROR_MESSAGES.UNAUTHORIZED,
      },
    };
  },

  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },

  getPermissions: async () => {
    const user = getStoredUser();

    if (!user) {
      return null;
    }

    return {
      role: user.role,
    };
  },

  getIdentity: async () => {
    const user = getStoredUser();

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      imageCldPubId: user.imageCldPubId,
    };
  },
};
