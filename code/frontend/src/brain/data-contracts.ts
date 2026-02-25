/**
 * ActionItem
 * Individual action item model.
 */
export interface ActionItem {
  /** Id */
  id: string;
  /** Title */
  title: string;
  /** Description */
  description: string;
  /** Priority */
  priority: "high" | "medium" | "low";
  /** Deadline */
  deadline: string;
  /** Category */
  category: string;
  /** Clientname */
  clientName?: string | null;
  /** Status */
  status: "pending" | "in_progress" | "completed";
}

/** Advisor */
export interface Advisor {
  /** Id */
  id: string;
  /** Name */
  name: string;
  /** Title */
  title: string;
  /** Bank */
  bank: string;
  /** Location */
  location: string;
  /** Avatarurl */
  avatarUrl: string;
  /** Banklogourl */
  bankLogoUrl: string;
  /** Premium */
  premium: boolean;
  /**
   * Tags
   * @default []
   */
  tags?: string[];
  /** Focusareas */
  focusAreas: string[];
  /** Languages */
  languages?: string[] | null;
  /** Gender */
  gender?: string | null;
  /** Seniority */
  seniority?: string | null;
  /** Certifications */
  certifications?: string[] | null;
  /** Clienttargets */
  clientTargets?: string[] | null;
}

/**
 * AiInsightItem
 * Individual AI insight item.
 */
export interface AiInsightItem {
  /** Type */
  type: "opportunity" | "trend" | "risk" | "recommendation";
  /** Title */
  title: string;
  /** Description */
  description: string;
  /** Confidence */
  confidence: number;
  /** Actionlabel */
  actionLabel: string;
}

/**
 * Article
 * Represents a financial article with optional audio snippets.
 */
export interface Article {
  /** Id */
  id: number;
  /** Title */
  title: string;
  /** Author */
  author: string;
  /** Publication Date */
  publication_date: string;
  /** Summary */
  summary: string;
  /** Cover Image Url */
  cover_image_url: string;
  /**
   * Snippets
   * @default []
   */
  snippets?: AudioSnippet[];
}

/**
 * AudioSnippet
 * Represents a single audio snippet linked to an article.
 */
export interface AudioSnippet {
  /** Id */
  id: number;
  /** Title */
  title: string;
  /** Url */
  url: string;
  /** Duration Seconds */
  duration_seconds: number;
}

/** ChatMessage */
export interface ChatMessage {
  /** Role */
  role: string;
  /** Content */
  content: string;
}

/** ChatRequest */
export interface ChatRequest {
  /** Prompt */
  prompt: string;
  /**
   * History
   * @default []
   */
  history?: ChatMessage[];
}

/** ClientHighlight */
export interface ClientHighlight {
  /** Name */
  name: string;
  /** Status */
  status: string;
  /** Lastcontact */
  lastContact: string;
  /** Nextstep */
  nextStep: string;
}

/**
 * CorporateDashboardKpisResponse
 * Response model for corporate KPI endpoint with 5 KPIs.
 */
export interface CorporateDashboardKpisResponse {
  /** Individual KPI metric model for corporate dashboard. */
  assetsUnderAdvisory: CorporateKpiMetric;
  /** Individual KPI metric model for corporate dashboard. */
  premiumClients: CorporateKpiMetric;
  /** Individual KPI metric model for corporate dashboard. */
  conversionRate: CorporateKpiMetric;
  /** Individual KPI metric model for corporate dashboard. */
  clientSatisfaction: CorporateKpiMetric;
  /** Individual KPI metric model for corporate dashboard. */
  esgQuote: CorporateKpiMetric;
  /** Period */
  period: string;
  /** Lastupdated */
  lastUpdated: string;
}

/**
 * CorporateKpiMetric
 * Individual KPI metric model for corporate dashboard.
 */
export interface CorporateKpiMetric {
  /** Value */
  value: number;
  /** Changepercentage */
  changePercentage: number;
  /** Trend */
  trend: "up" | "down" | "stable";
  /** Previousvalue */
  previousValue: number;
  /** Currency */
  currency?: string | null;
}

