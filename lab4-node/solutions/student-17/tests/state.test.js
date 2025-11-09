const CampaignState = require('../src/state');

describe('CampaignState Singleton', () => {
  // Сохраняем оригинальные данные чтобы восстановить после тестов
  let originalData;

  beforeAll(() => {
    // Сохраняем оригинальное состояние
    originalData = {
      userCampaigns: new Map(CampaignState.userCampaigns),
      analyticsData: new Map(CampaignState.analyticsData)
    };
  });

  beforeEach(() => {
    // Очищаем состояние перед каждым тестом
    CampaignState.userCampaigns.clear();
    CampaignState.analyticsData.clear();
  });

  afterAll(() => {
    // Восстанавливаем оригинальное состояние после всех тестов
    CampaignState.userCampaigns = originalData.userCampaigns;
    CampaignState.analyticsData = originalData.analyticsData;
  });

  describe('addCampaign', () => {
    test('should add campaign for user', () => {
      const userId = 123;
      const campaign = {
        platform: 'instagram',
        text: 'Test ad text',
        status: 'active'
      };

      const result = CampaignState.addCampaign(userId, campaign);

      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.platform).toBe('instagram');
      expect(result.text).toBe('Test ad text');
      expect(result.status).toBe('active');

      const userCampaigns = CampaignState.getCampaigns(userId);
      expect(userCampaigns).toHaveLength(1);
      expect(userCampaigns[0].id).toBe(result.id);
    });

    test('should initialize analytics for new campaign', () => {
      const userId = 123;
      const campaign = {
        platform: 'facebook',
        text: 'Test ad',
        status: 'active'
      };

      const result = CampaignState.addCampaign(userId, campaign);

      const analytics = CampaignState.getAnalytics(result.id);
      expect(analytics).toBeDefined();
      expect(analytics.reach).toBeGreaterThanOrEqual(100);
      expect(analytics.reach).toBeLessThanOrEqual(1100);
      expect(analytics.engagement).toBeGreaterThanOrEqual(10);
      expect(analytics.engagement).toBeLessThanOrEqual(110);
      expect(analytics.clicks).toBeGreaterThanOrEqual(5);
      expect(analytics.conversions).toBeGreaterThanOrEqual(1);
      expect(typeof analytics.ctr).toBe('string');
    });

    test('should handle multiple campaigns for same user', () => {
      const userId = 123;

      const campaign1 = { platform: 'instagram', text: 'Ad 1', status: 'active' };
      const campaign2 = { platform: 'facebook', text: 'Ad 2', status: 'paused' };

      CampaignState.addCampaign(userId, campaign1);
      CampaignState.addCampaign(userId, campaign2);

      const campaigns = CampaignState.getCampaigns(userId);
      expect(campaigns).toHaveLength(2);
      expect(campaigns[0].platform).toBe('instagram');
      expect(campaigns[1].platform).toBe('facebook');
    });

    test('should create different campaigns for different users', () => {
      const user1 = 123;
      const user2 = 456;

      const campaign1 = { platform: 'instagram', text: 'User 1 ad', status: 'active' };
      const campaign2 = { platform: 'facebook', text: 'User 2 ad', status: 'active' };

      CampaignState.addCampaign(user1, campaign1);
      CampaignState.addCampaign(user2, campaign2);

      const user1Campaigns = CampaignState.getCampaigns(user1);
      const user2Campaigns = CampaignState.getCampaigns(user2);

      expect(user1Campaigns).toHaveLength(1);
      expect(user2Campaigns).toHaveLength(1);
      expect(user1Campaigns[0].text).toBe('User 1 ad');
      expect(user2Campaigns[0].text).toBe('User 2 ad');
    });
  });

  describe('getCampaigns', () => {
    test('should return empty array for user with no campaigns', () => {
      const campaigns = CampaignState.getCampaigns(999);
      expect(campaigns).toEqual([]);
    });

    test('should return campaigns for existing user', () => {
      const userId = 123;
      const campaign = { platform: 'vk', text: 'Test ad', status: 'active' };

      CampaignState.addCampaign(userId, campaign);

      const campaigns = CampaignState.getCampaigns(userId);
      expect(campaigns).toHaveLength(1);
      expect(campaigns[0].platform).toBe('vk');
      expect(campaigns[0].text).toBe('Test ad');
      expect(campaigns[0].status).toBe('active');
    });
  });

  describe('getAnalytics', () => {
    test('should return undefined for non-existent campaign', () => {
      const analytics = CampaignState.getAnalytics('non-existent-id');
      expect(analytics).toBeUndefined();
    });

    test('should return analytics for existing campaign', () => {
      const userId = 123;
      const campaign = { platform: 'instagram', text: 'Test', status: 'active' };

      const result = CampaignState.addCampaign(userId, campaign);
      const analytics = CampaignState.getAnalytics(result.id);

      expect(analytics).toBeDefined();
      expect(analytics).toHaveProperty('reach');
      expect(analytics).toHaveProperty('engagement');
      expect(analytics).toHaveProperty('clicks');
      expect(analytics).toHaveProperty('conversions');
      expect(analytics).toHaveProperty('ctr');
    });
  });

  describe('getAllAnalytics', () => {
    test('should return empty array for user with no campaigns', () => {
      const analytics = CampaignState.getAllAnalytics(999);
      expect(analytics).toEqual([]);
    });

    test('should return analytics for all user campaigns', () => {
      const userId = 123;

      const campaign1 = { platform: 'instagram', text: 'Ad 1', status: 'active' };
      const campaign2 = { platform: 'facebook', text: 'Ad 2', status: 'active' };

      const result1 = CampaignState.addCampaign(userId, campaign1);
      const result2 = CampaignState.addCampaign(userId, campaign2);

      const allAnalytics = CampaignState.getAllAnalytics(userId);

      expect(allAnalytics).toHaveLength(2);
      expect(allAnalytics[0].campaign.id).toBe(result1.id);
      expect(allAnalytics[0].analytics).toBeDefined();
      expect(allAnalytics[1].campaign.id).toBe(result2.id);
      expect(allAnalytics[1].analytics).toBeDefined();
    });

    test('should return correct structure for analytics data', () => {
      const userId = 123;
      const campaign = { platform: 'instagram', text: 'Test', status: 'active' };

      CampaignState.addCampaign(userId, campaign);

      const allAnalytics = CampaignState.getAllAnalytics(userId);
      
      expect(allAnalytics).toHaveLength(1);
      expect(allAnalytics[0]).toHaveProperty('campaign');
      expect(allAnalytics[0]).toHaveProperty('analytics');
      expect(allAnalytics[0].campaign).toHaveProperty('id');
      expect(allAnalytics[0].campaign).toHaveProperty('platform');
      expect(allAnalytics[0].campaign).toHaveProperty('text');
      expect(allAnalytics[0].campaign).toHaveProperty('status');
      expect(allAnalytics[0].analytics).toHaveProperty('reach');
      expect(allAnalytics[0].analytics).toHaveProperty('engagement');
    });
  });

  describe('Singleton behavior', () => {
    test('should be the same instance across requires', () => {
      const instance1 = require('../src/state');
      const instance2 = require('../src/state');
      
      expect(instance1).toBe(instance2);
      expect(instance1.addCampaign).toBe(instance2.addCampaign);
      expect(instance1.getCampaigns).toBe(instance2.getCampaigns);
    });

    test('should persist data between operations', () => {
      const userId = 123;
      const campaign = { platform: 'twitter', text: 'Persistent ad', status: 'active' };

      // Добавляем кампанию
      CampaignState.addCampaign(userId, campaign);
      
      // Проверяем, что данные сохранились
      const campaigns = CampaignState.getCampaigns(userId);
      expect(campaigns).toHaveLength(1);
      expect(campaigns[0].text).toBe('Persistent ad');

      // Добавляем еще одну и проверяем накопление
      CampaignState.addCampaign(userId, { platform: 'linkedin', text: 'Second ad', status: 'paused' });
      expect(CampaignState.getCampaigns(userId)).toHaveLength(2);
    });
  });

  describe('Edge cases', () => {
    test('should handle adding campaign with missing fields', () => {
      const userId = 123;
      const campaign = { platform: 'instagram' }; // только platform

      const result = CampaignState.addCampaign(userId, campaign);

      expect(result.platform).toBe('instagram');
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
      // Отсутствующие поля должны быть undefined
      expect(result.text).toBeUndefined();
      expect(result.status).toBeUndefined();
    });

    test('should handle very large userId values', () => {
      const largeUserId = 999999999;
      const campaign = { platform: 'facebook', text: 'Large user ad', status: 'active' };

      const result = CampaignState.addCampaign(largeUserId, campaign);
      
      expect(result).toBeDefined();
      expect(CampaignState.getCampaigns(largeUserId)).toHaveLength(1);
    });
  });
});