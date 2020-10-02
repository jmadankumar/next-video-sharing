import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import styled from 'styled-components';

const FileUploadButtonWrapper = styled.div`
  display: inline-block;
  input {
    display: none;
  }
`;
type FileUploadButtonProps = Omit<ButtonProps, 'onChange'> & {
  id?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileUploadButton = React.forwardRef<any, FileUploadButtonProps>(
  ({ id, children, accept, multiple, onChange, ...props }, ref) => {
    const inputId = id ?? 'file-upload';
    return (
      <FileUploadButtonWrapper>
        <input type="file" id={inputId} accept={accept} multiple={multiple} onChange={onChange} />
        <label htmlFor={inputId}>
          <Button {...props} ref={ref} component="span">
            {children}
          </Button>
        </label>
      </FileUploadButtonWrapper>
    );
  },
);

export default FileUploadButton;