/**
 * DashboardActionsResponse
 * Response model for actions endpoint.
 */
export interface DashboardActionsResponse {
  /** Actions */
  actions: ActionItem[];
  /** Totalcount */
  totalCount: number;
  /** Pendingcount */
  pendingCount: number;
  /** Highprioritycount */
  highPriorityCount: number;
}

/**
 * DashboardAiInsightResponse
 * Response model for AI insights endpoint.
 */
export interface DashboardAiInsightResponse {
  /** Summary */
  summary: string;
  /** Insights */
  insights: AiInsightItem[];
  /** Recommendedactions */
  recommendedActions: string[];
  /** Generatedat */
  generatedAt: string;
  /** Model */
  model: string;
}

/**
 * DashboardKpisResponse
 * Response model for KPI endpoint.
 */
export interface DashboardKpisResponse {
  /** Individual KPI metric model. */
  assetsUnderAdvisory: KpiMetric;
  /** Individual KPI metric model. */
  activeClients: KpiMetric;
  /** Individual KPI metric model. */
  conversionRate: KpiMetric;
  /** Individual KPI metric model. */
  ytdGrowth: KpiMetric;
  /** Period */
  period: string;
  /** Lastupdated */
  lastUpdated: string;
}

/** DevelopmentItem */
export interface DevelopmentItem {
  /** Title */
  title: string;
  /** Provider */
  provider?: string | null;
  /** Status */
  status: string;
}

/** Favorite */
export interface Favorite {
  /** Title */
  title: string;
  /** Type */
  type: string;
  /** Link */
  link: string;
}

