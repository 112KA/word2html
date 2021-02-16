import React , {useState, SyntheticEvent} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import RawData from './components/RawData'
import Process from './components/Process'
import { Container, Box, Button, Snackbar } from "@material-ui/core";
import {Alert} from '@material-ui/lab';

import { setOriginalText } from './store/slice/text';
import { RootState } from './store/';

const App = (props:any) => {
  const [source, setSource] = useState(''), 
    [open, setOpen] = React.useState(false);

  const originalText = useSelector((state:RootState) => state.text.original),
    processedText = useSelector((state:RootState) => state.text.processed),
    cleanText = useSelector((state:RootState) => state.text.clean),
    tabIndex = useSelector((state:RootState) => state.text.tabIndex);
  const dispatch = useDispatch();

  // console.log("originalText", originalText, originalText.length)

  const handleClickConvert = () => {
    dispatch(setOriginalText(source))
  }

  const handleClickClear = () => {
    setSource('');
  }

  const handleClickBack = () => {
    dispatch(setOriginalText(''))
  }

  const handleClickCopy = () => {
    let s: string = '';
    if(navigator.clipboard){
      switch(tabIndex) {
        case 0: s = processedText;  break;
        case 1: s = originalText;  break;
        case 2: s = cleanText;  break;
      }
      navigator.clipboard.writeText(s);
    }
    setOpen(true);
  }

  const handleClose = (event:SyntheticEvent<Element, Event>) => {
    setOpen(false);
  };

  return (
    <Container className="py-8">
      {
        <>
          <Box>
            <dl>
              <dt>GitHub:</dt>
              <dd><a href="https://github.com/112KA/word2html" target="_blank" rel="noreferrer">https://github.com/112KA/word2html</a></dd>
            </dl>
          </Box>
          <Box className={originalText.length === 0 ? '' : 'hidden'}>
            <RawData source={source} setSource={setSource}/>
            <Box className="mt-4" display="flex">
              <Box><Button variant="contained" color="primary" onClick={handleClickConvert} disabled={source.length===0}>convert</Button></Box>
              <Box className="ml-2"><Button variant="contained" onClick={handleClickClear}>clear</Button></Box>
            </Box>
          </Box>
          <Box className={originalText.length !== 0 ? '' : 'hidden'}>
            <Process />
            <Box className="mt-4" display="flex">
              <Box><Button variant="contained" onClick={handleClickBack}>back</Button></Box>
              <Box className="ml-2"><Button variant="contained" color="secondary" onClick={handleClickCopy}>copy</Button></Box>
            </Box>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert severity="success">Copied</Alert>
            </Snackbar>
          </Box>
        </>
      }
    </Container>
  );
}

export default App;
