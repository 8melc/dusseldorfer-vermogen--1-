import {
  ChatRequest,
  CheckHealthData,
  GenerateSchemaData,
  GetAdvisorsData,
  GetArticlesData,
  GetCorporateRheinbergDashboardActionsData,
  GetCorporateRheinbergDashboardAiInsightData,
  GetCorporateRheinbergDashboardKpisData,
  GetDashboardActionsData,
  GetDashboardAiInsightData,
  GetDashboardKpisData,
  GetInsightsData,
  GetPersonalDashboardOverviewData,
  GetPremiumContentData,
  GetSchemaData,
  GetStripePublicKeysData,
  GetStructureDiagramData,
  GetSubscriptionStatusData,
  GetThemeSpecialsData,
  HandleOpenaiChatData,
  Interaction,
  PersonalDashboardSettingsModel,
  SavePersonalDashboardSettingsData,
  SchemaGenerationRequest,
  StripeWebhookData,
  TestFirestoreData,
  TrackInteractionData,
} from "./data-contracts";

export namespace Brain {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  export namespace check_health {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CheckHealthData;
  }

  /**
   * @description Generate schema from Firestore collections
   * @tags dbtn/module:firestore_schema, dbtn/hasAuth
   * @name generate_schema
   * @summary Generate Schema
   * @request POST:/routes/generate-schema
   */
  export namespace generate_schema {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SchemaGenerationRequest;
    export type RequestHeaders = {};
    export type ResponseBody = GenerateSchemaData;
  }

  /**
   * @description Get the structure diagram from storage
   * @tags dbtn/module:firestore_schema, dbtn/hasAuth
   * @name get_structure_diagram
   * @summary Get Structure Diagram
   * @request GET:/routes/get-structure-diagram
   */
  export namespace get_structure_diagram {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetStructureDiagramData;
  }

  /**
   * @description Get the latest generated schema from storage
   * @tags dbtn/module:firestore_schema, dbtn/hasAuth
   * @name get_schema
   * @summary Get Schema
   * @request GET:/routes/get-schema
   */
  export namespace get_schema {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetSchemaData;
  }

  /**
   * No description
   * @tags dbtn/module:stripe
   * @name stripe_webhook
   * @summary Stripe Webhook
   * @request POST:/routes/webhook
   */
  export namespace stripe_webhook {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = StripeWebhookData;
  }

  /**
   * No description
   * @tags dbtn/module:stripe
   * @name get_subscription_status
   * @summary Get Subscription Status
   * @request GET:/routes/subscription-status
   */
  export namespace get_subscription_status {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetSubscriptionStatusData;
  }

  /**
   * @description Get public Stripe keys for the frontend
   * @tags dbtn/module:stripe
   * @name get_stripe_public_keys
   * @summary Get Stripe Public Keys
   * @request GET:/routes/public-keys
   */
  export namespace get_stripe_public_keys {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetStripePublicKeysData;
  }

  /**
   * @description Test writing to Firestore
   * @tags dbtn/module:stripe
   * @name test_firestore
   * @summary Test Firestore
   * @request GET:/routes/test-firestore
   */
  export namespace test_firestore {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TestFirestoreData;
  }

  /**
   * @description Retrieves a list of sample financial articles. This endpoint is public and does not require authentication.
   * @tags dbtn/module:audio_articles
   * @name get_articles
   * @summary Get Articles
   * @request GET:/routes/articles
   */
  export namespace get_articles {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetArticlesData;
  }

  /**
   * @description MVP-Version: Receives a prompt, processes it with Rheinberg Privatbank context and demo user profile, streams the response.
   * @tags stream, dbtn/module:openai_chat, dbtn/hasAuth
   * @name handle_openai_chat
   * @summary Handle Openai Chat
   * @request POST:/routes/openai-chat
   */
  export namespace handle_openai_chat {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChatRequest;
    export type RequestHeaders = {};
    export type ResponseBody = HandleOpenaiChatData;
  }

  /**
   * @description Simulates fetching general insights, filtered by user criteria.
   * @tags dbtn/module:insights_feed, dbtn/hasAuth
   * @name get_insights
   * @summary Get Insights
   * @request GET:/routes/api/insights
   */
  export namespace get_insights {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Userid */
      userId: string;
      /** Region */
      region: string;
      /** Sector */
      sector: string;
      /** Timeframe */
      timeframe: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetInsightsData;
  }

  /**
   * @description Simulates fetching theme specials based on user preferences.
   * @tags dbtn/module:insights_feed, dbtn/hasAuth
   * @name get_theme_specials
   * @summary Get Theme Specials
   * @request GET:/routes/api/theme-specials
   */
  export namespace get_theme_specials {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Userid */
      userId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetThemeSpecialsData;
  }

