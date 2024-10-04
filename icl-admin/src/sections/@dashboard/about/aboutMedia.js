import { CardMedia, styled } from '@mui/material';
import React from 'react';
import LanguagePopover from '../../../layouts/dashboard/header/LanguagePopover';

const AboutMedia = ({ setPopup, EditiorPanel, aboutData, setAboutData }) => {
  const StyledContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 20,
    right: 3,
  }));

  return (
    <>
      <CardMedia sx={{ width: '90%', margin: 'auto ' }} component="img" image={aboutData?.image} />

      <StyledContainer>
        <LanguagePopover
          setPopup={setPopup}
          EditiorPanel={EditiorPanel}
          setAboutData={setAboutData}
          aboutData={aboutData}
        />
      </StyledContainer>
    </>
  );
};

export default AboutMedia;
