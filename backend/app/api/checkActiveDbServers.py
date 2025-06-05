import socket
import mysql.connector
import psycopg2
from pymongo import MongoClient
import pyodbc

class CheckServer:
    HOSTS_TO_CHECK = ['localhost']

    # Check if a port is open on a host
    def is_port_open(self, host, port):
        try:
            with socket.create_connection((host, port), timeout=1):
                return True
        except:
            return False

    # List MySQL databases
    def list_mysql_databases(self, host):
        try:
            conn = mysql.connector.connect(host=host, user='root', password='1234')
            cursor = conn.cursor()
            cursor.execute("SHOW DATABASES")
            databases = [db[0] for db in cursor.fetchall()]
            cursor.close()
            conn.close()
            return {'status': 'success', 'databases': databases}
        except Exception as e:
            return {'status': 'error', 'message': str(e)}

    # List Postgres databases
    def list_postgres_databases(self, host):
        try:
            conn = psycopg2.connect(dbname='postgres', user='postgres', password='1234', host=host)
            cursor = conn.cursor()
            cursor.execute("SELECT datname FROM pg_database WHERE datistemplate = false;")
            databases = [db[0] for db in cursor.fetchall()]
            cursor.close()
            conn.close()
            return {'status': 'success', 'databases': databases}
        except Exception as e:
            return {'status': 'error', 'message': str(e)}

    # List MongoDb databases
    def list_mongodb_databases(self, host):
        try:
            client = MongoClient(host, 27017)
            return {'status': 'success', 'databases': client.list_database_names()}
        except Exception as e:
            return {'status': 'error', 'message': str(e)}

    # List SQLServer databases
    def list_sqlserver_databases(self, host):
        try:
            conn = pyodbc.connect(f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={host},1433;UID=sa;PWD=1234')
            cursor = conn.cursor()
            cursor.execute("SELECT name FROM sys.databases")
            databases = [row[0] for row in cursor.fetchall()]
            cursor.close()
            conn.close()
            return {'status': 'success', 'databases': databases}
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
        

    def check_host_for_databases(self, host):
        db_services = []

        db_checks = [
            {'type': 'MySQL', 'port': 3306, 'checker': self.list_mysql_databases},
            {'type': 'PostgreSQL', 'port': 5432, 'checker': self.list_postgres_databases},
            {'type': 'MongoDB', 'port': 27017, 'checker': self.list_mongodb_databases},
            {'type': 'SQL Server', 'port': 1433, 'checker': self.list_sqlserver_databases},
        ]

        for db in db_checks:
            if self.is_port_open(host, db['port']):
                result = db['checker'](host)
                db_services.append({
                    'type': db['type'],
                    'databases': result.get('databases', [])
                })

        return {
            'host': host,
            'services': db_services
        }

