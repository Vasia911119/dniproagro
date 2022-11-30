import React from 'react';
import { Container, Logo } from 'components';
import * as s from './Footer.module.css';

export const Footer = () => {
  return (
    <footer>
      <Container className={s.wrapper}>
        <Logo />
      </Container>
    </footer>
  );
};
