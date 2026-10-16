#!/usr/bin/env python3
"""Run commands on the deployment VPS over SSH, without needing sshpass.

Used by the deploy workflow here; not part of the shipped app. Credentials come
from the environment so they never appear in a shell history or a committed file:

    VPS_HOST, VPS_PORT, VPS_USER, VPS_PASS

Usage:
    ./deploy/vps.py "uname -a"
    ./deploy/vps.py --upload deploy/deploy.sh /tmp/deploy.sh
    ./deploy/vps.py --stdin-file commands.txt
"""
import argparse
import os
import shlex
import sys

import paramiko

HOST = os.environ.get("VPS_HOST", "176.122.171.38")
PORT = int(os.environ.get("VPS_PORT", "22"))
USER = os.environ.get("VPS_USER", "root")
PASSWORD = os.environ.get("VPS_PASS", "")


def connect() -> paramiko.SSHClient:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(
        hostname=HOST,
        port=PORT,
        username=USER,
        password=PASSWORD,
        timeout=30,
        allow_agent=False,
        look_for_keys=False,
    )
    return client


def run(client, command: str) -> int:
    stdin, stdout, stderr = client.exec_command(command, timeout=7200, get_pty=False)
    # Stream so long builds show progress rather than appearing to hang.
    for line in iter(stdout.readline, ""):
        sys.stdout.write(line)
        sys.stdout.flush()
    err = stderr.read().decode("utf-8", "replace")
    if err.strip():
        sys.stderr.write(err)
    return stdout.channel.recv_exit_status()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("command", nargs="?")
    parser.add_argument("--upload", nargs=2, metavar=("LOCAL", "REMOTE"))
    parser.add_argument("--download", nargs=2, metavar=("REMOTE", "LOCAL"))
    parser.add_argument("--stdin-file", metavar="PATH")
    args = parser.parse_args()

    if not PASSWORD:
        print("VPS_PASS is not set", file=sys.stderr)
        return 2

    client = connect()
    try:
        if args.upload:
            local, remote = args.upload
            sftp = client.open_sftp()
            sftp.put(local, remote)
            sftp.close()
            print(f"uploaded {local} -> {remote}", file=sys.stderr)
            return 0
        if args.download:
            remote, local = args.download
            sftp = client.open_sftp()
            sftp.get(remote, local)
            sftp.close()
            print(f"downloaded {remote} -> {local}", file=sys.stderr)
            return 0
        if args.stdin_file:
            with open(args.stdin_file) as handle:
                command = handle.read()
            return run(client, command)
        if not args.command:
            parser.error("a command is required")
        return run(client, args.command)
    finally:
        client.close()


if __name__ == "__main__":
    sys.exit(main())
