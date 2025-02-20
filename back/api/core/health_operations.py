from api.schema import HealthStatus, HealthVariables


def check_health(health_data: HealthVariables) -> HealthStatus:
    """
    入力された健康データを元に、健康状態を判定する。

    :param health_data: HealthVariables 型の健康データ
    :return: HealthStatus 型の健康状態
    """
    # BMI 計算
    health_data.height /= 100
    bmi = health_data.weight / (health_data.height**2)

    # 健康基準の判定
    bmi_ok = 18.5 <= bmi <= 24.9
    bp_ok = health_data.systolic_bp <= 120 and health_data.diastolic_bp <= 80
    glucose_ok = 70 <= health_data.glucose <= 99
    heart_rate_ok = 60 <= health_data.heart_rate <= 100

    # 総合判定
    if all([bmi_ok, bp_ok, glucose_ok, heart_rate_ok]):
        return HealthStatus(status="健康")
    elif any([not bmi_ok, not bp_ok, not glucose_ok, not heart_rate_ok]):
        return HealthStatus(status="注意")
    else:
        return HealthStatus(status="危険")
