from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .checkActiveDbServers import CheckServer
import pymysql, psycopg2, pymongo, pyodbc
# Validation queries
from .queries import Queries

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
def validate_and_assess(request):
    data = request.data
    host = data.get("host")
    db = data.get("database")
    username = data.get("username")
    password = data.get("password")
    db_type = data.get("type")

    try:
        conn = None
        if db_type == "MySQL":
            conn = pymysql.connect(host=host, user=username, password=password, database=db)
        elif db_type == "PostgreSQL":
            conn = psycopg2.connect(host=host, user=username, password=password, dbname=db)
        elif db_type == "MongoDB":
            conn = pymongo.MongoClient(f"mongodb://{username}:{password}@{host}/{db}", serverSelectionTimeoutMS=3000)
            conn.server_info()  # trigger connection
            return Response({ "success": True, "message": "MongoDB credentials validated." })
        elif db_type == "SQL Server":
            conn_str = f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={host};DATABASE={db};UID={username};PWD={password}"
            conn = pyodbc.connect(conn_str)
        else:
            return Response({ "success": False, "error": "Unsupported DB type" }, status=400)

        # For non-SQL Server DBs, just return success after validation
        if db_type != "SQL Server":
            conn.close()
            return Response({ "success": True, "message": f"{db_type} credentials validated." })

        # --- SQL Server Assessment Starts ---
        cursor = conn.cursor()
        output = []

        for q in Queries.sql_server_to_postgres():
            try:
                cursor.execute(q["query"])
                columns = [desc[0].lower() for desc in cursor.description]
                rows = cursor.fetchall()
                data = [dict(zip(columns, row)) for row in rows]

                yes_count = sum(1 for row in data if row.get("hasspecialcharsorlongname") == "yes")
                no_count = sum(1 for row in data if row.get("hasspecialcharsorlongname") == "no")

                output.append({
                    "label": q["label"],
                    "rowCount": len(data),
                    "yes": yes_count,
                    "no": no_count,
                    "rows": data
                })
            except Exception as qe:
                print(f"Query error for '{q['label']}': {qe}")
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
        print(f"Database error: {e}")
        return Response({ "success": False, "error": str(e) }, status=500)





