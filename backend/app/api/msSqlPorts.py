import psutil
import socket

def find_sql_server_ports():
    sql_ports = set()
    for proc in psutil.process_iter(['name']):
        try:
            name = proc.info['name']
            if name and any(keyword in name.lower() for keyword in ["sqlservr", "sqlcmd"]):
                for conn in proc.net_connections(kind='inet'):
                    if conn.status == psutil.CONN_LISTEN and conn.family == socket.AF_INET:
                        sql_ports.add(conn.laddr.port)
        except (psutil.AccessDenied, psutil.NoSuchProcess, psutil.ZombieProcess):
            continue
    return sorted(sql_ports)

# Example usage:
# sql_ports = find_sql_server_ports()
# print("MS SQL Ports: ")
# for port in sql_ports:
#     print(port)
