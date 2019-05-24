import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const Uploader = props => {
  const maxSize = 1048576;

  const [files, setFiles] = useState([]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    rejectedFiles
  } = useDropzone({
    accept: "image/png, image/jpg, image/jpeg",
    minSize: 0,
    maxSize,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    }
  });

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} alt="User uploads" style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container text-center mt-5">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {!isDragActive && "Click me or drag a file to upload!"}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "Only .png, .jpg and .jpeg are accepted, sorry!"}
        {isFileTooLarge && (
          <div className="text-danger mt-2">File is too large.</div>
        )}
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
};

export default Uploader;
