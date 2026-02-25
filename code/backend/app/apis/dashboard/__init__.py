"""Dashboard API

Provides endpoints for dashboard data including KPIs, actions, and AI insights.
Currently returns dummy data for MVP; will be connected to real data sources later.
"""

from fastapi import APIRouter
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict, Any, Literal
from app.auth import AuthorizedUser
from app.libs.dashboard_data import (
    get_dummy_kpis,
    get_dummy_actions,
    get_dummy_ai_insight
)
from app.libs.corporate_rheinberg_data import (
    get_corporate_rheinberg_kpis,
    get_corporate_rheinberg_actions,
    get_corporate_rheinberg_ai_insight
)

router = APIRouter()


# Pydantic Models for Response Structure

class KpiMetric(BaseModel):
    """Individual KPI metric model."""
    model_config = ConfigDict(populate_by_name=True)
    
    value: float
    change_percentage: float = Field(alias="changePercentage")
    trend: Literal["up", "down", "stable"]
    previous_value: float = Field(alias="previousValue")
    currency: str | None = Field(default=None)


class DashboardKpisResponse(BaseModel):
    """Response model for KPI endpoint."""
    model_config = ConfigDict(populate_by_name=True)
    
    assets_under_advisory: KpiMetric = Field(alias="assetsUnderAdvisory")
    active_clients: KpiMetric = Field(alias="activeClients")
    conversion_rate: KpiMetric = Field(alias="conversionRate")
    ytd_growth: KpiMetric = Field(alias="ytdGrowth")
    period: str
    last_updated: str = Field(alias="lastUpdated")


class ActionItem(BaseModel):
    """Individual action item model."""
    model_config = ConfigDict(populate_by_name=True)
    
    id: str
    title: str
    description: str
    priority: Literal["high", "medium", "low"]
    deadline: str
    category: str
    client_name: str | None = Field(default=None, alias="clientName")
    status: Literal["pending", "in_progress", "completed"]


class DashboardActionsResponse(BaseModel):
    """Response model for actions endpoint."""
    model_config = ConfigDict(populate_by_name=True)
    
    actions: List[ActionItem]
    total_count: int = Field(alias="totalCount")
    pending_count: int = Field(alias="pendingCount")
    high_priority_count: int = Field(alias="highPriorityCount")


class AiInsightItem(BaseModel):
    """Individual AI insight item."""
    model_config = ConfigDict(populate_by_name=True)
    
    type: Literal["opportunity", "trend", "risk", "recommendation"]
    title: str
    description: str
    confidence: float
    action_label: str = Field(alias="actionLabel")


class DashboardAiInsightResponse(BaseModel):
    """Response model for AI insights endpoint."""
    model_config = ConfigDict(populate_by_name=True)
    
    summary: str
    insights: List[AiInsightItem]
    recommended_actions: List[str] = Field(alias="recommendedActions")
    generated_at: str = Field(alias="generatedAt")
    model: str


# API Endpoints

@router.get("/kpis", response_model=DashboardKpisResponse)
async def get_dashboard_kpis(user: AuthorizedUser) -> DashboardKpisResponse:
    """Get dashboard KPI metrics.
    
    Returns key performance indicators including assets under advisory,
    active clients, conversion rate, and year-to-date growth.
    
    Protected endpoint - requires authentication.
    """
    data = get_dummy_kpis()
    return DashboardKpisResponse(**data)


@router.get("/actions", response_model=DashboardActionsResponse)
async def get_dashboard_actions(user: AuthorizedUser) -> DashboardActionsResponse:
    """Get dashboard action items.
    
    Returns list of pending actions, follow-ups, and tasks with priorities
    and deadlines.
    
    Protected endpoint - requires authentication.
    """
    actions_data = get_dummy_actions()
    
    # Calculate statistics
    total_count = len(actions_data)
    pending_count = sum(1 for a in actions_data if a["status"] == "pending")
    high_priority_count = sum(1 for a in actions_data if a["priority"] == "high")
    
    return DashboardActionsResponse(
        actions=[ActionItem(**action) for action in actions_data],
        total_count=total_count,
        pending_count=pending_count,
        high_priority_count=high_priority_count
    )


@router.get("/ai-insight", response_model=DashboardAiInsightResponse)
async def get_dashboard_ai_insight(user: AuthorizedUser) -> DashboardAiInsightResponse:
    """Get AI-generated insights and recommendations.
    
    Returns personalized insights based on client data, trends, and
    recommended actions for advisors.
    
    Protected endpoint - requires authentication.
    """
    data = get_dummy_ai_insight()
    return DashboardAiInsightResponse(**data)

# Corporate Pydantic Models

class CorporateKpiMetric(BaseModel):
    """Individual KPI metric model for corporate dashboard."""
    model_config = ConfigDict(populate_by_name=True)
    
    value: float
    change_percentage: float = Field(alias="changePercentage")
    trend: Literal["up", "down", "stable"]
    previous_value: float = Field(alias="previousValue")
    currency: str | None = Field(default=None)


class CorporateDashboardKpisResponse(BaseModel):
    """Response model for corporate KPI endpoint with 5 KPIs."""
    model_config = ConfigDict(populate_by_name=True)
    
    assets_under_advisory: CorporateKpiMetric = Field(alias="assetsUnderAdvisory")
    premium_clients: CorporateKpiMetric = Field(alias="premiumClients")
    conversion_rate: CorporateKpiMetric = Field(alias="conversionRate")
    client_satisfaction: CorporateKpiMetric = Field(alias="clientSatisfaction")
    esg_quote: CorporateKpiMetric = Field(alias="esgQuote")
    period: str
    last_updated: str = Field(alias="lastUpdated")


# Corporate API Endpoints

@router.get("/corporate/rheinberg/kpis")
async def get_corporate_rheinberg_dashboard_kpis(
    user: AuthorizedUser
) -> CorporateDashboardKpisResponse:
    """
    Get corporate dashboard KPIs for Rheinberg Privatbank.
    Returns 5 banking-specific KPIs including NPS and ESG metrics.
    Protected endpoint - requires authentication.
    """
    data = get_corporate_rheinberg_kpis()
    return CorporateDashboardKpisResponse(**data)


@router.get("/corporate/rheinberg/actions")
async def get_corporate_rheinberg_dashboard_actions(
    user: AuthorizedUser
) -> DashboardActionsResponse:
    """
    Get corporate dashboard action items for Rheinberg Privatbank.
    Returns banking-specific actions including MiFID, KYC, ESG tasks.
    Protected endpoint - requires authentication.
    """
    data = get_corporate_rheinberg_actions()
    return DashboardActionsResponse(**data)


@router.get("/corporate/rheinberg/ai-insight")
async def get_corporate_rheinberg_dashboard_ai_insight(
    user: AuthorizedUser
) -> DashboardAiInsightResponse:
    """
    Get AI-generated insights for Rheinberg Privatbank corporate dashboard.
    Returns corporate-specific insights and recommendations.
    Protected endpoint - requires authentication.
    """
    data = get_corporate_rheinberg_ai_insight()
    return DashboardAiInsightResponse(**data)
