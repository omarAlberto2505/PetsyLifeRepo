"use client";

import { ListBox, Select, useFilter } from "@heroui/react";
import { useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * The key type react-aria collections accept. Deliberately not React's own `Key`,
 * which also allows `bigint` and `symbol`.
 */
export type AutocompleteSearchKey = string | number;

/** The minimum shape an option needs to be rendered by this component. */
export type AutocompleteSearchItem = { id: AutocompleteSearchKey; name: string };

type AutocompleteSearchProps<T extends AutocompleteSearchItem> = {
  /** Options to offer. `null` / `undefined` is treated the same as empty. */
  items: T[] | null | undefined;
  /** The selected option's `id`, or `null` when nothing is selected. */
  value: T["id"] | null;
  onChange: (value: T["id"] | null) => void;
  /**
   * Required — the control renders no visible `<label>` of its own, so compose it
   * with whatever label element the surrounding form already uses.
   */
  "aria-label": string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  /** Shows `loadingMessage` instead of `emptyMessage` while the options load. */
  isPending?: boolean;
  isDisabled?: boolean;
  className?: string;
  /** Override an option's appearance. Defaults to `item.name`. */
  renderItem?: (item: T) => ReactNode;
};

/**
 * A searchable single-select.
 *
 * Built on HeroUI's `Select` rather than its `Autocomplete` on purpose. The
 * `Autocomplete` remounts react-aria's `useAutocomplete` on every open and its
 * popover has a hard `width: var(--trigger-width)` that HeroUI only fills in
 * after a `ResizeObserver` fires, so each open paints at the wrong width and then
 * snaps. `Select` has neither problem — the filtering here is a plain `useMemo`
 * over the options.
 *
 * The trade-off is accessibility: without `useAutocomplete` there is no virtual
 * focus or `aria-activedescendant`, so the keyboard handling below is wired by
 * hand and a screen reader will not announce the filtered count.
 */
export default function AutocompleteSearch<T extends AutocompleteSearchItem>({
  items,
  value,
  onChange,
  placeholder = "Select one",
  searchPlaceholder = "Search...",
  emptyMessage = "No results",
  loadingMessage = "Loading...",
  isPending = false,
  isDisabled = false,
  className,
  renderItem,
  "aria-label": ariaLabel,
}: AutocompleteSearchProps<T>) {
  // `sensitivity: "base"` ignores case *and* accents, so "jose" matches "José".
  // The hook memoises its Intl.Collator, so this is not rebuilt per render.
  const { contains } = useFilter({ sensitivity: "base" });

  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [lastPicked, setLastPicked] = useState<T | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const options = useMemo(() => items ?? [], [items]);

  /**
   * react-aria matches collection keys with `===`, so a numeric `id` paired with a
   * string `value` (or the reverse) would silently select nothing. Resolve the
   * value against the options by string form instead of trusting them to line up.
   *
   * The `lastPicked` fallback covers a `value` the caller set from outside the option
   * list, which would otherwise leave the trigger showing the placeholder.
   */
  const selectedItem = useMemo(() => {
    if (value === null || value === undefined) return null;

    const match = options.find((item) => String(item.id) === String(value));
    if (match) return match;

    return lastPicked && String(lastPicked.id) === String(value) ? lastPicked : null;
  }, [lastPicked, options, value]);

  const matches = useMemo(() => {
    if (!query) return options;
    return options.filter((item) => contains(item.name, query));
  }, [contains, options, query]);

  function handleOpenChange(open: boolean) {
    setOpen(open);
    // Reset the search so reopening always starts from the full list.
    if (!open) setQuery("");
  }

  // Remembers the whole option, not just its id, so the trigger can still label a
  // selection that the current search results no longer contain.
  function pick(id: T["id"] | null) {
    setLastPicked(options.find((item) => String(item.id) === String(id)) ?? null);
    onChange(id);
  }

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      // Hand off to the ListBox, which owns arrow-key navigation from here.
      event.preventDefault();
      listRef.current?.querySelector<HTMLElement>('[role="listbox"]')?.focus();
      return;
    }

    if (event.key === "Enter" && matches.length > 0) {
      event.preventDefault();
      pick(matches[0].id as T["id"]);
      handleOpenChange(false);
    }
  }

  return (
    <Select
      aria-label={ariaLabel}
      className={className}
      isDisabled={isDisabled}
      isOpen={isOpen}
      placeholder={placeholder}
      value={selectedItem?.id ?? null}
      // Keeps the popover open when the search matches nothing, so it can show
      // `emptyMessage` rather than snapping shut mid-search.
      allowsEmptyCollection
      onChange={(key) => pick(key as T["id"] | null)}
      onOpenChange={handleOpenChange}
    >
      <Select.Trigger>
        {/*
          The trigger text comes from our own `selectedItem`, not from react-aria's
          collection. Filtering shrinks the collection, and react-aria renders the
          placeholder for a key it can no longer find — which would blank the
          trigger out while you type.
        */}
        <Select.Value>
          {() =>
            selectedItem
              ? renderItem
                ? renderItem(selectedItem)
                : selectedItem.name
              : placeholder
          }
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
        <div ref={listRef} className="flex min-h-0 flex-col">
          <input
            aria-label={`Search ${ariaLabel}`}
            autoFocus
            className="w-full shrink-0 border-b border-(--color-card-divider) bg-transparent px-3 py-2 text-sm text-(--color-primary-text) outline-none placeholder:text-(--color-muted-text)"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleSearchKeyDown}
          />

          <ListBox
            aria-label={ariaLabel}
            className="min-h-0 flex-1 overflow-y-auto"
            items={matches}
            // react-aria caches rendered items by identity. Listing `renderItem`
            // here stops it serving a stale row when that closure changes — wrap
            // an inline `renderItem` in `useCallback` if the list is long, or the
            // cache is invalidated on every render.
            dependencies={[renderItem]}
            renderEmptyState={() => (
              <div className="px-3 py-2 text-sm text-(--color-muted-text)">
                {isPending ? loadingMessage : emptyMessage}
              </div>
            )}
          >
            {(item) => (
              <ListBox.Item id={item.id} textValue={item.name}>
                {renderItem ? renderItem(item) : item.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            )}
          </ListBox>
        </div>
      </Select.Popover>
    </Select>
  );
}
