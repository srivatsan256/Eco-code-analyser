import datetime
import hashlib
from bson import ObjectId  # type: ignore

from rest_framework.decorators import (  # type: ignore
    api_view,
    permission_classes,
    authentication_classes
)
from rest_framework.response import Response  # type: ignore
from rest_framework.permissions import AllowAny  # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken  # type: ignore

from .db import get_users_collection, get_reports_collection
from .services.granite import generate_sustainability_report


def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


# ==========================================================
# PUBLIC ENDPOINTS
# ==========================================================

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def register(request):
    data = request.data

    if not all([
        data.get('username'),
        data.get('email'),
        data.get('password')
    ]):
        return Response(
            {'error': 'username, email and password are required'},
            status=400
        )

    users = get_users_collection()

    if users.find_one({'email': data['email']}):
        return Response({'error': 'User already exists'}, status=400)

    users.insert_one({
        'username': data['username'],
        'email': data['email'],
        'password': hash_password(data['password'])
    })

    return Response({'message': 'Registration successful'})


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def login(request):
    data = request.data

    user = get_users_collection().find_one({
        'email': data.get('email'),
        'password': hash_password(data.get('password', ''))
    })

    if not user:
        return Response(
            {'error': 'Invalid credentials'},
            status=401
        )

    refresh = RefreshToken()
    refresh['user_id'] = str(user['_id'])

    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    })


# ==========================================================
# CODE ANALYSIS
# ==========================================================

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def analyze_code(request):
    data = request.data

    language = data.get('language')
    source_code = data.get('source_code')

    if not language or not source_code:
        return Response(
            {'error': 'language and source_code are required'},
            status=400
        )

    # limit input size
    source_code = str(source_code)[:6000]

    try:
        result = generate_sustainability_report(
            language,
            source_code
        )

    except Exception as e:
        print(f"[ERROR] Analysis failed: {e}")

        return Response(
            {
                'error': 'Analysis failed',
                'details': str(e)
            },
            status=500
        )

    doc = {
        'user_id': 'anonymous',
        'language': language,
        'green_score': result.get('green_score', 65),
        'quality_score': result.get('quality_score', 70),
        'report': result.get('report', 'Analysis completed'),
        'full_report': result,
        'created_at': datetime.datetime.now(
            datetime.timezone.utc
        ).isoformat()
    }

    inserted = get_reports_collection().insert_one(doc)

    return Response({
        'analysis_id': str(inserted.inserted_id),
        'green_score': doc['green_score'],
        'quality_score': doc['quality_score'],
        'report': doc['report'],
        'full_report': result
    })


# ==========================================================
# DASHBOARD
# ==========================================================

@api_view(['GET'])
@permission_classes([AllowAny])
def dashboard(request):
    reports = list(
        get_reports_collection()
        .find()
        .sort('_id', -1)
        .limit(10)
    )

    total = len(reports)

    if total > 0:
        avg_green = sum(
            r.get('green_score', 0)
            for r in reports
        ) / total

        best_score = max(
            r.get('green_score', 0)
            for r in reports
        )
    else:
        avg_green = 0
        best_score = 0

    return Response({
        'total_analyses': total,
        'average_green_score': round(avg_green, 2),
        'best_score': best_score,
        'recent_reports': [
            {
                'id': str(r['_id']),
                'language': r.get('language'),
                'green_score': r.get('green_score'),
                'quality_score': r.get('quality_score'),
                'created_at': r.get('created_at')
            }
            for r in reports
        ]
    })


# ==========================================================
# HISTORY
# ==========================================================

@api_view(['GET'])
@permission_classes([AllowAny])
def history(request):
    reports = list(
        get_reports_collection()
        .find()
        .sort('_id', -1)
    )

    result = []

    for report in reports:
        result.append({
            'id': str(report['_id']),
            'language': report.get('language'),
            'green_score': report.get('green_score'),
            'quality_score': report.get('quality_score'),
            'created_at': report.get('created_at')
        })

    return Response(result)


# ==========================================================
# REPORT DETAIL
# ==========================================================

@api_view(['GET', 'DELETE'])
@permission_classes([AllowAny])
def report_detail(request, pk):
    collection = get_reports_collection()

    try:
        report = collection.find_one({
            '_id': ObjectId(pk)
        })
    except Exception:
        return Response(
            {'error': 'Invalid report id'},
            status=400
        )

    if not report:
        return Response(
            {'error': 'Report not found'},
            status=404
        )

    if request.method == 'DELETE':
        collection.delete_one({
            '_id': ObjectId(pk)
        })

        return Response({
            'message': 'Report deleted'
        })

    report['_id'] = str(report['_id'])

    return Response(report)