import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 160px;
  height: 90px;
  padding: 4px;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: []
    };
  }

  onDrop = acceptedFiles => {
    this.props.handleImgs(acceptedFiles);

    let newImgs = acceptedFiles.map(file =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    const copy = [...this.state.imgs];
    this.setState({
      imgs: [...copy, ...newImgs]
    });
    console.log(this.state);
  };

  render() {
    const maxSize = 5 * 1048576;
    const thumbs = this.state.imgs.map(file => (
      <Thumb key={file.name}>
        <ThumbInner>
          <Img src={file.preview} alt="User uploads" />
        </ThumbInner>
      </Thumb>
    ));

    return (
      <div className="text-center">
        <Dropzone
          onDrop={this.onDrop}
          accept="image/*"
          minSize={0}
          maxSize={maxSize}
          style={{ height: "300px", border: "5px solid pink" }}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragReject,
            rejectedFiles
          }) => {
            const isFileTooLarge =
              rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
            return (
              <>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {!isDragActive && "Click here or drop a file to upload!"}
                  {isDragActive && !isDragReject && "Drop it like it's hot!"}
                  {isDragReject && "File type not accepted, sorry!"}
                  {isFileTooLarge && (
                    <div className="text-danger mt-2">File is too large.</div>
                  )}
                  <ThumbsContainer>{thumbs}</ThumbsContainer>
                </div>
              </>
            );
          }}
        </Dropzone>
      </div>
    );
  }
}

export default Uploader;
