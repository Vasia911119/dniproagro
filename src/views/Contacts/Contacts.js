import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
// import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Section, SectionTitle, Address, Form, Contact } from 'components';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Map from 'components/Map/Map';
import * as s from './Contacts.module.css';

export const Contacts = () => {
  const { i18n } = useTranslation();

  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { chapter: { eq: "contacts" } } }
      ) {
        nodes {
          frontmatter {
            language
            title
            chapter
            contacts {
              department
              phone
              telegram
              viber
              whatsapp
            }
            address
            email
          }
        }
      }
    }
  `);

  const contacts = nodes?.find(
    ({ frontmatter: { language } }) => language === i18n.language,
  )?.frontmatter;

  const title = contacts?.title;
  const email = contacts?.email;
  const address = contacts?.address;
  const contactsArr = contacts?.contacts;
  const chapter = contacts?.chapter;

  return (
    <Section className={s.section} id={chapter}>
      <div className={s.wrapper}>
        <div>
          <SectionTitle title={title} />
          <a className={s.link} href={`mailto:${email}`}>
            {email}
          </a>
          <Contact contactsArr={contactsArr} />
          <Address address={address} />
          <div className={s.mapWrapper}>
            <Map />
          </div>
        </div>
        <div className={s.formWrapper}>
          <Form />
        </div>
      </div>
    </Section>
  );
};