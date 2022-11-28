import React from 'react';
import PropTypes from 'prop-types';
import * as s from './SectionTitle.module.css';

export const SectionTitle = ({ title, level = 'h2' }) => {
  return (
    <>
      {level === 'h2' && <h2 className={s.sectionTitle}>{title}</h2>}

      {level === 'h1' && <h1 className={s.mainPageTitle}>{title}</h1>}
    </>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['h2', 'h1']),
};
