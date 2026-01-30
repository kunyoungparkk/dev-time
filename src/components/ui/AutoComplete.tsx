"use client";

import { cn } from "@/lib/utils";
import { useControllableState, useOnClickOutside } from "@/lib/hooks";
import { PlusIcon } from "@/components/icons";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export interface AutoCompleteOption {
  label: string;
  value: string;
}

export interface AutoCompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  options?: AutoCompleteOption[];
  suggestions?: string[];
  onOptionSelect?: (option: AutoCompleteOption) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  allowCreate?: boolean;
  onCreate?: (value: string) => void;
  createLabel?: string;
  openOnFocus?: boolean;
  maxMenuHeight?: number;
  containerClassName?: string;
  menuClassName?: string;
}

export const AutoComplete = ({
  label = "Autocomplete Label",
  placeholder = "Placeholder",
  options,
  suggestions,
  onOptionSelect,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  allowCreate = false,
  onCreate,
  createLabel = "Add New Item",
  openOnFocus = false,
  maxMenuHeight = 196,
  containerClassName,
  menuClassName,
  onKeyDown,
  onFocus,
  onBlur,
  onChange,
  className,
  id: idProp,
  value,
  defaultValue,
  ...inputProps
}: AutoCompleteProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const labelId = useId();
  const internalInputId = useId();
  const inputId = idProp ?? internalInputId;
  const listboxId = useId();

  const builtOptions = useMemo<AutoCompleteOption[]>(() => {
    if (options?.length) return options;
    if (!suggestions?.length) return [];
    return suggestions.map((item) => ({ label: item, value: item }));
  }, [options, suggestions]);

  const [inputValue, setInputValue] = useState<string>(
    (value ?? defaultValue ?? "") as string
  );

  const [open, setOpen] = useControllableState<boolean>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const disabled = Boolean(inputProps.disabled);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const currentValue = value !== undefined ? String(value) : inputValue;

  const filtered = useMemo(() => {
    const query = currentValue.trim().toLowerCase();
    if (!query) return [];
    return builtOptions.filter((o) => o.label.toLowerCase().includes(query));
  }, [builtOptions, currentValue]);

  const showCreate = allowCreate && currentValue.trim().length > 0 && filtered.length === 0;
  const showMenu = open && (filtered.length > 0 || showCreate);

  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const setActiveAndScroll = (index: number) => {
    setActiveIndex(index);
    const element = optionRefs.current[index];
    element?.scrollIntoView({ block: "nearest" });
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
    if (filtered.length === 0) return;
    setActiveIndex(0);
  }, [activeIndex, filtered.length, open]);

  const openMenu = () => {
    if (disabled) return;
    setOpen(true);
    setActiveIndex(filtered.length > 0 ? 0 : -1);
  };

  const closeMenu = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const commitSelection = (option: AutoCompleteOption) => {
    const newValue = option.label;
    if (value === undefined) {
      setInputValue(newValue);
    }
    const syntheticEvent = {
      target: { value: newValue },
      currentTarget: { value: newValue },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
    onOptionSelect?.(option);
    closeMenu();
    inputRef.current?.focus();
  };

  return (
    <div
      ref={wrapperRef}
      className={cn("flex flex-col items-start gap-2 w-[156px]", containerClassName)}
    >
      {label && (
        <label id={labelId} htmlFor={inputId} className="fontSize-body-sm-m text-gray-600">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          ref={inputRef}
          id={inputId}
          value={currentValue}
          disabled={disabled}
          onFocus={(e) => {
            onFocus?.(e);
            if (e.defaultPrevented) return;
            if (disabled) return;
            if (openOnFocus) openMenu();
          }}
          onChange={(e) => {
            const next = e.target.value;
            if (value === undefined) {
              setInputValue(next);
            }
            onChange?.(e);

            if (!next.trim()) {
              closeMenu();
              return;
            }

            const query = next.trim().toLowerCase();
            const nextFiltered = builtOptions.filter((o) =>
              o.label.toLowerCase().includes(query)
            );

            setOpen(true);
            setActiveIndex(nextFiltered.length > 0 ? 0 : -1);
          }}
          onKeyDown={(e) => {
            onKeyDown?.(e);
            if (e.defaultPrevented) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              if (!showMenu) openMenu();
              if (filtered.length === 0) return;
              const next = Math.min(activeIndex + 1, filtered.length - 1);
              setActiveAndScroll(next);
              return;
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              if (!showMenu) openMenu();
              if (filtered.length === 0) return;
              const next = Math.max(activeIndex - 1, 0);
              setActiveAndScroll(next);
              return;
            }

            if (e.key === "Enter") {
              if (!showMenu) return;
              e.preventDefault();
              const option = filtered[activeIndex];
              if (option) return commitSelection(option);
              if (showCreate) onCreate?.(currentValue.trim());
              closeMenu();
              return;
            }

            if (e.key === "Escape") {
              e.preventDefault();
              closeMenu();
            }
          }}
          onBlur={(e) => {
            onBlur?.(e);
            if (e.defaultPrevented) return;
            requestAnimationFrame(() => {
              const wrapper = wrapperRef.current;
              const activeElement = document.activeElement;
              if (!wrapper || !(activeElement instanceof Node)) {
                closeMenu();
                return;
              }
              if (!wrapper.contains(activeElement)) closeMenu();
            });
          }}
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={showMenu}
          aria-labelledby={label ? labelId : undefined}
          aria-activedescendant={activeIndex >= 0 ? optionId(activeIndex) : undefined}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-[5px] bg-gray-50 px-4 py-3 fontSize-body-m text-gray-800",
            "placeholder:text-gray-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-state-focus",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...inputProps}
        />

        {showMenu && (
          <div
            id={listboxId}
            role="listbox"
            className={cn(
              "absolute left-0 right-0 z-50 mt-2 w-full rounded-[5px] border border-gray-300 bg-white px-3 py-4 shadow-[0px_8px_8px_rgba(0,0,0,0.05)]",
              menuClassName
            )}
            style={{ maxHeight: maxMenuHeight, overflowY: "auto" }}
          >
            {filtered.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filtered.map((option, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={option.value}
                      ref={(el) => {
                        optionRefs.current[index] = el;
                      }}
                      id={optionId(index)}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => commitSelection(option)}
                      className={cn(
                        "w-full text-left fontSize-body-s px-2 py-1 rounded-[5px]",
                        isActive ? "bg-gray-100 text-gray-800" : "text-gray-800",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-state-focus"
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onCreate?.(currentValue.trim())}
                className="flex w-full items-center gap-1 rounded-[5px] px-2 py-1 text-secondary-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-state-focus"
              >
                <PlusIcon size={20} className="text-secondary-indigo" />
                <span className="fontSize-body-s">{createLabel}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
