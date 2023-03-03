import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BsFillHouseDoorFill,
  BsFillBriefcaseFill,
  BsFillGearFill,
} from 'react-icons/bs';
import List from '@mui/material/List';
import {
  Box,
  CssBaseline,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { Home, Inbox, Settings, Work } from '@mui/icons-material';
import { CompanyInfoType } from './companyInfo/companyInfo.types';

type Props = {
  company: CompanyInfoType;
  logo: string;
};

const SideBar: React.FC<Props> = ({ company, logo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    // <div className="h-100 shadow">
    //   <div className="container-fluid p-0 sticky-top vh-100 overflow-auto">
    //     <div className="mb-5">
    //       {logo && <img src={logo} alt="" className="img-fluid mb-3" />}
    //       <h1 className="fs-4 text-center">{company.name}</h1>
    //     </div>
    //     <div>
    //       {/* <button
    //         type="button"
    //         className={`btn text-start d-flex align-items-center ${
    //           location.pathname === '/' ? 'btn-secondary' : 'btn-dark'
    //         } rounded-0 w-100 border-0 py-2`}
    //         onClick={(e) => {
    //           e.currentTarget.blur();
    //           navigate('/');
    //         }}
    //       >
    //         <span className="ms-2 me-3">
    //           <BsFillHouseDoorFill size={24} />
    //         </span>
    //         {t('home')}
    //       </button>
    //       <button
    //         type="button"
    //         className={`btn text-start d-flex align-items-center ${
    //           location.pathname === '/company-info'
    //             ? 'btn-secondary'
    //             : 'btn-dark'
    //         } rounded-0 w-100 py-2`}
    //         onClick={(e) => {
    //           e.currentTarget.blur();
    //           navigate('/company-info', { replace: false });
    //         }}
    //       >
    //         <span className="ms-2 me-3">
    //           <BsFillBriefcaseFill size={24} />
    //         </span>
    //         {t('company')}
    //       </button>
    //       <button
    //         type="button"
    //         className={`btn text-start d-flex align-items-center ${
    //           location.pathname === '/settings' ? 'btn-secondary' : 'btn-dark'
    //         } rounded-0 w-100 py-2`}
    //         onClick={(e) => {
    //           e.currentTarget.blur();
    //           navigate('/settings', { replace: false });
    //         }}
    //       >
    //         <span className="ms-2 me-3">
    //           <BsFillGearFill size={24} />
    //         </span>
    //         {t('settings')}
    //       </button> */}
    //       <CssBaseline />
    //       <List>
    //         <ListItem key="abc" disablePadding color="primary">
    //           <ListItemButton>
    //             <ListItemIcon>
    //               <Inbox />
    //             </ListItemIcon>
    //             <ListItemText primary="Inbox" />
    //           </ListItemButton>
    //         </ListItem>
    //       </List>
    //     </div>
    //   </div>
    // </div>
    <Paper
      elevation={3}
      className="hide-scrollbar"
      sx={{
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Box>
        {logo && (
          <img
            src={logo}
            alt=""
            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
          />
        )}
        <Typography
          variant="h3"
          sx={{ display: 'flex', justifyContent: 'center' }}
          color="primary"
          noWrap
        >
          {company.name}
        </Typography>
        <Divider />
        <List>
          <ListItem
            key="abc"
            disablePadding
            onClick={(e) => {
              e.currentTarget.blur();
              navigate('/');
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem
            key="abc"
            disablePadding
            onClick={(e) => {
              e.currentTarget.blur();
              navigate('/company-info', { replace: false });
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Work />
              </ListItemIcon>
              <ListItemText primary="Company Info" />
            </ListItemButton>
          </ListItem>
          <ListItem
            key="abc"
            disablePadding
            onClick={(e) => {
              e.currentTarget.blur();
              navigate('/settings', { replace: false });
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
};

export default SideBar;
