import type { FieldValues, UseFormSetError } from "react-hook-form";

type Laravel422<T extends FieldValues> = {
  message?: string;
  errors?: Partial<Record<keyof T, string[]>>;
};

export function handleLaravel422<T extends FieldValues>(
  error: any,
  setError: UseFormSetError<T>,
  setServerError?: (msg: string | null) => void
): boolean {
  const status = error?.response?.status;
  const data = error?.response?.data as Laravel422<T> | undefined;

  if (status !== 422 || !data?.errors) {
    return false;
  }

  (Object.keys(data.errors) as Array<keyof T>).forEach((key) => {
    const firstMsg = data.errors?.[key]?.[0];
    if (firstMsg) {
      setError(key as any, { type: "server", message: firstMsg });
    }
  });

  if (data?.message && setServerError) {
    setServerError(data.message);
  }

  return true;
}
