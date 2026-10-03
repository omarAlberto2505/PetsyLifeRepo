"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export type RemoteSearchItem = { id: number | string; name: string };

type RemoteSearchFieldProps<T extends RemoteSearchItem> = {
  /**
   * Runs the search. The signal is aborted as soon as the term changes, so a slow
   * response for an old term can never overwrite a newer one.
   */
  search: (term: string, signal: AbortSignal) => Promise<T[]>;
  /** `null` means nothing is selected, or that the "not found" option was chosen. */
  value: T["id"] | null;
  onChange: (value: T["id"] | null, item: T | null) => void;
  /** Required — the field renders no visible `<label>` of its own. */
  "aria-label": string;
  /**
   * Re-runs the search when any of these change, for a term that only makes sense
   * against something else the form holds (a parent species, say). Keep it a fixed
   * length.
   */
  deps?: unknown[];
  /**
   * Offered as a selectable row only when a completed search came back with nothing.
   * Choosing it reports `null`, so store it as "no value recorded".
   */
  notFoundLabel?: string;
  placeholder?: string;
  isDisabled?: boolean;
  debounceMs?: number;
  className?: string;
};

/**
 * A text field that searches on the server as you type, rather than a picker that
 * opens onto a list. Use it when the full option list is too large to ship to the
 * browser — the breed catalog runs to ~790 rows for a single species.
 *
 * It is a combobox: the input is the field, and results appear beneath it. Editing the
 * text clears the current selection, so `value` and what is on screen never disagree.
 */
export default function RemoteSearchField<T extends RemoteSearchItem>({
  search,
  value,
  onChange,
  deps = [],
  notFoundLabel = "Other",
  placeholder = "Type to search...",
  isDisabled = false,
  debounceMs = 250,
  className,
  "aria-label": ariaLabel,
}: RemoteSearchFieldProps<T>) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [isPending, setPending] = useState(false);
  // Distinguishes "no search has completed yet" from "a search found nothing", so the
  // not-found row is only offered once we actually know there are no matches.
  const [hasSearched, setSearched] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  // Held in a ref so an inline `search` prop cannot restart the debounce on every
  // render of the parent.
  const searchRef = useRef(search);
  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  useEffect(() => {
    if (isDisabled) return;

    const controller = new AbortController();
    const handle = setTimeout(async () => {
      setPending(true);
      try {
        const found = await searchRef.current(term, controller.signal);
        if (controller.signal.aborted) return;
        setResults(found);
        setSearched(true);
        setHighlight(0);
      } catch (error) {
        // An abort is the expected outcome of typing another character.
        if (controller.signal.aborted) return;
        console.error("Search failed", error);
        setResults([]);
        setSearched(true);
      } finally {
        if (!controller.signal.aborted) setPending(false);
      }
    }, debounceMs);

    return () => {
      clearTimeout(handle);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceMs, isDisabled, term, ...deps]);

  // Close when focus or a click leaves the field entirely.
  useEffect(() => {
    if (!isOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  // The not-found row stands in for the whole list, so the two are never both shown.
  const showNotFound = hasSearched && !isPending && results.length === 0;
  const rowCount = showNotFound ? 1 : results.length;

  function pick(item: T | null) {
    setTerm(item ? item.name : notFoundLabel);
    setOpen(false);
    onChange(item ? (item.id as T["id"]) : null, item);
  }

  function handleChange(next: string) {
    setTerm(next);
    setOpen(true);
    // Editing invalidates the selection: the text no longer describes `value`.
    if (value !== null) onChange(null, null);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        setOpen(true);
        return;
      }
      if (rowCount === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setHighlight((current) => (current + step + rowCount) % rowCount);
      return;
    }

    if (event.key === "Enter" && isOpen && rowCount > 0) {
      event.preventDefault();
      pick(showNotFound ? null : (results[highlight] ?? null));
    }
  }

  const activeId = isOpen && rowCount > 0 ? `${listId}-${highlight}` : undefined;

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <input
        aria-activedescendant={activeId}
        aria-autocomplete="list"
        aria-controls={listId}
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className="h-10 w-full rounded-lg border border-(--color-border) bg-(--color-card-surface) px-3 text-sm text-(--color-primary-text) outline-none placeholder:text-(--color-muted-text) focus:border-(--color-primary-blue) focus:ring-2 focus:ring-(--color-card-icon-background) disabled:opacity-50"
        disabled={isDisabled}
        placeholder={placeholder}
        role="combobox"
        value={term}
        onChange={(event) => handleChange(event.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {isOpen && (
        <div className="absolute z-40 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-(--color-card-border) bg-(--color-card-surface) py-1 shadow-[0_8px_30px_var(--color-card-shadow)]">
          <ul aria-label={ariaLabel} id={listId} >
            {isPending && (
              <li className="px-3 py-2 text-sm text-(--color-muted-text)" role="presentation">
                Searching...
              </li>
            )}

            {!isPending &&
              results.map((item, index) => (
                // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
<li
                  key={item.id}
                  // aria-selected={String(item.id) === String(value)}
                  className={`cursor-pointer px-3 py-2 text-sm text-(--color-primary-text) ${
                    index === highlight ? "bg-card-hover-background" : ""
                  }`}
                  id={`${listId}-${index}`}
                  onPointerDown={(event) => {
                    // Keep the input from blurring before the click registers.
                    event.preventDefault();
                    pick(item);
                  }}
                  onPointerEnter={() => setHighlight(index)}
                >
                  {item.name}
                </li>
              ))}

            {showNotFound && (
              <li
                // aria-selected={false}
                className={`cursor-pointer px-3 py-2 text-sm text-(--color-primary-text) ${
                  highlight === 0 ? "bg-(--color-card-hover-background)" : ""
                }`}
                id={`${listId}-0`}
                // role="option"
                onPointerDown={(event) => {
                  event.preventDefault();
                  pick(null);
                }}
              >
                {notFoundLabel}
                <span className="ml-2 text-xs text-(--color-muted-text)">
                  no match for &ldquo;{term}&rdquo;
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
