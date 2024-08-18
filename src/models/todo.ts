import { Priority } from "./priority";
import { Status } from "./status";

export interface AuditLog {
  timestamp: string;
  action: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  auditLogs: AuditLog[];
  check: boolean;
}