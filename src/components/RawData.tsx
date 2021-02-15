import React, {useRef} from 'react';

import { Box } from "@material-ui/core";
// import { setSource } from '../store/slice/text';
// import { RootState } from '../store/';

// 15. Jodit React
// https://github.com/jodit/jodit-react

// React Summernote
// https://summernote.org/

// 9. React Quill
// https://zenoamaro.github.io/react-quill/

// 1. TinyMCE React
// https://www.tiny.cloud/docs/integrations/react/
import JoditEditor from "jodit-react";
import { Jodit } from 'jodit'

type Props = {
  source: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
}


const RawData = (props:Props) => {
  const {source, setSource} = props
	const editor = useRef(null)
  // console.log('Jodit', Jodit)
  const config = Jodit.defaultOptions
  config.style = {
    height: '500px'
  }
  return (
    <Box>
      <JoditEditor
        ref={editor}
        config={config}
        value={source}
        onChange={newSource => {
          setSource(newSource);
          // console.log(newSource)
        }}
        onBlur={newSource => {
        }}
      />
      {/* tabIndex={1} // tabIndex of textarea */}
    </Box>
  );
}

export default RawData;