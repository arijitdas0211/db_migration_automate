import socket
import pyodbc
from .msSqlPorts import find_sql_server_ports

class CheckServer:
    HOSTS_TO_CHECK = ['localhost']

    def is_port_open(self, host, port):
        try:
            with socket.create_connection((host, port), timeout=0.3):
                return True
        except Exception:
            return False

    def list_sqlserver_databases(self, host, port):
        try:
            conn_str = (
                f"DRIVER={{ODBC Driver 17 for SQL Server}};"
                f"SERVER={host},{port};"
                f"Trusted_Connection=yes;"
            )
            conn = pyodbc.connect(conn_str, timeout=2)
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
        active_ports = find_sql_server_ports()

        for port in active_ports:
            if self.is_port_open(host, port):
                result = self.list_sqlserver_databases(host, port)
                if result['status'] == 'success':
                    db_services.append({
                        'type': f"SQL Server Instance on port {port}",
                        'databases': result['databases']
                    })


        return {
            'host': host,
            'services': db_services
        }
