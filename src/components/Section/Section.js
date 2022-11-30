import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'components';
import * as s from './Section.module.css';

export const Section = ({
  children,
  className,
  id,
  styleContainer,
  isContainer = 'true',
}) => {
  return (
    <>
      {isContainer === 'true' && (
        <section className={`${className} ${s.section}`} id={id}>
          <Container className={styleContainer}>{children}</Container>
        </section>
      )}

      {isContainer === 'false' && (
        <section className={className} id={id}>
          {children}
        </section>
      )}
    </>
  );
};

Section.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isContainer: PropTypes.oneOf(['true', 'false']),
};
