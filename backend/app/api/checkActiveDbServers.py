import socket

HOSTS_TO_CHECK = [
    "localhost",          # your own computer
    "192.168.1.10",       # example IP on your local network
    "192.168.1.25"        # another example
]

DB_PORTS = {
    "MySQL": 3306,
    "PostgreSQL": 5432,
    "SQL Server": 1433,
    "MongoDB": 27017,
    "Oracle": 1521,
    "Redis": 6379
}

def check_host_for_databases(host):
    print(f"\nChecking {host}...")
    open_ports = []
    for db_name, port in DB_PORTS.items():
        try:
            with socket.create_connection((host, port), timeout=0.5):
                open_ports.append((db_name, port))
        except (socket.error, OSError):
            continue
    return (host, open_ports) if open_ports else None

results = []
for host in HOSTS_TO_CHECK:
    result = check_host_for_databases(host)
    if result:
        results.append(result)

if results:
    print("\n✅ Found database servers:")
    for host, ports in results:
        print(f"\n📍 {host} is running:")
        for db_name, port in ports:
            print(f"  -> {db_name} on port {port}")
else:
    print("\n❌ No database servers found running.")

