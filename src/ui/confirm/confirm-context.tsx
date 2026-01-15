import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import clsx from "clsx";

type ConfirmOptions = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
};

type ConfirmContextValue = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

type Pending = {
  options: Required<Pick<ConfirmOptions, "title">> & ConfirmOptions;
  resolve: (v: boolean) => void;
};

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<Pending | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setPending({
        options: {
          title: options.title,
          description: options.description,
          confirmText: options.confirmText ?? "OK",
          cancelText: options.cancelText ?? "Anuluj",
          destructive: options.destructive ?? false,
        },
        resolve,
      });
    });
  }, []);

  const close = useCallback((value: boolean) => {
    setPending((p) => {
      if (!p) {
        return null;
      }
      
      p.resolve(value);
      
      return null;
    });
  }, []);

  const value = useMemo<ConfirmContextValue>(() => ({ confirm }), [confirm]);

  const destructive = !!pending?.options.destructive;

  return (
    <ConfirmContext.Provider value={value}>
      {children}

      <Modal
        visible={!!pending}
        transparent
        animationType="fade"
        onRequestClose={() => close(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/60 px-6">
        
          <View className="w-full rounded-3xl border border-white/10 bg-card p-5">
            <Text className="text-lg font-bold text-text">
              {pending?.options.title ?? ""}
            </Text>

            {pending?.options.description ? (
              <Text className="mt-2 text-muted">{pending.options.description}</Text>
            ) : null}

            <View className="mt-5 flex-row gap-3">
              <Pressable
                onPress={() => close(false)}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3"
              >
                <Text className="text-center font-bold text-text">
                  {pending?.options.cancelText ?? ""}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => close(true)}
                className={clsx(
                  "flex-1 rounded-2xl border py-3",
                  destructive ? "border-danger/30 bg-danger/15" : "border-white/10 bg-white/10"
                )}
              >
                <Text
                  className={clsx(
                    "text-center font-bold",
                    destructive ? "text-danger" : "text-text"
                  )}
                >
                  {pending?.options.confirmText ?? ""}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  
  if (!ctx) {
    throw new Error("useConfirm must be used within ConfirmProvider");
  }
  
  return ctx.confirm;
}