  /**
   * @description Simulates fetching premium content.
   * @tags dbtn/module:insights_feed, dbtn/hasAuth
   * @name get_premium_content
   * @summary Get Premium Content
   * @request GET:/routes/api/premium-content
   */
  export namespace get_premium_content {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Userid */
      userId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPremiumContentData;
  }

  /**
   * @description Simulates tracking a user interaction.
   * @tags dbtn/module:insights_feed, dbtn/hasAuth
   * @name track_interaction
   * @summary Track Interaction
   * @request POST:/routes/api/track-interaction
   */
  export namespace track_interaction {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = Interaction;
    export type RequestHeaders = {};
    export type ResponseBody = TrackInteractionData;
  }

  /**
   * @description Get dashboard KPI metrics. Returns key performance indicators including assets under advisory, active clients, conversion rate, and year-to-date growth. Protected endpoint - requires authentication.
   * @tags dbtn/module:dashboard
   * @name get_dashboard_kpis
   * @summary Get Dashboard Kpis
   * @request GET:/routes/kpis
   */
  export namespace get_dashboard_kpis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetDashboardKpisData;
  }

  /**
   * @description Get dashboard action items. Returns list of pending actions, follow-ups, and tasks with priorities and deadlines. Protected endpoint - requires authentication.
   * @tags dbtn/module:dashboard
   * @name get_dashboard_actions
   * @summary Get Dashboard Actions
   * @request GET:/routes/actions
   */
  export namespace get_dashboard_actions {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetDashboardActionsData;
  }

  /**
   * @description Get AI-generated insights and recommendations. Returns personalized insights based on client data, trends, and recommended actions for advisors. Protected endpoint - requires authentication.
   * @tags dbtn/module:dashboard
   * @name get_dashboard_ai_insight
   * @summary Get Dashboard Ai Insight
   * @request GET:/routes/ai-insight
   */
  export namespace get_dashboard_ai_insight {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetDashboardAiInsightData;
  }

  /**
   * @description Get corporate dashboard KPIs for Rheinberg Privatbank. Returns 5 banking-specific KPIs including NPS and ESG metrics. Protected endpoint - requires authentication.
   * @tags dbtn/module:dashboard
   * @name get_corporate_rheinberg_dashboard_kpis
   * @summary Get Corporate Rheinberg Dashboard Kpis
   * @request GET:/routes/corporate/rheinberg/kpis
   */
  export namespace get_corporate_rheinberg_dashboard_kpis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCorporateRheinbergDashboardKpisData;
  }

  /**
   * @description Get corporate dashboard action items for Rheinberg Privatbank. Returns banking-specific actions including MiFID, KYC, ESG tasks. Protected endpoint - requires authentication.
   * @tags dbtn/module:dashboard
   * @name get_corporate_rheinberg_dashboard_actions
   * @summary Get Corporate Rheinberg Dashboard Actions
   * @request GET:/routes/corporate/rheinberg/actions
   */
  export namespace get_corporate_rheinberg_dashboard_actions {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCorporateRheinbergDashboardActionsData;
  }

  /**
   * @description Get AI-generated insights for Rheinberg Privatbank corporate dashboard. Returns corporate-specific insights and recommendations. Protected endpoint - requires authentication.
   * @tags dbtn/module:dashboard
   * @name get_corporate_rheinberg_dashboard_ai_insight
   * @summary Get Corporate Rheinberg Dashboard Ai Insight
   * @request GET:/routes/corporate/rheinberg/ai-insight
   */
  export namespace get_corporate_rheinberg_dashboard_ai_insight {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCorporateRheinbergDashboardAiInsightData;
  }

  /**
   * @description Gibt eine Liste der Finanzexperten zurück.
   * @tags dbtn/module:advisors
   * @name get_advisors
   * @summary Get Advisors
   * @request GET:/routes/advisors
   */
  export namespace get_advisors {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAdvisorsData;
  }

  /**
   * @description Get complete personal dashboard overview for the authenticated advisor.
   * @tags dashboard-personal, dbtn/module:personal_dashboard, dbtn/hasAuth
   * @name get_personal_dashboard_overview
   * @summary Get Personal Dashboard Overview
   * @request GET:/routes/api/dashboard/personal/overview
   */
  export namespace get_personal_dashboard_overview {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPersonalDashboardOverviewData;
  }

  /**
   * @description Save personal dashboard settings for the authenticated user. Currently returns a dummy response. Future implementation will save to Firestore using user.sub as the document ID. Protected endpoint - requires authentication.
   * @tags dashboard-personal, dbtn/module:personal_dashboard, dbtn/hasAuth
   * @name save_personal_dashboard_settings
   * @summary Save Personal Dashboard Settings
   * @request POST:/routes/api/dashboard/personal/settings
   */
  export namespace save_personal_dashboard_settings {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PersonalDashboardSettingsModel;
    export type RequestHeaders = {};
    export type ResponseBody = SavePersonalDashboardSettingsData;
  }
}
