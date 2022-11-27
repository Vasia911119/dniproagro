import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { graphql, useStaticQuery } from 'gatsby';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { Container, Logo, NavBar, SwitchLang, Menu } from 'components';
import { anchors } from 'utils/constants';
import * as s from './Header.module.css';

const { SLOGAN } = anchors;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  const { i18n } = useTranslation();

  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___chapter_range }) {
        nodes {
          frontmatter {
            chapter
            chapter_range
            language
            title
          }
        }
      }
    }
  `);

  const sections = nodes
    .filter(({ frontmatter: { chapter } }) => chapter !== SLOGAN)
    .reduce((acc, { frontmatter: { title, language, chapter } }) => {
      if (language === i18n.language) {
        acc.push({
          title,
          chapter,
        });
      }
      return acc;
    }, []);

  const toggleMenu = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };

  useEffect(() => {
    const menuRef = document.getElementById('menu');
    setTarget(menuRef);
  }, []);

  useEffect(() => {
    if (!target) return;

    if (isMenuOpen) {
      document.body.style.overflowY = 'hidden';
      disableBodyScroll(target);
    } else {
      document.body.style.overflowY = 'auto';
      enableBodyScroll(target);
    }
  }, [isMenuOpen, target]);

  return (
    <header className={s.header}>
      <Container className={s.headerContainer}>
        <Logo />

        {!isDesktop && (
          <div className={s.mobHeaderWrapper}>
            <SwitchLang />

            <button
              type="button"
              aria-expanded={isMenuOpen ? true : false}
              className={s.menuBtn}
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <XMarkIcon className={s.menuIconClose} />
              ) : (
                <Bars3Icon className={s.menuIconOpen} />
              )}
            </button>
          </div>
        )}

        {isDesktop && (
          <div className={s.desktopHeaderWrapper}>
            <NavBar
              sections={sections}
              isDesktop={isDesktop}
              setIsMenuOpen={setIsMenuOpen}
            />
            <SwitchLang />
          </div>
        )}

        {!isDesktop && (
          <Menu
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            sections={sections}
          />
        )}
      </Container>
    </header>
  );
};
