// src/api/adminAnalytics.js
import API from './config';

export const adminAnalyticsService = {
  // Get main analytics dashboard data
  getDashboardAnalytics: async () => {
    try {
      const response = await API.get('/admin/analytics/dashboard');
      return response.data;
    } catch (error) {
      console.error('Dashboard analytics error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch analytics data');
    }
  },

  // Get revenue growth data
  getRevenueGrowth: async () => {
    try {
      const response = await API.get('/admin/analytics/revenue-growth');
      return response.data;
    } catch (error) {
      console.error('Revenue growth error:', error);
      throw new Error('Failed to fetch revenue growth data');
    }
  },

  // Get detailed analytics
  getAnalytics: async () => {
    try {
      const response = await API.get('/admin/analytics');
      return response.data;
    } catch (error) {
      console.error('General analytics error:', error);
      throw new Error('Failed to fetch analytics data');
    }
  },

  // Get content stats
  getContentStats: async () => {
    try {
      const response = await API.get('/admin/analytics/content');
      return response.data;
    } catch (error) {
      console.error('Content stats error:', error);
      throw new Error('Failed to fetch content stats');
    }
  },

  // Get user activity stats
  getUserActivity: async () => {
    try {
      const response = await API.get('/admin/analytics/user-activity');
      return response.data;
    } catch (error) {
      console.error('User activity error:', error);
      throw new Error('Failed to fetch user activity data');
    }
  },

  // Get popular templates
  getTemplateStats: async () => {
    try {
      const response = await API.get('/admin/analytics/templates');
      return response.data;
    } catch (error) {
      console.error('Template stats error:', error);
      throw new Error('Failed to fetch template stats');
    }
  },

  // Get credit usage stats
  getCreditUsage: async () => {
    try {
      const response = await API.get('/admin/analytics/credits');
      return response.data;
    } catch (error) {
      console.error('Credit usage error:', error);
      throw new Error('Failed to fetch credit usage stats');
    }
  },

  // Get feature usage stats
  getFeatureUsage: async () => {
    try {
      const response = await API.get('/admin/analytics/features');
      return response.data;
    } catch (error) {
      console.error('Feature usage error:', error);
      throw new Error('Failed to fetch feature usage stats');
    }
  },
};

export default adminAnalyticsService;
