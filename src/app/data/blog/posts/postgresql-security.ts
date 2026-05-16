import type { BlogPost } from '../types'

/**
 * Source: PostgreSQL security hardening PDF (Data Engineering Blog).
 * Add or reorder `blocks` to match future PDF revisions.
 */
export const postgresqlSecurityPost: BlogPost = {
  slug: 'postgresql-security-regulated-industries',
  title:
    'PostgreSQL security hardening for regulated industries: row-level security, audit logging, and encryption at rest',
  excerpt:
    'Running PostgreSQL in banking, insurance, or payments means controls beyond the app layer. Walk through authentication, authorisation, pgaudit, and encryption — with a checklist you can use before production.',
  date: '2026-05-15',
  readTime: '11 min read',
  author: 'Sunfinity Data Engineering',
  publicationLine: 'Sunfinity Technology Solutions | Data Engineering Blog',
  descriptorLine: 'Security · PostgreSQL · Compliance · BFSI',
  blocks: [
    {
      type: 'paragraph',
      text: 'Running PostgreSQL in a regulated environment — a bank, an NBFC, an insurance company, a payment processor — means your database is subject to controls that go well beyond application-layer security. RBI, SEBI, IRDAI, HIPAA, and PCI DSS all mandate specific database-level controls: who can access which rows, what operations get logged, how long those logs are retained, and how data is protected at rest and in transit. Most of these controls are available natively in PostgreSQL — but almost none of them are enabled by default.',
    },
    {
      type: 'paragraph',
      text: 'This post walks through the four pillars of PostgreSQL security hardening for regulated environments: authentication hardening, authorisation and access control, audit logging with pgaudit, and encryption. For each pillar, we cover what the regulators require, what PostgreSQL provides, and how to configure it correctly. We end with a printable security checklist you can use as a deployment gate for any production database in a regulated context.',
    },
    {
      type: 'heading',
      text: 'What regulated industries actually require from your database',
    },
    {
      type: 'paragraph',
      text: 'Before configuring anything, it is worth mapping regulatory requirements to specific PostgreSQL capabilities. The table below summarises the key database security requirements across the regulations most relevant to Indian and global BFSI and healthcare organisations.',
    },
    {
      type: 'table',
      caption: 'Regulations and key database expectations',
      headers: ['Regulation / Standard', 'Industry', 'Key database security requirements'],
      rows: [
        [
          'RBI IT Framework',
          'Banking (India)',
          'Access controls, audit trails, encryption in transit and at rest, privileged access management',
        ],
        [
          'SEBI Cybersecurity',
          'Capital markets',
          'Data classification, access logging, incident response, encryption of sensitive data',
        ],
        [
          'IRDAI Guidelines',
          'Insurance (India)',
          'Data localisation, access controls, audit logs retained for minimum 3 years',
        ],
        ['HIPAA', 'Healthcare', 'Access controls, audit logging, encryption at rest and in transit, minimum necessary access'],
        [
          'PCI DSS v4',
          'Payments',
          'Strong access controls, audit logs, TLS 1.2+, encryption of cardholder data, no stored CVV',
        ],
        [
          'ISO 27001',
          'Cross-industry',
          'Information security management, risk-based access controls, logging and monitoring',
        ],
      ],
    },
    {
      type: 'paragraph',
      text: 'Despite the variety of regulatory frameworks, the underlying database controls they demand are largely the same: strong authentication, least-privilege access, comprehensive audit logging, and encryption of sensitive data. PostgreSQL can satisfy all of these requirements natively or through well-maintained extensions. The gap is almost always configuration, not capability.',
    },
    {
      type: 'callout',
      text: 'The most common finding in BFSI database security audits is not a missing feature — it is a default PostgreSQL configuration that was never hardened before going to production. Default PostgreSQL installations use trust authentication for local connections, log almost nothing, grant broad privileges to PUBLIC, and do not enforce SSL. Every one of these defaults is a compliance failure in a regulated context.',
    },
    {
      type: 'heading',
      text: 'Pillar 1: Authentication hardening',
    },
    {
      type: 'subheading',
      text: 'Replace trust and md5 with scram-sha-256',
    },
    {
      type: 'paragraph',
      text: "PostgreSQL's default pg_hba.conf uses trust authentication for local connections — meaning any OS user on the database server can connect to any database without a password. For TCP connections, many installations use md5, which hashes passwords with an algorithm that has been broken for decades and is vulnerable to offline dictionary attacks.",
    },
    {
      type: 'paragraph',
      text: 'The correct authentication method for all production connections is scram-sha-256, introduced in PostgreSQL 10. It uses a challenge-response protocol where the password is never sent over the network, even in hashed form. The server stores a salted, iterated hash that is useless to an attacker even if the pg_authid system table is compromised.',
    },
    {
      type: 'code',
      content: `-- pg_hba.conf: enforce scram-sha-256 for all TCP connections
# TYPE DATABASE USER ADDRESS METHOD
local all postgres peer # OS auth for DBA
local all all scram-sha-256
host all all 127.0.0.1/32 scram-sha-256
host all all 10.0.0.0/8 scram-sha-256
hostssl all all 0.0.0.0/0 scram-sha-256
-- Ensure the server enforces scram-sha-256 as default
-- postgresql.conf:
password_encryption = scram-sha-256
-- Re-hash existing passwords (must be done per user after pg_hba change):
ALTER ROLE app_user PASSWORD 'new_strong_password';
-- PostgreSQL will store it using the current password_encryption method`,
    },
    {
      type: 'subheading',
      text: 'Enforce SSL/TLS for all network connections',
    },
    {
      type: 'paragraph',
      text: 'All production connections to PostgreSQL should use TLS. This protects credentials and data in transit from interception on the network — a requirement under RBI IT Framework, PCI DSS v4, and HIPAA. Configure PostgreSQL to require SSL and reject plaintext connections entirely.',
    },
    {
      type: 'code',
      content: `-- postgresql.conf: enable SSL
ssl = on
ssl_cert_file = '/etc/postgresql/ssl/server.crt'
ssl_key_file = '/etc/postgresql/ssl/server.key'
ssl_ca_file = '/etc/postgresql/ssl/ca.crt' # for client cert auth
-- Enforce minimum TLS version (PCI DSS requires TLS 1.2+)
ssl_min_protocol_version = 'TLSv1.2'
-- pg_hba.conf: require SSL for all external connections
# 'hostssl' only accepts SSL connections; 'hostnossl' only rejects them
hostssl all all 10.0.0.0/8 scram-sha-256
-- Verify SSL is active for a connection:
SELECT ssl, version, cipher, bits
FROM pg_stat_ssl
WHERE pid = pg_backend_pid();`,
    },
    {
      type: 'subheading',
      text: 'Restrict superuser access',
    },
    {
      type: 'paragraph',
      text: 'The postgres superuser bypasses all access controls, including row-level security policies. In a regulated environment, no application should ever connect as postgres or any other superuser. Superuser connections should be restricted to the local socket (peer authentication only) and used exclusively for administrative tasks by named DBA accounts.',
    },
    {
      type: 'code',
      content: `-- Create a named DBA role instead of using postgres directly
CREATE ROLE dba_alice WITH LOGIN SUPERUSER
PASSWORD 'strong_password'
CONNECTION LIMIT 2; -- limit concurrent superuser sessions
-- pg_hba.conf: block remote superuser connections entirely
# Superusers can only connect locally via peer auth
local all postgres peer
local all dba_alice peer
host all all 10.0.0.0/8 scram-sha-256
# No hostssl line for superusers = no remote superuser connections
-- Audit all superuser activity via pgaudit (covered in Pillar 3)`,
    },
    {
      type: 'callout',
      text: "If your application's connection string points to the postgres user or any superuser, that is a critical security finding regardless of your environment. Application users must never have superuser, CREATEDB, or CREATEROLE privileges. Create a dedicated application role with only the permissions it needs.",
    },
    {
      type: 'heading',
      text: 'Pillar 2: Authorisation and least-privilege access',
    },
    {
      type: 'subheading',
      text: 'Revoke default PUBLIC privileges',
    },
    {
      type: 'paragraph',
      text: 'By default, PostgreSQL grants broad privileges to the PUBLIC pseudo-role, which every database user belongs to automatically. In a new PostgreSQL installation, every user can connect to every database (except template databases), and every user has CREATE and USAGE privileges on the public schema. In a regulated environment, these defaults must be revoked and permissions granted explicitly.',
    },
    {
      type: 'code',
      content: `-- Revoke default PUBLIC privileges on the database
REVOKE CONNECT ON DATABASE production FROM PUBLIC;
REVOKE ALL ON DATABASE production FROM PUBLIC;
-- Revoke default PUBLIC privileges on the public schema
REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
-- Now grant explicitly to specific roles only
GRANT CONNECT ON DATABASE production TO app_role;
GRANT CONNECT ON DATABASE production TO analyst_role;
GRANT USAGE ON SCHEMA public TO app_role;
GRANT USAGE ON SCHEMA public TO analyst_role;
-- Grant table-level permissions explicitly
GRANT SELECT, INSERT, UPDATE ON accounts TO app_role;
GRANT SELECT ON accounts, transactions TO analyst_role;
-- Never use GRANT ALL unless you have a specific reason`,
    },
    {
      type: 'subheading',
      text: 'Role hierarchy: build a least-privilege role model',
    },
    {
      type: 'paragraph',
      text: 'Rather than granting permissions to individual users, build a role hierarchy where permissions are attached to roles and users are members of those roles. This makes access control manageable as the number of users grows and makes privilege auditing straightforward.',
    },
    {
      type: 'code',
      content: `-- Create functional roles (no LOGIN privilege)
CREATE ROLE role_app_read;
CREATE ROLE role_app_write;
CREATE ROLE role_analyst;
CREATE ROLE role_auditor;
-- Grant table permissions to functional roles
GRANT SELECT ON ALL TABLES IN SCHEMA public TO role_app_read;
GRANT SELECT, INSERT, UPDATE ON
accounts, transactions, loan_applications
TO role_app_write;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO role_analyst;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO role_auditor;
GRANT SELECT ON pg_stat_activity TO role_auditor;
-- Create login users and assign to roles
CREATE ROLE svc_api WITH LOGIN PASSWORD '...' CONNECTION LIMIT 20;
GRANT role_app_write TO svc_api;
CREATE ROLE analyst_priya WITH LOGIN PASSWORD '...' CONNECTION LIMIT 5;
GRANT role_analyst TO analyst_priya;
-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO role_analyst;`,
    },
    {
      type: 'subheading',
      text: 'Row-level security (RLS)',
    },
    {
      type: 'paragraph',
      text: 'Row-level security is one of the most powerful access control features in PostgreSQL. It allows you to define policies that control which rows a role can see or modify — enforced at the database layer, not the application layer. Even if a query runs as a privileged user, RLS policies filter the rows that query can access.',
    },
    {
      type: 'paragraph',
      text: "This is directly relevant to regulated environments: a branch manager should see only their branch's accounts. A relationship manager should see only their assigned customers. An auditor should see all rows. RLS enforces these boundaries in the database so that no application bug or misconfigured query can expose data across boundaries.",
    },
    {
      type: 'table',
      caption: 'RLS policy building blocks',
      headers: ['Policy type', 'Controls', 'Typical use case'],
      rows: [
        ['PERMISSIVE', 'Row is visible if ANY policy matches (OR logic)', 'Most common — allow access matching criteria'],
        ['RESTRICTIVE', 'Row is visible only if ALL policies match (AND logic)', 'Additional mandatory filters layered on top'],
        ['USING clause', 'Filters rows for SELECT, UPDATE, DELETE', 'Read access and modification visibility'],
        ['WITH CHECK clause', 'Filters rows for INSERT and UPDATE', 'Prevent writing data outside permitted scope'],
      ],
    },
    {
      type: 'code',
      content: `-- Step 1: Enable RLS on the table
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
-- Step 2: Force RLS even for table owners
ALTER TABLE accounts FORCE ROW LEVEL SECURITY;
-- Step 3: Create a policy for branch isolation
CREATE POLICY branch_isolation ON accounts
AS PERMISSIVE
FOR ALL
TO role_app_write, role_app_read
USING (branch_id = current_setting('app.current_branch_id')::INTEGER);
-- Step 4: Auditors see all rows
CREATE POLICY auditor_full_access ON accounts
AS PERMISSIVE
FOR SELECT
TO role_auditor
USING (true);
-- Step 5: Application sets the session variable on connect
SET app.current_branch_id = '42';
SELECT * FROM accounts; -- returns only branch 42 rows`,
    },
    {
      type: 'subheading',
      text: 'Column-level security with column privileges and views',
    },
    {
      type: 'paragraph',
      text: 'PostgreSQL supports column-level GRANT statements, allowing you to give a role access to specific columns rather than the entire table. This is useful for protecting PII fields like Aadhaar numbers, PAN, or date of birth from roles that need other columns on the same table.',
    },
    {
      type: 'code',
      content: `GRANT SELECT (id, account_number, balance, status, branch_id)
ON accounts TO role_analyst;
-- Alternative: create a view that masks sensitive columns
CREATE VIEW accounts_masked AS
SELECT
id,
account_number,
balance,
status,
branch_id,
CONCAT('XXXXX', RIGHT(pan_number, 4)) AS pan_masked,
CONCAT('XXXX-XXXX-', RIGHT(aadhaar_number, 4)) AS aadhaar_masked
FROM accounts;
GRANT SELECT ON accounts_masked TO role_analyst;
REVOKE SELECT ON accounts FROM role_analyst;`,
    },
    {
      type: 'heading',
      text: 'Pillar 3: Audit logging with pgaudit',
    },
    {
      type: 'paragraph',
      text: "PostgreSQL's built-in logging (log_statement, log_connections, log_disconnections) provides basic visibility but lacks the structured, session-level audit trail that regulators require. pgaudit is the standard extension for comprehensive PostgreSQL audit logging. It integrates with PostgreSQL's logging infrastructure and produces detailed, structured records of every statement executed — including the role, object, statement text, and result.",
    },
    {
      type: 'subheading',
      text: 'Installing and configuring pgaudit',
    },
    {
      type: 'code',
      content: `-- Install pgaudit (Ubuntu/Debian)
sudo apt install postgresql-16-pgaudit
-- postgresql.conf: load the extension
shared_preload_libraries = 'pgaudit'
-- Restart PostgreSQL after changing shared_preload_libraries
-- Create the extension in the database
CREATE EXTENSION pgaudit;`,
    },
    {
      type: 'subheading',
      text: 'Configuring audit classes',
    },
    {
      type: 'table',
      caption: 'pgaudit classes (regulated environments)',
      headers: ['Class', 'What it logs', 'Recommended for regulated systems'],
      rows: [
        ['read', 'SELECT and COPY FROM', 'Yes — all data reads on sensitive tables'],
        ['write', 'INSERT, UPDATE, DELETE, TRUNCATE, COPY TO', 'Yes — all data modifications'],
        ['ddl', 'Schema changes: CREATE, ALTER, DROP, GRANT, REVOKE', 'Yes — always'],
        ['role', 'Role and privilege changes: CREATE ROLE, GRANT', 'Yes — always'],
        ['function', 'Function calls and DO blocks', 'Situational — enable for sensitive functions'],
        ['misc', 'FETCH, CHECKPOINT, VACUUM and similar', 'No — too noisy for most setups'],
        ['all', 'Every statement in all classes above', 'Only for high-security or audit-focused DBs'],
      ],
    },
    {
      type: 'code',
      content: `-- postgresql.conf: recommended configuration for regulated BFSI
pgaudit.log = 'write, ddl, role'
pgaudit.log_relation = on
pgaudit.log_parameter = on
pgaudit.log_catalog = on
pgaudit.log_client = on
log_connections = on
log_disconnections = on
log_failed_auth_max = 3
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '`,
    },
    {
      type: 'subheading',
      text: 'Per-role audit configuration',
    },
    {
      type: 'code',
      content: `ALTER ROLE dba_alice SET pgaudit.log = 'all';
ALTER ROLE role_auditor SET pgaudit.log = 'read, write, ddl, role';
ALTER ROLE svc_api SET pgaudit.log = 'write, ddl';
-- Verify effective pgaudit settings per role
SELECT rolname, rolconfig
FROM pg_roles
WHERE rolconfig IS NOT NULL;`,
    },
    {
      type: 'paragraph',
      text: 'For high-sensitivity tables, you can combine pgaudit with object-level settings and ensure read auditing is enabled where regulators require visibility into SELECT activity on PII.',
    },
    {
      type: 'subheading',
      text: 'Shipping audit logs to a SIEM',
    },
    {
      type: 'paragraph',
      text: 'Audit logs stored only on the database server are a compliance risk — a compromised DBA account could modify or delete local log files. Regulators require that audit logs be shipped to a separate, tamper-evident system in near-real-time (Splunk, QRadar, Sentinel, CloudWatch Logs, etc.).',
    },
    {
      type: 'code',
      content: `-- Option 1: syslog
-- postgresql.conf:
log_destination = 'syslog'
syslog_facility = 'LOCAL0'
syslog_ident = 'postgresql'

-- Option 2: tail log files with Filebeat / Elastic Agent

-- Option 3: managed databases — enable pgaudit via parameter group; logs ship to CloudWatch / Azure Monitor`,
    },
    {
      type: 'callout',
      text: 'Audit logs must be considered tamper-evident. Always ship logs off the database server to an append-only, access-controlled log store. Retain logs for the minimum period required by your applicable regulation — 3 years for IRDAI, 5 years for PCI DSS, and typically 7 years for RBI.',
    },
    {
      type: 'heading',
      text: 'Pillar 4: Encryption at rest and in transit',
    },
    {
      type: 'paragraph',
      text: 'TLS configuration ensures data is encrypted between the client and the database server. Verify TLS is active and using an acceptable cipher suite for your regulatory context.',
    },
    {
      type: 'code',
      content: `SELECT
ssl,
version AS tls_version,
cipher,
bits AS key_bits,
client_dn AS client_certificate
FROM pg_stat_ssl
WHERE pid = pg_backend_pid();
-- postgresql.conf examples:
ssl_min_protocol_version = 'TLSv1.2'
ssl_ciphers = 'HIGH:!aNULL:!MD5:!RC4'
-- PCI DSS v4 requires TLS 1.2 minimum; TLS 1.3 is preferred where supported
ssl_min_protocol_version = 'TLSv1.3'`,
    },
    {
      type: 'subheading',
      text: 'Column-level encryption with pgcrypto',
    },
    {
      type: 'paragraph',
      text: 'For PII fields that must be encrypted at the column level, pgcrypto provides symmetric and asymmetric encryption functions that operate directly in SQL. The encryption key should come from a secrets manager, not hardcoded values.',
    },
    {
      type: 'code',
      content: `CREATE EXTENSION pgcrypto;
INSERT INTO customers (id, name, pan_encrypted)
VALUES (
1,
'Priya Sharma',
pgp_sym_encrypt('ABCDE1234F', current_setting('app.encryption_key'))
);
SELECT
id,
name,
pgp_sym_decrypt(pan_encrypted, current_setting('app.encryption_key')) AS pan
FROM customers
WHERE id = 1;`,
    },
    {
      type: 'callout',
      text: 'pgcrypto column encryption does not protect against a DBA who has access to the encryption key. For true separation of duties, manage keys outside the database — AWS Secrets Manager, HashiCorp Vault, or Azure Key Vault — and inject at connection time, never storing keys in the database.',
    },
    {
      type: 'subheading',
      text: 'Encryption at rest: storage-layer and OS-layer encryption',
    },
    {
      type: 'paragraph',
      text: 'Column-level encryption protects specific fields. Storage-level encryption protects all data files, WAL segments, and temporary files on disk — appropriate for physical storage theft or unauthorised disk access. For self-managed PostgreSQL, use an encrypted filesystem or block device; on cloud managed services, enable provider encryption and CMK/CMEK where required.',
    },
    {
      type: 'code',
      content: `# Linux: LUKS example (illustrative)
# cryptsetup luksFormat /dev/sdb
# cryptsetup open /dev/sdb pg_data_enc
# mkfs.ext4 /dev/mapper/pg_data_enc
# mount /dev/mapper/pg_data_enc /var/lib/postgresql/16/main

# AWS RDS / Azure / GCP — enable storage encryption at provisioning; verify with provider CLIs/console`,
    },
    {
      type: 'subheading',
      text: 'Additional hardening: network and connection security',
    },
    {
      type: 'paragraph',
      text: 'PostgreSQL should never listen on a public IP address. Place it in a private subnet; use a bastion for DBA access or a pooler for applications.',
    },
    {
      type: 'code',
      content: `-- postgresql.conf: bind only to internal IP
listen_addresses = '10.0.1.10'
SELECT inet_server_addr(), inet_server_port();`,
    },
    {
      type: 'subheading',
      text: 'Use PgBouncer as a connection pooler and security layer',
    },
    {
      type: 'code',
      content: `[pgbouncer]
listen_addr = 10.0.1.5
listen_port = 6432
auth_type = scram-sha-256
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 25
client_tls_sslmode = require
client_tls_cert_file = /etc/pgbouncer/server.crt
client_tls_key_file = /etc/pgbouncer/server.key
server_tls_sslmode = require

[users]
svc_api max_user_connections=50
analyst_priya max_user_connections=5`,
    },
    {
      type: 'heading',
      text: 'Production security checklist',
    },
    {
      type: 'paragraph',
      text: 'Use this checklist as a deployment gate for any PostgreSQL instance in a regulated environment. Every item should be verified before the instance is promoted to production.',
    },
    {
      type: 'table',
      caption: 'Pre-production verification (example status column for your runbooks)',
      headers: ['Category', 'Control', 'Status'],
      rows: [
        ['Authentication', 'scram-sha-256 enforced in pg_hba.conf', '☐ Todo'],
        ['Authentication', 'SSL/TLS required for all connections', '☐ Todo'],
        ['Authentication', 'Password rotation policy enforced', '☐ Todo'],
        ['Authentication', 'Superuser login restricted to local socket', '☐ Todo'],
        ['Authorisation', 'PUBLIC schema privileges revoked', '☐ Todo'],
        ['Authorisation', 'Principle of least privilege applied per role', '☐ Todo'],
        ['Authorisation', 'Row-level security enabled on sensitive tables', '☐ Todo'],
        ['Authorisation', 'No application user has SUPERUSER privilege', '☐ Todo'],
        ['Audit logging', 'pgaudit installed and configured', '☐ Todo'],
        ['Audit logging', 'pgaudit logs shipped to external SIEM', '☐ Todo'],
        ['Audit logging', 'Log retention meets regulatory minimum', '☐ Todo'],
        ['Encryption', 'SSL certificate valid and not self-signed (as required)', '☐ Todo'],
        ['Encryption', 'PII columns encrypted with pgcrypto (where mandated)', '☐ Todo'],
        ['Encryption', 'Storage-layer encryption enabled', '☐ Todo'],
        ['Encryption', 'Secrets managed via vault (not .pgpass files)', '☐ Todo'],
        ['Network', 'PostgreSQL not exposed to public internet', '☐ Todo'],
        ['Network', 'pg_hba.conf allows only known IP ranges', '☐ Todo'],
        ['Network', 'Connection pooler (PgBouncer) in front of DB', '☐ Todo'],
        ['Monitoring', 'Failed login alerts configured', '☐ Todo'],
        ['Monitoring', 'Privilege escalation alerts configured', '☐ Todo'],
      ],
    },
    {
      type: 'paragraph',
      text: 'Run this checklist against every PostgreSQL instance in your environment quarterly, not just at deployment. Configurations drift: a well-intentioned DBA adds a trust entry to pg_hba.conf for debugging and forgets to remove it. A compliance posture that was correct at deployment may not be correct six months later.',
    },
    {
      type: 'heading',
      text: 'Security on managed PostgreSQL services',
    },
    {
      type: 'paragraph',
      text: 'If you are running PostgreSQL on a managed service (AWS RDS, Azure Database for PostgreSQL, Google Cloud SQL), some controls are handled by the cloud provider and some require additional configuration:',
    },
    {
      type: 'bulletList',
      items: [
        'Storage encryption is enabled by default on major managed services; customer-managed keys are available where required.',
        'TLS is supported on all three; verify client trust stores and enforced SSL modes.',
        'pgaudit is available on RDS and Azure; logs ship to CloudWatch / Azure Monitor.',
        'RLS, column privileges, and role management work the same as self-managed PostgreSQL.',
        'Network isolation uses security groups, VNets, or VPC rules — must be explicitly configured.',
        'Superuser-equivalent roles may be restricted; some extension settings require parameter groups.',
      ],
    },
    {
      type: 'heading',
      text: 'Summary',
    },
    {
      type: 'paragraph',
      text: 'PostgreSQL has the native capabilities to satisfy the database security requirements of RBI, SEBI, IRDAI, HIPAA, and PCI DSS. The gap between a default PostgreSQL installation and a compliant one is almost entirely configuration. The four pillars — strong authentication with scram-sha-256 and TLS, least-privilege authorisation with role hierarchies and row-level security, comprehensive audit logging with pgaudit shipped to an external SIEM, and encryption at rest and in transit with proper key management — cover the database-level controls required by every major regulation relevant to Indian and global BFSI and healthcare organisations.',
    },
    {
      type: 'paragraph',
      text: 'Build these controls into your deployment process as non-negotiable gates, not as post-hoc remediation items. A PostgreSQL instance that reaches production without these controls is a compliance liability that is far more expensive to remediate under audit pressure than it would have been to configure correctly from the start.',
    },
    {
      type: 'paragraph',
      text: 'Written by the Sunfinity Data Engineering team.',
    },
  ],
}
