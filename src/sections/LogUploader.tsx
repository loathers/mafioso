import logStore from "../store/logStore";

import combineClassnames from "../utilities/combineClassnames";

function onUpload(evt: React.SyntheticEvent<HTMLElement>) {
  ignoreEvent(evt);
  let uploadedFiles: FileList | null = null;

  if (evt instanceof DragEvent) {
    uploadedFiles = evt.dataTransfer?.files ?? null;
  } else if (evt.currentTarget instanceof HTMLInputElement) {
    uploadedFiles = evt.currentTarget.files;
  }

  if (!uploadedFiles || uploadedFiles.length <= 0) {
    console.warn("No file uploaded.");
    return;
  }

  logStore.handleUpload(uploadedFiles);
}

function ignoreEvent(evt: React.SyntheticEvent<HTMLElement>) {
  evt.preventDefault();
  evt.stopPropagation();
}

type Props = {
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export default function LogUploader({
  className,
  disabled,
  style,
  children,
}: Props) {
  return (
    <form
      onDrop={(evt) => {
        onUpload(evt);
      }}
      onDragOver={(e) => {
        ignoreEvent(e);
      }}
      id="upload-component"
      data-componentstate={disabled ? "disabled" : "enabled"}
      style={style}
      className={combineClassnames("flex-col boxsizing-border", className)}
    >
      <label
        className={combineClassnames(
          "borradius-2 talign-center whitespace-pre-wrap pad-4 flex-auto",
        )}
        htmlFor="log-uploader"
      >
        {children}
      </label>

      <input
        disabled={disabled}
        style={{
          width: 0.1,
          height: 0.1,
          opacity: 0,
          overflow: "hidden",
          position: "absolute",
          zIndex: -1,
        }}
        multiple
        onChange={onUpload}
        accept=".txt"
        type="file"
        id="log-uploader"
      />
    </form>
  );
}
