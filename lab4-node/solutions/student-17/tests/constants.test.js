describe('Constants', () => {
  let constants;

  beforeAll(async() => {
    constants = await import('../src/constants.js');
  });

  describe('PLATFORMS', () => {
    test('should have all platform keys', () => {
      expect(constants.PLATFORMS).toBeDefined();
      expect(constants.PLATFORMS.INSTAGRAM).toBe('instagram');
      expect(constants.PLATFORMS.FACEBOOK).toBe('facebook');
      expect(constants.PLATFORMS.TELEGRAM).toBe('telegram');
      expect(constants.PLATFORMS.VK).toBe('vk');
    });

    test('should have unique values for all platforms', () => {
      const values = Object.values(constants.PLATFORMS);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });
  });

  describe('PLATFORM_RULES', () => {
    test('should have rules for all platforms', () => {
      Object.values(constants.PLATFORMS).forEach(platform => {
        expect(constants.PLATFORM_RULES[platform]).toBeDefined();
      });
    });

    test('should have correct structure for each platform', () => {
      Object.values(constants.PLATFORMS).forEach(platform => {
        const rules = constants.PLATFORM_RULES[platform];
        
        expect(rules).toHaveProperty('maxLength');
        expect(rules).toHaveProperty('hashtagsLimit');
        expect(rules).toHaveProperty('imageRequired');
        
        expect(typeof rules.maxLength).toBe('number');
        expect(typeof rules.hashtagsLimit).toBe('number');
        expect(typeof rules.imageRequired).toBe('boolean');
        
        expect(rules.maxLength).toBeGreaterThan(0);
        expect(rules.hashtagsLimit).toBeGreaterThanOrEqual(0);
      });
    });

    test('should have specific values for each platform', () => {
      expect(constants.PLATFORM_RULES.instagram.maxLength).toBe(2200);
      expect(constants.PLATFORM_RULES.instagram.hashtagsLimit).toBe(30);
      expect(constants.PLATFORM_RULES.instagram.imageRequired).toBe(true);

      expect(constants.PLATFORM_RULES.facebook.maxLength).toBe(5000);
      expect(constants.PLATFORM_RULES.facebook.hashtagsLimit).toBe(10);
      expect(constants.PLATFORM_RULES.facebook.imageRequired).toBe(true);

      expect(constants.PLATFORM_RULES.telegram.maxLength).toBe(4096);
      expect(constants.PLATFORM_RULES.telegram.hashtagsLimit).toBe(20);
      expect(constants.PLATFORM_RULES.telegram.imageRequired).toBe(false);

      expect(constants.PLATFORM_RULES.vk.maxLength).toBe(5000);
      expect(constants.PLATFORM_RULES.vk.hashtagsLimit).toBe(10);
      expect(constants.PLATFORM_RULES.vk.imageRequired).toBe(true);
    });
  });

  describe('AD_TEMPLATES', () => {
    test('should have templates for all platforms', () => {
      Object.values(constants.PLATFORMS).forEach(platform => {
        expect(constants.AD_TEMPLATES[platform]).toBeDefined();
      });
    });

    test('should have correct structure for each template', () => {
      Object.values(constants.PLATFORMS).forEach(platform => {
        const template = constants.AD_TEMPLATES[platform];
        
        expect(template).toHaveProperty('structure');
        expect(template).toHaveProperty('example');
        
        expect(typeof template.structure).toBe('string');
        expect(typeof template.example).toBe('string');
        
        expect(template.structure.length).toBeGreaterThan(0);
        expect(template.example.length).toBeGreaterThan(0);
      });
    });

    test('should have meaningful structure descriptions', () => {
      expect(constants.AD_TEMPLATES.instagram.structure).toContain('→');
      expect(constants.AD_TEMPLATES.facebook.structure).toContain('→');
      expect(constants.AD_TEMPLATES.telegram.structure).toContain('→');
      expect(constants.AD_TEMPLATES.vk.structure).toContain('→');
    });
  });

  describe('Integration', () => {
    test('all constants should be properly exported', () => {
      expect(constants.PLATFORMS).toBeDefined();
      expect(constants.PLATFORM_RULES).toBeDefined();
      expect(constants.AD_TEMPLATES).toBeDefined();
      
      expect(Object.keys(constants.PLATFORMS).length).toBe(4);
      expect(Object.keys(constants.PLATFORM_RULES).length).toBe(4);
      expect(Object.keys(constants.AD_TEMPLATES).length).toBe(4);
    });

    test('platform names should match between PLATFORMS and PLATFORM_RULES', () => {
      const platformNames = Object.values(constants.PLATFORMS);
      const rulesPlatforms = Object.keys(constants.PLATFORM_RULES);
      
      platformNames.forEach(platform => {
        expect(rulesPlatforms).toContain(platform);
      });
    });

    test('platform names should match between PLATFORMS and AD_TEMPLATES', () => {
      const platformNames = Object.values(constants.PLATFORMS);
      const templatePlatforms = Object.keys(constants.AD_TEMPLATES);
      
      platformNames.forEach(platform => {
        expect(templatePlatforms).toContain(platform);
      });
    });
  });
});
