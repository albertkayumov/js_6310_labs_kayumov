class CampaignState {
  constructor() {
    this.userCampaigns = new Map();
    this.analyticsData = new Map();
  }

  addCampaign(userId, campaign) {
    if (!this.userCampaigns.has(userId)) {
      this.userCampaigns.set(userId, []);
    }
    
    const campaignWithId = {
      id: Date.now().toString(),
      createdAt: new Date(),
      ...campaign
    };
    
    this.userCampaigns.get(userId).push(campaignWithId);
    this.initializeAnalytics(campaignWithId.id);
    
    return campaignWithId;
  }

  getCampaigns(userId) {
    return this.userCampaigns.get(userId) || [];
  }

  initializeAnalytics(campaignId) {
    this.analyticsData.set(campaignId, {
      reach: Math.floor(Math.random() * 1000) + 100,
      engagement: Math.floor(Math.random() * 100) + 10,
      clicks: Math.floor(Math.random() * 50) + 5,
      conversions: Math.floor(Math.random() * 20) + 1,
      ctr: (Math.random() * 10).toFixed(2)
    });
  }

  getAnalytics(campaignId) {
    return this.analyticsData.get(campaignId);
  }

  getAllAnalytics(userId) {
    const campaigns = this.getCampaigns(userId);
    return campaigns.map(campaign => ({
      campaign,
      analytics: this.getAnalytics(campaign.id)
    }));
  }
}

// Экспортируем экземпляр как синглтон
module.exports = new CampaignState();
