import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Tabs, Tab, Box, /*TextareaAutosize,*/makeStyles } from "@material-ui/core";


import { RootState } from '../store/';
import { setTabIndex, setCleanText } from '../store/slice/text';

function TabPanel(props:any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index:number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabpanel: {
    height: "500px"
  },
  textarea: {
    width: '100%',
    padding: 0
  }
}));

function Process() {
  const classes = useStyles();
  
  const originalText = useSelector((state:RootState) => state.text.original),
    processedText = useSelector((state:RootState) => state.text.processed),
    cleanText = useSelector((state:RootState) => state.text.clean),
    tabIndex = useSelector((state:RootState) => state.text.tabIndex);
  
   const dispatch = useDispatch();

  const handleChange = (event:React.ChangeEvent<{}>, newValue:any) => {
    console.log('handleChange', newValue)
    // setTabIndex(newValue);
    if(newValue===2) {
      dispatch(setCleanText(newValue));
    }
    dispatch(setTabIndex(newValue));
  };

  const rows = 30;
  return (
      <div className={classes.container}>
        <AppBar position="static" color="transparent">
          <Tabs value={tabIndex}
            indicatorColor="primary"
            textColor="primary" onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Processed" {...a11yProps(0)} />
            <Tab label="Original" {...a11yProps(1)} />
            <Tab label="Clean" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabIndex} index={0}>
          <textarea className={classes.textarea} name="processedText" rows={rows} readOnly value={processedText}></textarea>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <textarea className={classes.textarea} name="originalText" rows={rows} readOnly value={originalText}></textarea>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <textarea className={classes.textarea} name="cleanText" rows={rows} readOnly value={cleanText}></textarea>
        </TabPanel>
      </div>
  );
}

export default Process;