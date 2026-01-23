import { cn } from "@/lib/utils";
import { EditIcon, CodeIcon, TrashIcon, CheckIcon } from "@/components/icons";
import { Checkbox } from "./Checkbox";

type TodoStatus =
  | "adding"
  | "typing"
  | "checkable"
  | "checked"
  | "completed"
  | "failed";

interface TodoItem {
  id: string;
  text: string;
  status: TodoStatus;
}

interface TodoListProps {
  items?: TodoItem[];
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
    container: "bg-[#4C79FF] text-white",
    text: "text-white",
    icon: "text-white/80",
  },
  typing: {
    container: "bg-[#4C79FF] text-white",
    text: "text-white",
    icon: "text-white/80",
  },
  checkable: {
    container: "bg-[#4C79FF] text-white",
    text: "text-white",
    icon: "text-white/80",
  },
  checked: {
    container: "bg-[#969DA8] text-white",
    text: "text-white",
    icon: "text-white/80",
  },
  completed: {
    container: "bg-[#4C79FF] text-white",
    text: "text-white",
    icon: "text-white/80",
  },
  failed: {
    container: "bg-[#E5E7EB]",
    text: "text-[#969DA8]",
    icon: "text-[#CCD0D6]",
  },
};

const TodoRow = ({ item }: { item: TodoItem }) => {
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
        <CodeIcon/>
      </div>
      <div className={cn("flex items-center gap-3 flex-1 fontSize-body-s", styles.text)}>
        <span>{item.text}</span>
        {showTypingCheck && (
          <>
            <span className="w-px h-[18px] bg-white/80" />
            <CheckIcon/>
          </>
        )}
      </div>
      {showActions && (
        <div className="flex items-center gap-3">
          <button type="button" className="text-white hover:text-white/80">
            <EditIcon/>
          </button>
          <button type="button" className="text-white hover:text-white/80">
            <TrashIcon/>
          </button>
        </div>
      )}
      {showCheckbox && <Checkbox checked={isChecked} color="white" size={36} />}
    </div>
  );
};

export const TodoList = ({ items = defaultItems, className }: TodoListProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[608px] min-h-[552px] rounded-[5px] p-5 flex flex-col gap-4",
        className
      )}
    >
      {items.map((item) => (
        <TodoRow key={item.id} item={item} />
      ))}
    </div>
  );
};
