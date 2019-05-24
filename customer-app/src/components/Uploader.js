import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";

const Uploader = () => {
  const toast = innerHTML => {
    const el = document.getElementById("toast");
    el.innerHTML = innerHTML;
    el.className = "show";
    setTimeout(() => {
      el.className = el.className.replace("show", "");
    }, 3000);
  };

  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta, remove }, status) => {
    if (status === "headers_received") {
      toast(`${meta.name} uploaded!`);
      remove();
    } else if (status === "aborted") {
      toast(`${meta.name}, upload failed...`);
    }
  };

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };

  return (
    <>
      <div id="toast">Upload</div>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
      />
    </>
  );
};

export default Uploader;
