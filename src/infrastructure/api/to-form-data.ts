export type FilePart = {
  uri: string;
  name?: string;
  type?: "image/png" | "image/jpeg";
};

function appendValue(fd: FormData, key: string, value: any) {
  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((v, i) => {
      if (typeof v === "object" && v !== null) {
        Object.entries(v).forEach(([k, vv]) => {
          appendValue(fd, `${key}[${i}][${k}]`, vv);
        });
      } else {
        appendValue(fd, `${key}[${i}]`, v);
      }
    });
    return;
  }

  if (typeof value === "object") {
    Object.entries(value).forEach(([k, v]) => {
      appendValue(fd, `${key}[${k}]`, v);
    });
    return;
  }

  fd.append(key, String(value));
}

export function toFormData(
  fields: Record<string, any>,
  file?: { field: string; file: FilePart | null }
) {
  const fd = new FormData();

  Object.entries(fields).forEach(([k, v]) => {
    appendValue(fd, k, v);
  });

  if (file?.file?.uri) {
    const uri = file.file.uri;
    const name = file.file.name ?? uri.split("/").pop() ?? `upload_${Date.now()}.jpg`;
    const ext = name.split(".").pop()?.toLowerCase();
    const type = file.file.type ?? (ext === "png" ? "image/png" : "image/jpeg");

    fd.append(file.field, { uri, name, type } as any);
  }

  return fd;
}
