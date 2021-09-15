import React from "react";
import { Form, Segment, Image, Icon, Header } from "semantic-ui-react";

function ImageDropDiv({
  highlighted,
  setHighlighted,
  inputRef,
  mediaPreview,
  setMediaPreview,
  setMedia,
  handleChange,
}) {
  return (
    <>
      <Form.Field>
        <Segment placeholder basic secondary>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={handleChange}
            name="media"
            ref={inputRef}
          />

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setHighlighted(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setHighlighted(false);
            }}
            onDrop={(event) => {
              event.preventDefault();
              setHighlighted(true);
              const droppedFile = Array.from(event.dataTransfer.files);
              setMedia(droppedFile[0]);
              setMediaPreview(URL.createObjectURL(droppedFile[0]));
            }}
          >
            {mediaPreview === null ? (
              <>
                <Segment
                  color={highlighted ? { color: "green" } : {}}
                  placeholder
                  basic
                >
                  <Header icon>
                    <Icon
                      name="file image outline"
                      style={{ cursor: "pointer" }}
                      onClick={() => inputRef.current.click()}
                    />
                    Drag and drop or click to upload an image.
                  </Header>
                </Segment>
              </>
            ) : (
              <>
                <Segment color="green" placeholder basic>
                  <Image
                    src={mediaPreview}
                    size="medium"
                    centered
                    style={{ cursor: "pointer" }}
                    onClick={() => inputRef.current.click()}
                  />
                </Segment>
              </>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  );
}

export default ImageDropDiv;
