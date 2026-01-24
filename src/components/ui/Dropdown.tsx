"use client";

import { cn } from "@/lib/utils";
import { useControllableState, useOnClickOutside } from "@/lib/hooks";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface DropdownProps {
  label?: string;
  placeholder?: string;
  options?: DropdownOption[];
  items?: string[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  name?: string;
  disabled?: boolean;
  maxMenuHeight?: number;
  containerClassName?: string;
  menuClassName?: string;
  buttonClassName?: string;
  id?: string;
}

export const Dropdown = ({
  label = "Dropdown Label",
  placeholder = "Placeholder",
  options,
  items,
  value,
  defaultValue,
  onChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  name,
  disabled = false,
  maxMenuHeight = 340,
  containerClassName,
  menuClassName,
  buttonClassName,
  id: idProp,
}: DropdownProps) => {
  const builtOptions = useMemo<DropdownOption[]>(() => {
    if (options?.length) return options;
    if (items?.length) return items.map((item) => ({ label: item, value: item }));
    return [];
  }, [items, options]);

  const [selectedValue, setSelectedValue] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? "",
    onChange,
  });

  const [open, setOpen] = useControllableState<boolean>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const labelId = useId();
  const internalButtonId = useId();
  const buttonId = idProp ?? internalButtonId;
  const listboxId = useId();

  const selectedIndex = useMemo(
    () => builtOptions.findIndex((o) => o.value === selectedValue),
    [builtOptions, selectedValue]
  );
  const selectedOption = selectedIndex >= 0 ? builtOptions[selectedIndex] : undefined;

  const getNextEnabledIndex = (start: number, direction: 1 | -1) => {
    if (!builtOptions.length) return -1;

    let index = start;
    for (let i = 0; i < builtOptions.length; i++) {
      index = (index + direction + builtOptions.length) % builtOptions.length;
      if (!builtOptions[index]?.disabled) return index;
    }

    return -1;
  };

  const closeMenu = () => {
    setOpen(false);
    setActiveIndex(-1);
    buttonRef.current?.focus();
  };

  const openMenu = (preferredIndex?: number) => {
    if (disabled) return;
    setOpen(true);

    const initialIndex =
      typeof preferredIndex === "number"
        ? preferredIndex
        : selectedIndex >= 0
          ? selectedIndex
          : builtOptions.findIndex((o) => !o.disabled);

    setActiveIndex(initialIndex);
  };

  useOnClickOutside({
    ref: wrapperRef,
    when: open,
    handler: () => {
      setOpen(false);
      setActiveIndex(-1);
    },
  });

  useEffect(() => {
    if (!open) {
      setActiveIndex(-1);
      return;
    }
    if (activeIndex >= 0) return;

    const initialIndex =
      selectedIndex >= 0 ? selectedIndex : builtOptions.findIndex((o) => !o.disabled);
    setActiveIndex(initialIndex);
  }, [activeIndex, builtOptions, open, selectedIndex]);

  useEffect(() => {
    if (!open) return;
    if (activeIndex < 0) return;
    const element = optionRefs.current[activeIndex];
    element?.focus();
    element?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const onButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) return openMenu(selectedIndex >= 0 ? selectedIndex : getNextEnabledIndex(-1, 1));
      const next = getNextEnabledIndex(activeIndex, 1);
      setActiveIndex(next);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return openMenu(selectedIndex >= 0 ? selectedIndex : getNextEnabledIndex(0, -1));
      const prev = getNextEnabledIndex(activeIndex, -1);
      setActiveIndex(prev);
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) return closeMenu();
      return openMenu();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const onOptionKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = getNextEnabledIndex(index, 1);
      setActiveIndex(next);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = getNextEnabledIndex(index, -1);
      setActiveIndex(prev);
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(getNextEnabledIndex(-1, 1));
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(getNextEnabledIndex(0, -1));
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const option = builtOptions[index];
      if (!option?.disabled) setSelectedValue(option.value);
      closeMenu();
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key === "Tab") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={cn("flex flex-col items-start gap-2 w-[147px]", containerClassName)}
    >
      {label && (
        <span id={labelId} className="fontSize-body-sm-m text-gray-600">
          {label}
        </span>
      )}

      <div className="relative w-full">
        {name && <input type="hidden" name={name} value={selectedValue} />}

        <button
          ref={buttonRef}
          id={buttonId}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-labelledby={label ? `${labelId} ${buttonId}` : buttonId}
          onClick={() => (open ? closeMenu() : openMenu())}
          onKeyDown={onButtonKeyDown}
          className={cn(
            "flex w-full items-center gap-2 rounded-[5px] bg-gray-50 px-4 py-3 text-left",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-state-focus)]",
            disabled && "opacity-50 cursor-not-allowed",
            buttonClassName
          )}
        >
          <span
            className={cn(
              "flex-1 fontSize-body-m",
              selectedOption ? "text-gray-600" : "text-gray-300"
            )}
          >
            {selectedOption?.label ?? placeholder}
          </span>
          {open ? (
            <ChevronUpIcon className="w-6 h-6 text-secondary-indigo" />
          ) : (
            <ChevronDownIcon className="w-6 h-6 text-secondary-indigo" />
          )}
        </button>

        {open && (
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={label ? labelId : undefined}
            className={cn(
              "absolute left-0 right-0 z-50 mt-2 w-full rounded-[5px] border border-gray-300 bg-white px-3 py-4 shadow-[0px_8px_8px_rgba(0,0,0,0.05)]",
              menuClassName
            )}
            style={{ maxHeight: maxMenuHeight, overflowY: "auto" }}
          >
            <div className="flex flex-col gap-4">
              {builtOptions.map((option, index) => {
                const isActive = index === activeIndex;
                const isSelected = option.value === selectedValue;

                return (
                  <div key={option.value} className="flex flex-col gap-4">
                    <button
                      ref={(el) => {
                        optionRefs.current[index] = el;
                      }}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      disabled={option.disabled}
                      tabIndex={isActive ? 0 : -1}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        if (option.disabled) return;
                        setSelectedValue(option.value);
                        closeMenu();
                      }}
                      onKeyDown={(e) => onOptionKeyDown(e, index)}
                      className={cn(
                        "w-full text-left px-2 py-1 fontSize-body-m rounded-[5px]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-state-focus)]",
                        option.disabled && "cursor-not-allowed opacity-40",
                        isActive || isSelected
                          ? "font-bold text-secondary-indigo"
                          : "text-gray-600"
                      )}
                    >
                      {option.label}
                    </button>
                    {index < builtOptions.length - 1 && <span className="h-px w-full bg-gray-300" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
