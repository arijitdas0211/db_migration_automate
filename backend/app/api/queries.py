class Queries:
    @staticmethod
    def sql_server_to_postgres():
        return [
            {
                "label": "type_table",
                "query": """
                    SELECT name,CASE WHEN name LIKE '% %' OR  name LIKE '%#%' OR  name LIKE '%(%' OR  name LIKE '%.%' OR name LIKE '%[%' OR name LIKE '%]%' OR  name LIKE '%[_]%'  OR  LEN(name) > 63 THEN 'yes' ELSE 'no' END AS HasSpecialCharsOrlongname FROM sys.table_types
                """,
                "type": "SQL Server"
            },
            {
                "label": "default_constraint",
                "query": """
                    SELECT name,CASE WHEN name LIKE '% %' OR  name LIKE '%#%' OR  name LIKE '%(%' OR  name LIKE '%.%' OR name LIKE '%[%' OR name LIKE '%]%' OR  name LIKE '%[_]%'  OR LEN(name) > 63 THEN 'yes' ELSE 'no' END AS HasSpecialCharsOrlongname FROM sys.default_constraints
                """,
                "type": "SQL Server"
            },
            {
                "label": "sql_scalar_function",
                "query": """
                    SELECT name,CASE WHEN name LIKE '% %' OR  name LIKE '%#%' OR  name LIKE '%(%' OR  name LIKE '%.%' OR name LIKE '%[%' OR  name LIKE '%]%' OR  name LIKE '%[_]%'  OR LEN(name) > 63 THEN 'yes' ELSE 'no' END AS HasSpecialCharsOrlongname FROM sys.objects where type='fn'
                """,
                "type": "SQL Server"
            },
            {
                "label": "primary_key_constraint",
                "query": """
                    SELECT name,CASE WHEN name LIKE '% %' OR  name LIKE '%#%' OR  name LIKE '%(%' OR  name LIKE '%.%' OR name LIKE '%[%' OR name LIKE '%]%' OR  name LIKE '%[_]%'  OR LEN(name) > 63 THEN 'yes' ELSE 'no' END AS HasSpecialCharsOrlongname FROM sys.key_constraints where type='pk'
                """,
                "type": "SQL Server"
            },
            {
                "label": "sql_store_procedure",
                "query": """
                    SELECT name,CASE WHEN name LIKE '% %' OR  name LIKE '%#%' OR  name LIKE '%(%' OR  name LIKE '%.%' OR name LIKE '%[%' OR name LIKE '%]%' OR  name LIKE '%[_]%'  OR LEN(name) > 63 THEN 'yes' ELSE 'no' END AS HasSpecialCharsOrlongname FROM sys.procedures where type='p'
                """,
                "type": "SQL Server"
            },
            {
                "label": "unique_constraint",
                # For this query it was getting error at console
                "query": """    
                    SELECT name,
                        CASE WHEN name LIKE '% %' OR name LIKE '%#%' OR name LIKE '%(%' OR name LIKE '%.%' OR 
                                    name LIKE '%[%' OR name LIKE '%]%' OR name LIKE '%\\_%' ESCAPE '\\' OR LEN(name) > 63
                            THEN 'yes' ELSE 'no' 
                        END AS HasSpecialCharsOrlongname
                        FROM sys.key_constraints 
                        WHERE type = 'uq'
                """,
                "type": "SQL Server"
            },
            {
                "label": "check_constraint",
                "query": """
                    SELECT name,CASE WHEN name LIKE '% %' OR  name LIKE '%#%' OR  name LIKE '%(%' OR  name LIKE '%.%' OR name LIKE '%[%' OR name LIKE '%]%' OR  name LIKE '%[_]%'  OR  LEN(name) > 63 THEN 'yes' ELSE 'no' END AS HasSpecialCharsOrlongname FROM sys.check_constraints where type='c'
                """,
                "type": "SQL Server"
            },
            {
                "label": "sql_trigger",
                "query": """
                    SELECT name,CASE WHEN name LIKE '% %' OR  name LIKE '%#%' OR  name LIKE '%(%' OR  name LIKE '%.%' OR name LIKE '%[%' OR name LIKE '%]%' OR  name LIKE '%[_]%'  OR  LEN(name) > 63 THEN 'yes' ELSE 'no' END AS HasSpecialCharsOrlongname FROM sys.triggers where parent_id<>0
                """,
                "type": "SQL Server"
            },
            {
                "label": "sql_table_valued_function",
                "query": """
                    SELECT name,CASE WHEN name LIKE '% %' OR  name LIKE '%#%' OR  name LIKE '%(%' OR  name LIKE '%.%' OR name LIKE '%[%' OR name LIKE '%]%' OR  name LIKE '%[_]%'  OR  LEN(name) > 63 THEN 'yes' ELSE 'no' END AS HasSpecialCharsOrlongname FROM sys.objects where type='tf'
                """,
                "type": "SQL Server"
            },
            {
                "label": "foreign_key_constraint",
                "query": """
                    SELECT name,CASE WHEN name LIKE '% %' OR  name LIKE '%#%' OR  name LIKE '%(%' OR  name LIKE '%.%' OR name LIKE '%[%' OR name LIKE '%]%' OR  name LIKE '%[_]%'  OR LEN(name) > 63 THEN 'yes' ELSE 'no' END AS HasSpecialCharsOrlongname FROM sys.foreign_keys where type='f'
                """,
                "type": "SQL Server"
            },
            {
                "label": "user_table",
                "query": """
                    SELECT name,CASE WHEN name LIKE '% %' OR  name LIKE '%#%' OR  name LIKE '%(%' OR  name LIKE '%.%' OR name LIKE '%[%' OR name LIKE '%]%' OR  name LIKE '%[_]%'  OR  LEN(name) > 63 THEN 'yes' ELSE 'no' END AS HasSpecialCharsOrlongname from sys.tables WHERE type = 'u'
                """,
                "type": "SQL Server"
            },
        ]

