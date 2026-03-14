import base64
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.mail import send_mail, get_connection
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from pathlib import Path

from .models import Profile, Submission

CONFIG_PATH = Path(settings.BASE_DIR) / "daypi.json"

def _read_config():
    import json
    if CONFIG_PATH.exists():
        try:
            return json.loads(CONFIG_PATH.read_text("utf-8"))
        except:
            pass
    return {"tasks_open": False, "custom_tasks": []}

def _write_config(data):
    import json
    CONFIG_PATH.write_text(json.dumps(data, ensure_ascii=False), "utf-8")

@csrf_exempt
@require_http_methods(["GET", "POST"])
def config(request):
    if request.method == "GET":
        return JsonResponse(_read_config())
    
    user = get_user_from_auth(request)
    profile = Profile.objects.filter(user=user).first() if user else None
    if not profile or not profile.is_admin:
        return JsonResponse({"detail": "Forbidden"}, status=403)
        
    try:
        payload = json_from_request(request)
    except ValueError:
        return JsonResponse({"ok": False}, status=400)
        
    _write_config(payload)
    return JsonResponse({"ok": True})

def ensure_admin():
    admin = User.objects.filter(email=settings.ADMIN_EMAIL).first()
    if admin:
        return admin
    admin = User.objects.create_user(
        username=settings.ADMIN_EMAIL,
        email=settings.ADMIN_EMAIL,
        password=settings.ADMIN_PASSWORD,
        first_name="Admin",
    )
    Profile.objects.create(user=admin, course="-", faculty="Адміністрація", is_admin=True)
    return admin


def parse_basic_auth(request):
    auth = request.headers.get("Authorization", "")
    if not auth.lower().startswith("basic "):
        return None
    token = auth.split(" ", 1)[1].strip()
    try:
        decoded = base64.b64decode(token).decode("utf-8")
    except Exception:
        return None
    if ":" not in decoded:
        return None
    email, password = decoded.split(":", 1)
    return email.lower(), password


def get_user_from_auth(request):
    creds = parse_basic_auth(request)
    if not creds:
        return None
    email, password = creds
    user = authenticate(username=email, password=password)
    return user


@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    ensure_admin()
    try:
        payload = json_from_request(request)
    except ValueError:
        return JsonResponse({"ok": False, "message": "Invalid JSON"}, status=400)

    email = payload.get("email", "").lower()
    if email == settings.ADMIN_EMAIL:
        return JsonResponse({"ok": False, "message": "Admin email is reserved"}, status=400)
    if not email.endswith(settings.REQUIRED_DOMAIN):
        return JsonResponse({"ok": False, "message": "Invalid email domain"}, status=400)

    try:
        user = User.objects.create_user(
            username=email,
            email=email,
            password=payload.get("password", ""),
            first_name=payload.get("name", "").strip(),
        )
        Profile.objects.create(
            user=user,
            course=payload.get("course", ""),
            faculty=payload.get("faculty", ""),
            is_admin=False,
        )
    except IntegrityError:
        return JsonResponse({"ok": False, "message": "Email already exists"}, status=409)

    email_sent = False
    if settings.EMAIL_HOST and settings.EMAIL_HOST_USER and settings.EMAIL_HOST_PASSWORD:
        try:
            connection = get_connection(timeout=getattr(settings, "EMAIL_TIMEOUT", 5))
            send_mail(
                "Daypi registration confirmation",
                f"Вітаємо! Ваш пароль для входу в Daypi: {payload.get('password','')}\n"
                f"Hello! Your Daypi password: {payload.get('password','')}\n",
                settings.DEFAULT_FROM_EMAIL,
                [email],
                connection=connection,
                fail_silently=True,
            )
            email_sent = True
        except Exception:
            email_sent = False

    return JsonResponse({"ok": True, "email_sent": email_sent})


@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    ensure_admin()
    try:
        payload = json_from_request(request)
    except ValueError:
        return JsonResponse({"ok": False, "message": "Invalid JSON"}, status=400)

    email = payload.get("email", "").lower()
    password = payload.get("password", "")
    user = authenticate(username=email, password=password)
    if not user:
        return JsonResponse({"ok": False, "message": "Invalid credentials"}, status=401)

    profile = Profile.objects.filter(user=user).first()
    return JsonResponse(
        {
            "ok": True,
            "user": {
                "name": user.first_name or "",
                "email": user.email,
                "course": profile.course if profile else "",
                "faculty": profile.faculty if profile else "",
                "is_admin": profile.is_admin if profile else False,
            },
        }
    )


