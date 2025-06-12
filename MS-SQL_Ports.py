import psutil

sql_server_pid = []
def find_sql_server_ports():
    sql_ports = []
    for proc in psutil.process_iter():
        if "sqlservr" in proc.name().lower() or "sqlcmd" in proc.name().lower():
            sql_server_pid = proc.pid
            # print(f"Process: {proc.name()}, PID: {proc.pid}")                            
            process = psutil.Process(sql_server_pid)
            for connection in process.net_connections():
                if connection.status == 'LISTEN' and connection.family == 2: # TCP/IP
                    # print(f"Port: {connection.laddr[1]}, Address: {connection.laddr[0]}")
                    sql_ports.append(connection.laddr[1])
    return sql_ports

# sql_ports = find_sql_server_ports()
# print("MS SQL Ports: ")
# for port in sql_ports:
#     print(port)
    
