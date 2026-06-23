#!/usr/bin/env python3

import os
import signal
import subprocess
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
PID_DIR = os.path.join(ROOT, ".pids")
BACKEND_DIR = os.path.join(ROOT, "backend")
FRONTEND_DIR = os.path.join(ROOT, "frontend")
BACKEND_LOG = os.path.join(PID_DIR, "backend.log")
FRONTEND_LOG = os.path.join(PID_DIR, "frontend.log")
BACKEND_PID = os.path.join(PID_DIR, "backend.pid")
FRONTEND_PID = os.path.join(PID_DIR, "frontend.pid")


def ensure_dirs():
    os.makedirs(PID_DIR, exist_ok=True)


def run_background(name, command, cwd, log_path, pid_path, env=None):
    ensure_dirs()
    with open(log_path, "a", encoding="utf-8") as log_file:
        process = subprocess.Popen(
            command,
            cwd=cwd,
            stdout=log_file,
            stderr=subprocess.STDOUT,
            env=env,
        )
    with open(pid_path, "w", encoding="utf-8") as pid_file:
        pid_file.write(str(process.pid))
    print(f"[{name}] started, pid={process.pid}")


def read_pid(pid_path):
    if not os.path.exists(pid_path):
        return None
    with open(pid_path, "r", encoding="utf-8") as pid_file:
        return int(pid_file.read().strip())


def is_running(pid):
    if pid is None:
        return False
    try:
        os.kill(pid, 0)
        return True
    except ProcessLookupError:
        return False
    except PermissionError:
        return True


def stop_process(name, pid_path):
    pid = read_pid(pid_path)
    if not pid or not is_running(pid):
        print(f"[{name}] not running")
        if os.path.exists(pid_path):
            os.remove(pid_path)
        return
    try:
        os.kill(pid, signal.SIGTERM)
        print(f"[{name}] stopping pid={pid}")
    except ProcessLookupError:
        pass
    finally:
        if os.path.exists(pid_path):
            os.remove(pid_path)


def start_backend():
    if is_running(read_pid(BACKEND_PID)):
        print("[backend] already running")
        return
    command = ["go", "run", "."]
    run_background("backend", command, BACKEND_DIR, BACKEND_LOG, BACKEND_PID)


def start_frontend():
    if is_running(read_pid(FRONTEND_PID)):
        print("[frontend] already running")
        return
    command = ["npm", "run", "dev", "--", "--host", "--port", "5173"]
    env = os.environ.copy()
    env["HOST"] = "0.0.0.0"
    run_background("frontend", command, FRONTEND_DIR, FRONTEND_LOG, FRONTEND_PID, env=env)


def start():
    start_backend()
    start_frontend()


def stop():
    stop_process("frontend", FRONTEND_PID)
    stop_process("backend", BACKEND_PID)


def restart():
    stop()
    start()


def logs(name):
    log_path = BACKEND_LOG if name == "backend" else FRONTEND_LOG
    print(f"[{name}] logs: {log_path}")
    if not os.path.exists(log_path):
        return
    with open(log_path, "r", encoding="utf-8") as log_file:
        print(log_file.read())


def status():
    backend_pid = read_pid(BACKEND_PID)
    frontend_pid = read_pid(FRONTEND_PID)
    print(f"backend  : running={is_running(backend_pid)} pid={backend_pid}")
    print(f"frontend : running={is_running(frontend_pid)} pid={frontend_pid}")


def build_frontend():
    if not os.path.exists(FRONTEND_DIR):
        print("frontend directory not found")
        sys.exit(1)
    subprocess.run(["npm", "run", "build"], cwd=FRONTEND_DIR, check=True)


def main():
    if len(sys.argv) < 2:
        print("usage: python manage.py start|stop|restart|status|logs backend|frontend|build")
        sys.exit(1)

    action = sys.argv[1].lower()
    target = sys.argv[2].lower() if len(sys.argv) > 2 else "all"

    if action == "start":
        if target == "backend":
            start_backend()
        elif target == "frontend":
            start_frontend()
        else:
            start()
    elif action == "stop":
        if target == "backend":
            stop_process("backend", BACKEND_PID)
        elif target == "frontend":
            stop_process("frontend", FRONTEND_PID)
        else:
            stop()
    elif action == "restart":
        if target == "backend":
            stop_process("backend", BACKEND_PID)
            start_backend()
        elif target == "frontend":
            stop_process("frontend", FRONTEND_PID)
            start_frontend()
        else:
            restart()
    elif action == "status":
        if target == "backend":
            print(f"backend  : running={is_running(read_pid(BACKEND_PID))} pid={read_pid(BACKEND_PID)}")
        elif target == "frontend":
            print(f"frontend : running={is_running(read_pid(FRONTEND_PID))} pid={read_pid(FRONTEND_PID)}")
        else:
            status()
    elif action == "logs":
        if target in ("backend", "frontend"):
            logs(target)
        else:
            logs("backend")
            logs("frontend")
    elif action == "build":
        build_frontend()
    else:
        print(f"unknown action: {action}")
        sys.exit(1)


if __name__ == "__main__":
    main()