@csrf_exempt
@require_http_methods(["GET", "POST", "DELETE"])
def submissions(request):
    ensure_admin()
    user = get_user_from_auth(request)
    if not user:
        return JsonResponse({"detail": "Unauthorized"}, status=401)

    profile = Profile.objects.filter(user=user).first()
    if request.method == "GET":
        if not profile or not profile.is_admin:
            return JsonResponse({"detail": "Forbidden"}, status=403)

        rows = Submission.objects.select_related("user").order_by("-created_at")
        return JsonResponse(
            [
                {
                    "email": row.user.email,
                    "name": row.user.first_name,
                    "day_key": row.day_key,
                    "date_key": row.date_key,
                    "task_id": row.task_id,
                    "task_title_uk": row.task_title_uk,
                    "task_title_en": row.task_title_en,
                    "points": row.points,
                    "accuracy": row.accuracy,
                    "answer": row.answer,
                    "ts": int(row.created_at.timestamp() * 1000),
                }
                for row in rows
            ],
            safe=False,
        )
    if request.method == "DELETE":
        if profile and profile.is_admin:
            return JsonResponse({"ok": False, "message": "Admin cannot be deleted"}, status=400)
        Submission.objects.filter(user=user).delete()
        Profile.objects.filter(user=user).delete()
        user.delete()
        return JsonResponse({"ok": True})

    try:
        payload = json_from_request(request)
    except ValueError:
        return JsonResponse({"ok": False, "message": "Invalid JSON"}, status=400)

    Submission.objects.create(
        user=user,
        day_key=payload.get("day_key", ""),
        date_key=payload.get("date_key", ""),
        task_id=payload.get("task_id", ""),
        task_title_uk=payload.get("task_title_uk", ""),
        task_title_en=payload.get("task_title_en", ""),
        points=int(payload.get("points", 0)),
        accuracy=int(payload.get("accuracy", 0)),
        answer=payload.get("answer", ""),
    )

    return JsonResponse({"ok": True})


@require_http_methods(["GET"])
def submissions_me(request):
    ensure_admin()
    user = get_user_from_auth(request)
    if not user:
        return JsonResponse({"detail": "Unauthorized"}, status=401)

    rows = Submission.objects.filter(user=user).order_by("-created_at")
    return JsonResponse(
        [
            {
                "day_key": row.day_key,
                "date_key": row.date_key,
                "task_id": row.task_id,
                "task_title_uk": row.task_title_uk,
                "task_title_en": row.task_title_en,
                "points": row.points,
                "accuracy": row.accuracy,
                "answer": row.answer,
                "ts": int(row.created_at.timestamp() * 1000),
            }
            for row in rows
        ],
        safe=False,
    )


def submissions_all(request):
    return JsonResponse({"detail": "Use /api/submissions with GET"}, status=410)


@require_http_methods(["GET"])
def leaderboard(request):
    rows = Submission.objects.select_related("user")
    user_day_best = {}
    
    for row in rows:
        email = row.user.email
        day = row.day_key
        key = (email, day)
        
        current = user_day_best.get(key)
        if not current:
            user_day_best[key] = {"name": row.user.first_name, "points": row.points, "accuracy": row.accuracy}
        else:
            if row.points > current["points"] or (row.points == current["points"] and row.accuracy > current["accuracy"]):
                user_day_best[key]["points"] = row.points
                user_day_best[key]["accuracy"] = row.accuracy

    acc = {}
    for (email, day), best in user_day_best.items():
        item = acc.get(email) or {
            "name": best["name"],
            "email": email,
            "points": 0,
            "accuracy_sum": 0,
            "count": 0,
        }
        item["points"] += best["points"]
        item["accuracy_sum"] += best["accuracy"]
        item["count"] += 1
        acc[email] = item

    result = []
    for item in acc.values():
        accuracy = round(item["accuracy_sum"] / item["count"]) if item["count"] else 0
        result.append(
            {
                "name": item["name"],
                "email": item["email"],
                "points": item["points"],
                "accuracy": accuracy,
            }
        )

    result.sort(key=lambda x: x["points"], reverse=True)
    return JsonResponse(result, safe=False)


def json_from_request(request):
    import json

    try:
        return json.loads(request.body.decode("utf-8"))
    except Exception as exc:
        raise ValueError("Invalid JSON") from exc


@require_http_methods(["GET"])
def index(request):
    base_dir = Path(__file__).resolve().parent.parent
    html_path = base_dir / "index.html"
    if not html_path.exists():
        return HttpResponse("index.html not found", status=404)
    return HttpResponse(html_path.read_text(encoding="utf-8"), content_type="text/html")


@require_http_methods(["GET"])
def styles(request):
    base_dir = Path(__file__).resolve().parent.parent
    css_path = base_dir / "styles.css"
    if not css_path.exists():
        return HttpResponse("styles.css not found", status=404)
    return HttpResponse(css_path.read_text(encoding="utf-8"), content_type="text/css")

@require_http_methods(["GET"])
def script(request):
    base_dir = Path(__file__).resolve().parent.parent
    js_path = base_dir / "script.js"
    if not js_path.exists():
        return HttpResponse("script.js not found", status=404)
    return HttpResponse(js_path.read_text(encoding="utf-8"), content_type="application/javascript")

@require_http_methods(["GET"])
def admin_panel(request):
    base_dir = Path(__file__).resolve().parent.parent
    html_path = base_dir / "admin.html"
    if not html_path.exists():
        return HttpResponse("admin.html not found", status=404)
    return HttpResponse(html_path.read_text(encoding="utf-8"), content_type="text/html")

@require_http_methods(["GET"])
def admin_script(request):
    base_dir = Path(__file__).resolve().parent.parent
    js_path = base_dir / "admin.js"
    if not js_path.exists():
        return HttpResponse("admin.js not found", status=404)
    return HttpResponse(js_path.read_text(encoding="utf-8"), content_type="application/javascript")
