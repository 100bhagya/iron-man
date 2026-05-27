"use client";

import { MessageCircle, Sparkles, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { assistantConfig } from "@/config/assistant";
import { playSoftBell, unlockAudio } from "@/lib/play-soft-bell";
import { cn } from "@/lib/utils";

export function AssistantChatWidget() {
  const [open, setOpen] = useState(false);
  const userInteractedRef = useRef(false);

  const close = useCallback(() => {
    userInteractedRef.current = true;
    setOpen(false);
  }, []);

  const openAssistant = useCallback(() => {
    unlockAudio();
    setOpen(true);
    requestAnimationFrame(() => playSoftBell());
  }, []);

  const toggle = useCallback(() => {
    userInteractedRef.current = true;
    setOpen((prev) => {
      if (prev) return false;
      openAssistant();
      return true;
    });
  }, [openAssistant]);

  useEffect(() => {
    const onInteract = () => unlockAudio();
    window.addEventListener("pointerdown", onInteract, { passive: true });
    window.addEventListener("keydown", onInteract);
    window.addEventListener("scroll", onInteract, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("scroll", onInteract);
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(assistantConfig.autoOpenSessionKey) === "true") {
      return;
    }

    const timer = window.setTimeout(() => {
      if (userInteractedRef.current) return;

      sessionStorage.setItem(assistantConfig.autoOpenSessionKey, "true");
      unlockAudio();
      setOpen(true);
      requestAnimationFrame(() => playSoftBell());
    }, assistantConfig.autoOpenDelayMs);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const panelStyle = {
    "--assistant-width": `${assistantConfig.panelWidthPx}px`,
    "--assistant-height": `${assistantConfig.panelHeightPx}px`,
  } as CSSProperties;

  return (
    <div
      className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
      data-assistant-widget
    >
      <div
        role="dialog"
        aria-label={assistantConfig.title}
        aria-hidden={!open}
        className={cn(
          "origin-bottom-right w-[min(var(--assistant-width),calc(100vw-2rem))] transition-all duration-300 ease-out",
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "hidden scale-95 opacity-0"
        )}
        style={panelStyle}
      >
        <div
          className={cn(
            "flex flex-col overflow-hidden rounded-2xl border border-primary/25",
            "bg-card/95 shadow-[0_0_56px_-12px_var(--glow)] backdrop-blur-md"
          )}
        >
          <header className="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <Sparkles className="size-3.5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-tight">
                  {assistantConfig.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {assistantConfig.subtitle}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
              aria-label="Close chat"
            >
              <X className="size-4" aria-hidden />
            </button>
          </header>

          <iframe
            src={assistantConfig.embedUrl}
            title={assistantConfig.title}
            className="h-[min(var(--assistant-height),calc(100dvh-7rem))] w-full border-0 bg-background"
            allow="microphone"
            loading="lazy"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
        aria-expanded={open}
        className={cn(
          "pointer-events-auto relative flex size-14 items-center justify-center rounded-full",
          "border border-primary/40 bg-primary text-primary-foreground",
          "shadow-[0_0_32px_-6px_var(--glow)] transition-all",
          "hover:scale-105 hover:shadow-[0_0_40px_-4px_var(--glow)]",
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          open && "bg-card text-primary hover:bg-card"
        )}
      >
        {open ? (
          <X className="size-6" aria-hidden />
        ) : (
          <>
            <MessageCircle className="size-6" aria-hidden />
            <span
              className="absolute top-1 right-1 size-2.5 rounded-full bg-primary-foreground ring-2 ring-primary"
              aria-hidden
            />
          </>
        )}
      </button>
    </div>
  );
}
