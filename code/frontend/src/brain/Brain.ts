import {
  ChatRequest,
  CheckHealthData,
  GenerateSchemaData,
  GenerateSchemaError,
  GetAdvisorsData,
  GetArticlesData,
  GetCorporateRheinbergDashboardActionsData,
  GetCorporateRheinbergDashboardAiInsightData,
  GetCorporateRheinbergDashboardKpisData,
  GetDashboardActionsData,
  GetDashboardAiInsightData,
  GetDashboardKpisData,
  GetInsightsData,
  GetInsightsError,
  GetInsightsParams,
  GetPersonalDashboardOverviewData,
  GetPremiumContentData,
  GetPremiumContentError,
  GetPremiumContentParams,
  GetSchemaData,
  GetStripePublicKeysData,
  GetStructureDiagramData,
  GetSubscriptionStatusData,
  GetThemeSpecialsData,
  GetThemeSpecialsError,
  GetThemeSpecialsParams,
  HandleOpenaiChatData,
  HandleOpenaiChatError,
  Interaction,
  PersonalDashboardSettingsModel,
  SavePersonalDashboardSettingsData,
  SavePersonalDashboardSettingsError,
  SchemaGenerationRequest,
  StripeWebhookData,
  TestFirestoreData,
  TrackInteractionData,
  TrackInteractionError,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Brain<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   *
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  check_health = (params: RequestParams = {}) =>
    this.request<CheckHealthData, any>({
      path: `/_healthz`,
      method: "GET",
      ...params,
    });

  /**
   * @description Generate schema from Firestore collections
   *
   * @tags dbtn/module:firestore_schema, dbtn/hasAuth
   * @name generate_schema
   * @summary Generate Schema
   * @request POST:/routes/generate-schema
   */
  generate_schema = (data: SchemaGenerationRequest, params: RequestParams = {}) =>
    this.request<GenerateSchemaData, GenerateSchemaError>({
      path: `/routes/generate-schema`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Get the structure diagram from storage
   *
   * @tags dbtn/module:firestore_schema, dbtn/hasAuth
   * @name get_structure_diagram
   * @summary Get Structure Diagram
   * @request GET:/routes/get-structure-diagram
   */
  get_structure_diagram = (params: RequestParams = {}) =>
    this.request<GetStructureDiagramData, any>({
      path: `/routes/get-structure-diagram`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get the latest generated schema from storage
   *
   * @tags dbtn/module:firestore_schema, dbtn/hasAuth
   * @name get_schema
   * @summary Get Schema
   * @request GET:/routes/get-schema
   */
  get_schema = (params: RequestParams = {}) =>
    this.request<GetSchemaData, any>({
      path: `/routes/get-schema`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags dbtn/module:stripe
   * @name stripe_webhook
   * @summary Stripe Webhook
   * @request POST:/routes/webhook
   */
  stripe_webhook = (params: RequestParams = {}) =>
    this.request<StripeWebhookData, any>({
      path: `/routes/webhook`,
      method: "POST",
      ...params,
    });

  /**
   * No description
   *
   * @tags dbtn/module:stripe
   * @name get_subscription_status
   * @summary Get Subscription Status
   * @request GET:/routes/subscription-status
   */
  get_subscription_status = (params: RequestParams = {}) =>
    this.request<GetSubscriptionStatusData, any>({
      path: `/routes/subscription-status`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get public Stripe keys for the frontend
   *
   * @tags dbtn/module:stripe
   * @name get_stripe_public_keys
   * @summary Get Stripe Public Keys
   * @request GET:/routes/public-keys
   */
  get_stripe_public_keys = (params: RequestParams = {}) =>
    this.request<GetStripePublicKeysData, any>({
      path: `/routes/public-keys`,
      method: "GET",
      ...params,
    });

  /**
   * @description Test writing to Firestore
   *
   * @tags dbtn/module:stripe
   * @name test_firestore
   * @summary Test Firestore
   * @request GET:/routes/test-firestore
   */
  test_firestore = (params: RequestParams = {}) =>
    this.request<TestFirestoreData, any>({
      path: `/routes/test-firestore`,
      method: "GET",
      ...params,
    });

  /**
   * @description Retrieves a list of sample financial articles. This endpoint is public and does not require authentication.
   *
   * @tags dbtn/module:audio_articles
   * @name get_articles
   * @summary Get Articles
   * @request GET:/routes/articles
   */
  get_articles = (params: RequestParams = {}) =>
    this.request<GetArticlesData, any>({
      path: `/routes/articles`,
      method: "GET",
      ...params,
    });

  /**
   * @description MVP-Version: Receives a prompt, processes it with Rheinberg Privatbank context and demo user profile, streams the response.
   *
   * @tags stream, dbtn/module:openai_chat, dbtn/hasAuth
   * @name handle_openai_chat
   * @summary Handle Openai Chat
   * @request POST:/routes/openai-chat
   */
  handle_openai_chat = (data: ChatRequest, params: RequestParams = {}) =>
    this.requestStream<HandleOpenaiChatData, HandleOpenaiChatError>({
      path: `/routes/openai-chat`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Simulates fetching general insights, filtered by user criteria.
   *
   * @tags dbtn/module:insights_feed, dbtn/hasAuth
   * @name get_insights
   * @summary Get Insights
   * @request GET:/routes/api/insights
   */
  get_insights = (query: GetInsightsParams, params: RequestParams = {}) =>
    this.request<GetInsightsData, GetInsightsError>({
      path: `/routes/api/insights`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Simulates fetching theme specials based on user preferences.
   *
   * @tags dbtn/module:insights_feed, dbtn/hasAuth
   * @name get_theme_specials
   * @summary Get Theme Specials
   * @request GET:/routes/api/theme-specials
   */
  get_theme_specials = (query: GetThemeSpecialsParams, params: RequestParams = {}) =>
    this.request<GetThemeSpecialsData, GetThemeSpecialsError>({
      path: `/routes/api/theme-specials`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Simulates fetching premium content.
   *
   * @tags dbtn/module:insights_feed, dbtn/hasAuth
   * @name get_premium_content
   * @summary Get Premium Content
   * @request GET:/routes/api/premium-content
   */
  get_premium_content = (query: GetPremiumContentParams, params: RequestParams = {}) =>
    this.request<GetPremiumContentData, GetPremiumContentError>({
      path: `/routes/api/premium-content`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Simulates tracking a user interaction.
   *
   * @tags dbtn/module:insights_feed, dbtn/hasAuth
   * @name track_interaction
   * @summary Track Interaction
   * @request POST:/routes/api/track-interaction
   */
  track_interaction = (data: Interaction, params: RequestParams = {}) =>
    this.request<TrackInteractionData, TrackInteractionError>({
      path: `/routes/api/track-interaction`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Get dashboard KPI metrics. Returns key performance indicators including assets under advisory, active clients, conversion rate, and year-to-date growth. Protected endpoint - requires authentication.
   *
   * @tags dbtn/module:dashboard
   * @name get_dashboard_kpis
   * @summary Get Dashboard Kpis
   * @request GET:/routes/kpis
   */
  get_dashboard_kpis = (params: RequestParams = {}) =>
    this.request<GetDashboardKpisData, any>({
      path: `/routes/kpis`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get dashboard action items. Returns list of pending actions, follow-ups, and tasks with priorities and deadlines. Protected endpoint - requires authentication.
   *
   * @tags dbtn/module:dashboard
   * @name get_dashboard_actions
   * @summary Get Dashboard Actions
   * @request GET:/routes/actions
   */
  get_dashboard_actions = (params: RequestParams = {}) =>
    this.request<GetDashboardActionsData, any>({
      path: `/routes/actions`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get AI-generated insights and recommendations. Returns personalized insights based on client data, trends, and recommended actions for advisors. Protected endpoint - requires authentication.
   *
   * @tags dbtn/module:dashboard
   * @name get_dashboard_ai_insight
   * @summary Get Dashboard Ai Insight
   * @request GET:/routes/ai-insight
   */
  get_dashboard_ai_insight = (params: RequestParams = {}) =>
    this.request<GetDashboardAiInsightData, any>({
      path: `/routes/ai-insight`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get corporate dashboard KPIs for Rheinberg Privatbank. Returns 5 banking-specific KPIs including NPS and ESG metrics. Protected endpoint - requires authentication.
   *
   * @tags dbtn/module:dashboard
   * @name get_corporate_rheinberg_dashboard_kpis
   * @summary Get Corporate Rheinberg Dashboard Kpis
   * @request GET:/routes/corporate/rheinberg/kpis
   */
  get_corporate_rheinberg_dashboard_kpis = (params: RequestParams = {}) =>
    this.request<GetCorporateRheinbergDashboardKpisData, any>({
      path: `/routes/corporate/rheinberg/kpis`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get corporate dashboard action items for Rheinberg Privatbank. Returns banking-specific actions including MiFID, KYC, ESG tasks. Protected endpoint - requires authentication.
   *
   * @tags dbtn/module:dashboard
   * @name get_corporate_rheinberg_dashboard_actions
   * @summary Get Corporate Rheinberg Dashboard Actions
   * @request GET:/routes/corporate/rheinberg/actions
   */
  get_corporate_rheinberg_dashboard_actions = (params: RequestParams = {}) =>
    this.request<GetCorporateRheinbergDashboardActionsData, any>({
      path: `/routes/corporate/rheinberg/actions`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get AI-generated insights for Rheinberg Privatbank corporate dashboard. Returns corporate-specific insights and recommendations. Protected endpoint - requires authentication.
   *
   * @tags dbtn/module:dashboard
   * @name get_corporate_rheinberg_dashboard_ai_insight
   * @summary Get Corporate Rheinberg Dashboard Ai Insight
   * @request GET:/routes/corporate/rheinberg/ai-insight
   */
  get_corporate_rheinberg_dashboard_ai_insight = (params: RequestParams = {}) =>
    this.request<GetCorporateRheinbergDashboardAiInsightData, any>({
      path: `/routes/corporate/rheinberg/ai-insight`,
      method: "GET",
      ...params,
    });

  /**
   * @description Gibt eine Liste der Finanzexperten zurück.
   *
   * @tags dbtn/module:advisors
   * @name get_advisors
   * @summary Get Advisors
   * @request GET:/routes/advisors
   */
  get_advisors = (params: RequestParams = {}) =>
    this.request<GetAdvisorsData, any>({
      path: `/routes/advisors`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get complete personal dashboard overview for the authenticated advisor.
   *
   * @tags dashboard-personal, dbtn/module:personal_dashboard, dbtn/hasAuth
   * @name get_personal_dashboard_overview
   * @summary Get Personal Dashboard Overview
   * @request GET:/routes/api/dashboard/personal/overview
   */
  get_personal_dashboard_overview = (params: RequestParams = {}) =>
    this.request<GetPersonalDashboardOverviewData, any>({
      path: `/routes/api/dashboard/personal/overview`,
      method: "GET",
      ...params,
    });

  /**
   * @description Save personal dashboard settings for the authenticated user. Currently returns a dummy response. Future implementation will save to Firestore using user.sub as the document ID. Protected endpoint - requires authentication.
   *
   * @tags dashboard-personal, dbtn/module:personal_dashboard, dbtn/hasAuth
   * @name save_personal_dashboard_settings
   * @summary Save Personal Dashboard Settings
   * @request POST:/routes/api/dashboard/personal/settings
   */
  save_personal_dashboard_settings = (data: PersonalDashboardSettingsModel, params: RequestParams = {}) =>
    this.request<SavePersonalDashboardSettingsData, SavePersonalDashboardSettingsError>({
      path: `/routes/api/dashboard/personal/settings`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
