import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
  justify-content: center;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 200px;
  height: 120px;
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

const Link = styled.p`
  color: #017738;

  &:hover {
    color: #f13c20;
  }
`;

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: []
    };
  }

  deleteImg = e => {
    e.stopPropagation();
    let id = e.target.id;
    const copy = this.state.imgs;
    this.setState({
      imgs: copy.filter(file => file.name !== id) //remove using this
    });
    this.props.handleDlt(id);
    // Pop the corresponding img from the state
  };

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
    const { imgs } = this.state;
    const maxSize = 5 * 1048576;
    const thumbs = imgs.map((file, index) => (
      <div key={index}>
        <Thumb key={file.name}>
          <ThumbInner>
            <Img src={file.preview} alt="User uploads" />
          </ThumbInner>
        </Thumb>
        {/* Render error message depending on the error returned */}
        <Link
          id={file.name}
          onClick={this.deleteImg}
          style={{ position: "relative" }}
        >
          {" "}
          Delete image{" "}
        </Link>
      </div>
    ));

    return (
      <div className="text-center">
        <Dropzone
          onDrop={this.onDrop}
          accept="image/*"
          minSize={0}
          maxSize={maxSize}
          style={{ height: "300px", marginBotton: "20px" }}
          // Check for the number of images in the state, if more than 12 disable the thing
          disabled={imgs.length > 1 && true}
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
                <div
                  {...getRootProps({
                    className: "dropzone my-auto"
                  })}
                >
                  <input {...getInputProps()} />
                  {!isDragActive && (
                    <>
                      <p>Click here or drop a file to upload! </p>
                      {/* <small>Maximum 12 images allowed.</small> */}
                    </>
                  )}
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
