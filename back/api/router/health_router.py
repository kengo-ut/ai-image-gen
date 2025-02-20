from fastapi import APIRouter

from api.core.health_operations import check_health
from api.schema import HealthStatus, HealthVariables

health_router = APIRouter(prefix="/health")

sample_data = HealthVariables(
    weight=70, height=175, systolic_bp=118, diastolic_bp=78, glucose=90, heart_rate=75
)


@health_router.post("/", response_model=HealthStatus)
async def health(request: HealthVariables) -> HealthStatus:
    res: HealthStatus = check_health(request)
    return res
