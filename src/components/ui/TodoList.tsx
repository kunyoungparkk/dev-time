"use client";

import { cn } from "@/lib/utils";
import { EditIcon, CodeIcon, TrashIcon, CheckIcon } from "@/components/icons";
import { Checkbox } from "./Checkbox";

export type TodoStatus =
  | "adding"
  | "typing"
  | "checkable"
  | "checked"
  | "completed"
  | "failed";

export interface TodoItem {
  id: string;
  text: string;
  status: TodoStatus;
}

export interface TodoListProps {
  items?: TodoItem[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleCheck?: (id: string) => void;
  className?: string;
}

const defaultItems: TodoItem[] = [
  { id: "adding", text: "TODO List Item", status: "adding" },
  { id: "typing", text: "Typing", status: "typing" },
  { id: "checkable", text: "TODO List Item", status: "checkable" },
  { id: "checked", text: "TODO List Item", status: "checked" },
  { id: "completed", text: "TODO List Item", status: "completed" },
  { id: "failed", text: "TODO List Item", status: "failed" },
];

const statusStyles: Record<TodoStatus, { container: string; text: string; icon: string }> = {
  adding: {
    container: "bg-primary text-white",
    text: "text-white",
    icon: "text-white/80",
  },
  typing: {
    container: "bg-primary text-white",
    text: "text-white",
    icon: "text-white/80",
  },
  checkable: {
    container: "bg-primary text-white",
    text: "text-white",
    icon: "text-white/80",
  },
  checked: {
    container: "bg-gray-400 text-white",
    text: "text-white",
    icon: "text-white/80",
  },
  completed: {
    container: "bg-primary text-white",
    text: "text-white",
    icon: "text-white/80",
  },
  failed: {
    container: "bg-gray-200",
    text: "text-gray-400",
    icon: "text-gray-300",
  },
};

const TodoRow = ({
  item,
  onEdit,
  onDelete,
  onToggleCheck,
}: {
  item: TodoItem;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleCheck?: () => void;
}) => {
  const styles = statusStyles[item.status];
  const showActions = item.status === "adding";
  const showTypingCheck = item.status === "typing";
  const showCheckbox = item.status === "checkable" || item.status === "checked";
  const isChecked = item.status === "checked";

  return (
    <div
      className={cn(
        "flex items-center gap-4 h-[72px] px-6 rounded-[8px] shadow-[0px_8px_8px_rgba(0,0,0,0.05)]",
        styles.container
      )}
    >
      <div className={cn("w-[42px] h-[20px] flex items-center justify-center", styles.icon)}>
        <CodeIcon />
      </div>
      <div className={cn("flex items-center gap-3 flex-1 fontSize-body-s", styles.text)}>
        <span>{item.text}</span>
        {showTypingCheck && (
          <>
            <span className="w-px h-[18px] bg-white/80" />
            <CheckIcon />
          </>
        )}
      </div>
      {showActions && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onEdit}
            className="text-white hover:text-white/80"
            aria-label="Edit todo"
          >
            <EditIcon />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="text-white hover:text-white/80"
            aria-label="Delete todo"
          >
            <TrashIcon />
          </button>
        </div>
      )}
      {showCheckbox && (
        <Checkbox checked={isChecked} onChange={onToggleCheck} color="white" size={36} />
      )}
    </div>
  );
};

export const TodoList = ({
  items = defaultItems,
  onEdit,
  onDelete,
  onToggleCheck,
  className,
}: TodoListProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[608px] min-h-[552px] rounded-[5px] p-5 flex flex-col gap-4",
        className
      )}
    >
      {items.map((item) => (
        <TodoRow
          key={item.id}
          item={item}
          onEdit={() => onEdit?.(item.id)}
          onDelete={() => onDelete?.(item.id)}
          onToggleCheck={() => onToggleCheck?.(item.id)}
        />
      ))}
    </div>
  );
};