/** Goal */
export interface Goal {
  /** Label */
  label: string;
  /** Target */
  target: string;
  /** Progress */
  progress: number;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** HealthResponse */
export interface HealthResponse {
  /** Status */
  status: string;
}

/** Insight */
export interface Insight {
  /** Id */
  id: string;
  /** Title */
  title: string;
  /** Category */
  category: string;
  /** Summary */
  summary: string;
  /** Image */
  image: string;
  /** Ispremium */
  isPremium: boolean;
  /** Hasaudio */
  hasAudio: boolean;
  /** Tags */
  tags?: string[] | null;
}

/** Interaction */
export interface Interaction {
  /** Contentid */
  contentId: string;
  /** Interactiontype */
  interactionType: string;
  /** Timestamp */
  timestamp: string;
  /** Additionaldata */
  additionalData?: Record<string, any> | null;
}

/**
 * KpiMetric
 * Individual KPI metric model.
 */
export interface KpiMetric {
  /** Value */
  value: number;
  /** Changepercentage */
  changePercentage: number;
  /** Trend */
  trend: "up" | "down" | "stable";
  /** Previousvalue */
  previousValue: number;
  /** Currency */
  currency?: string | null;
}

/** PersonalDashboardResponse */
export interface PersonalDashboardResponse {
  user: UserInfo;
  /** Weeklyfocus */
  weeklyFocus: string[];
  /** Personalrecommendations */
  personalRecommendations: PersonalRecommendation[];
  /** Lastupdated */
  lastUpdated: string;
  /** Goals */
  goals: Goal[];
  /** Clienthighlights */
  clientHighlights: ClientHighlight[];
  /** Favorites */
  favorites: Favorite[];
  /** Schedule */
  schedule: ScheduleItem[];
  /** Development */
  development: DevelopmentItem[];
}

/**
 * PersonalDashboardSettingsModel
 * Model for personal dashboard user settings.
 */
export interface PersonalDashboardSettingsModel {
  /** Investment Focus */
  investment_focus: "traditional" | "esg" | "alternatives" | "mixed";
  /** Content Frequency */
  content_frequency: "daily" | "weekly" | "monthly";
  /** Preferred Formats */
  preferred_formats: ("reports" | "briefings" | "events" | "audio")[];
  /** Notifications Enabled */
  notifications_enabled: boolean;
  /** Ai Tone */
  ai_tone: "conservative" | "balanced" | "progressive";
}

/** PersonalRecommendation */
export interface PersonalRecommendation {
  /** Title */
  title: string;
  /** Description */
  description: string;
  /** Actionlabel */
  actionLabel: string;
}

/** ScheduleItem */
export interface ScheduleItem {
  /** Title */
  title: string;
  /** Datetime */
  datetime: string;
  /** Type */
  type?: string | null;
}

/** SchemaGenerationRequest */
export interface SchemaGenerationRequest {
  /** Collections */
  collections?: string[] | null;
  /**
   * Depth
   * @default 3
   */
  depth?: number;
  /**
   * Sample Limit
   * @default 10
   */
  sample_limit?: number;
}

/** SchemaGenerationResponse */
export interface SchemaGenerationResponse {
  /** Status */
  status: string;
  /** Schema Data */
  schema_data: Record<string, any>;
  /** Message */
  message: string;
}

/** StripePublicKeysResponse */
export interface StripePublicKeysResponse {
  /** Publishable Key */
  publishable_key: string;
  /** Pricing Table Id */
  pricing_table_id: string;
}

/** SubscriptionStatusResponse */
export interface SubscriptionStatusResponse {
  /** Has Subscription */
  has_subscription: boolean;
  /**
   * Status
   * @default ""
   */
  status?: string;
  /**
   * Plan
   * @default ""
   */
  plan?: string;
}

/** TestFirestoreResponse */
export interface TestFirestoreResponse {
  /** Success */
  success: boolean;
  /** Message */
  message: string;
  /** Timestamp */
  timestamp: string;
}

/** UserInfo */
export interface UserInfo {
  /** Fullname */
  fullName: string;
  /** Role */
  role: string;
  /** Segments */
  segments: string[];
  /** Nextmeeting */
  nextMeeting?: string | null;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type CheckHealthData = HealthResponse;

export type GenerateSchemaData = SchemaGenerationResponse;

export type GenerateSchemaError = HTTPValidationError;

/** Response Get Structure Diagram */
export type GetStructureDiagramData = Record<string, any>;

/** Response Get Schema */
export type GetSchemaData = Record<string, any>;

export type StripeWebhookData = any;

export type GetSubscriptionStatusData = SubscriptionStatusResponse;

export type GetStripePublicKeysData = StripePublicKeysResponse;

export type TestFirestoreData = TestFirestoreResponse;

/** Response Get Articles */
export type GetArticlesData = Article[];

export type HandleOpenaiChatData = any;

export type HandleOpenaiChatError = HTTPValidationError;

export interface GetInsightsParams {
  /** Userid */
  userId: string;
  /** Region */
  region: string;
  /** Sector */
  sector: string;
  /** Timeframe */
  timeframe: string;
}

/** Response Get Insights */
export type GetInsightsData = Insight[];

export type GetInsightsError = HTTPValidationError;

export interface GetThemeSpecialsParams {
  /** Userid */
  userId: string;
}

/** Response Get Theme Specials */
export type GetThemeSpecialsData = Insight[];

export type GetThemeSpecialsError = HTTPValidationError;

export interface GetPremiumContentParams {
  /** Userid */
  userId: string;
}

/** Response Get Premium Content */
export type GetPremiumContentData = Insight[];

export type GetPremiumContentError = HTTPValidationError;

export type TrackInteractionData = any;

export type TrackInteractionError = HTTPValidationError;

export type GetDashboardKpisData = DashboardKpisResponse;

export type GetDashboardActionsData = DashboardActionsResponse;

export type GetDashboardAiInsightData = DashboardAiInsightResponse;

export type GetCorporateRheinbergDashboardKpisData = CorporateDashboardKpisResponse;

export type GetCorporateRheinbergDashboardActionsData = DashboardActionsResponse;

export type GetCorporateRheinbergDashboardAiInsightData = DashboardAiInsightResponse;

/** Response Get Advisors */
export type GetAdvisorsData = Advisor[];

export type GetPersonalDashboardOverviewData = PersonalDashboardResponse;

/** Response Save Personal Dashboard Settings */
export type SavePersonalDashboardSettingsData = Record<string, any>;

export type SavePersonalDashboardSettingsError = HTTPValidationError;
