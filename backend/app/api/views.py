from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .checkActiveDbServers import CheckServer
from .queries import Queries
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
import pyodbc


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'message': 'CSRF cookie set'})


@api_view(['GET'])
def check_active_db_servers(request):
    checker = CheckServer()
    results = []

    # Use default host list
    hosts = checker.HOSTS_TO_CHECK

    for host in hosts:
        try:
            result = checker.check_host_for_databases(host)
            if result:
                results.append(result)
        except Exception as e:
            results.append({
                'host': host,
                'services': [],
                'error': f'Failed to check host: {str(e)}'
            })

    if results:
        return Response({
            'success': True,
            'data': results,
            'message': 'Database server check completed.'
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'success': False,
            'data': [],
            'message': 'No database servers found or checked.'
        }, status=status.HTTP_200_OK)


@api_view(['POST'])
def validate_and_assess(request):
    data = request.data
    host = data.get("host")
    db = data.get("database")
    username = data.get("username")
    password = data.get("password")
    db_type = data.get("type")

    # Example input:
    # {
    #   "host": "localhost",
    #   "database": "AdventureWorks2016",
    #   "username": "sa",
    #   "password": "1234",
    #   "type": "SQL Server"
    # }

    try:
        conn_str = f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={host};DATABASE={db};UID={username};PWD={password}"
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()

        output = []

        for q in Queries.sql_server_to_postgres():
            try:
                cursor.execute(q["query"])
                columns = [desc[0].lower() for desc in cursor.description]
                rows = cursor.fetchall()
                data_rows = [dict(zip(columns, row)) for row in rows]

                yes_count = sum(1 for row in data_rows if row.get("hasspecialcharsorlongname") == "yes")
                no_count = sum(1 for row in data_rows if row.get("hasspecialcharsorlongname") == "no")

                output.append({
                    "label": q["label"],
                    "rowCount": len(data_rows),
                    "yes": yes_count,
                    "no": no_count,
                    "rows": data_rows
                })
            except Exception as qe:
                output.append({
                    "label": q["label"],
                    "error": str(qe),
                    "rowCount": 0,
                    "yes": 0,
                    "no": 0,
                    "rows": []
                })

        cursor.close()
        conn.close()

        return Response({
            "success": True,
            "message": "SQL Server credentials validated and assessment completed.",
            "data": output
        })

    except Exception as e:
        return Response({ "success": False, "error": str(e) }, status=500)
