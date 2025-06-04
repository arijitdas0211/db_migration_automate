from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .checkActiveDbServers import CheckServer
import pymysql, psycopg2, pymongo, pyodbc

@api_view(['GET'])
def check_active_db_servers(request):
    checker = CheckServer()
    results = []

    # Optional: accept hosts from query param, else use default
    hosts = checker.HOSTS_TO_CHECK

    for host in hosts:
        try:
            result = checker.check_host_for_databases(host)
            if result:
                results.append(result)
        except Exception as e:
            # In case one host check fails, continue with others but log error
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
def validate_credentials(request):
    data = request.data
    host = data.get("host")
    db = data.get("database")
    username = data.get("username")
    password = data.get("password")
    db_type = data.get("type")

    try:
        if db_type == "MySQL":
            conn = pymysql.connect(host=host, user=username, password=password, database=db)
        elif db_type == "PostgreSQL":
            conn = psycopg2.connect(host=host, user=username, password=password, dbname=db)
        elif db_type == "MongoDB":
            conn = pymongo.MongoClient(f"mongodb://{username}:{password}@{host}/{db}", serverSelectionTimeoutMS=3000)
            conn.server_info()
        elif db_type == "SQL Server":
            conn_str = f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={host};DATABASE={db};UID={username};PWD={password}"
            conn = pyodbc.connect(conn_str)
        else:
            return Response({ "success": False, "error": "Unsupported DB type" }, status=400)

        if db_type != "MongoDB":  # mongo doesn't use `.close()` in same way
            conn.close()

        return Response({ "success": True })

    except Exception as e:
        return Response({ "success": False, "error": str(e) }, status=500)
    


